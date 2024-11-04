const { matchRoute } = require('./utils');

class Middleware {
  constructor() {
    this.middlewares = [];
  }

  use(path, handlers) {
    this.middlewares.push({ path, handlers });
  }

  async run(req, res) {
    for (const middleware of this.middlewares) {
      if (matchRoute(middleware.path, req.url.split('?')[0])) {
        for (const handler of middleware.handlers) {
          await new Promise((resolve, reject) => {
            handler(req, res, (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
          if (res.writableEnded) return;
        }
      }
    }
  }
}

module.exports = Middleware;