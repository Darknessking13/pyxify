const http = require('http');
const path = require('path');
const Router = require('../helpers/router');
const ViewEngine = require('../View-Engine/view-engine');
const Cache = require('../helpers/cache');
const { parseJSON, sendJSON } = require('../utils/utils');

class Application {
  constructor() {
    this.router = new Router();
    this.viewEngine = new ViewEngine();
    this.cache = new Cache();
    this.settings = {
      maxJsonSize: 1024 * 1024 * 5, // 1MB
      viewsFolder: 'views',
      viewEngine: 'nunjucks'
    };
  }

  listen(port, callback) {
    const server = http.createServer(this.handleRequest.bind(this));
    return server.listen(port, callback);
  }

  async handleRequest(req, res) {
    req.params = {};
    req.query = {};
    res.json = (data) => sendJSON(res, data, this.settings.maxJsonSize);
    res.render = (view, data) => {
      return this.viewEngine.render(view, data, this.settings.viewsFolder)
        .then(rendered => {
          res.setHeader('Content-Type', 'text/html');
          res.end(rendered);
        })
        .catch(err => {
          console.error('Error rendering template:', err);
          res.statusCode = 500;
          res.end('Internal Server Error');
        });
    };

    try {
      await this.router.route(req, res);
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  handleError(err, req, res) {
    console.error(err);
    res.statusCode = err.statusCode || 500;
    res.end(err.message || 'Internal Server Error');
  }

  use(path, handler) {
    if (typeof path === 'function') {
      this.router.use('/', path);
    } else {
      this.router.use(path, handler);
    }
    return this;
  }

  set(setting, value) {
    this.settings[setting] = value;
    if (setting === 'viewsFolder') {
      this.viewEngine.setViewsFolder(value);
    }
    return this;
  }

  // HTTP method handlers
  get(path, ...handlers) {
    this.router.get(path, ...handlers);
    return this;
  }

  post(path, ...handlers) {
    this.router.post(path, ...handlers);
    return this;
  }

  // Add other HTTP methods as needed

  // View engine setup
  setViewEngine(engine, options = {}) {
    this.viewEngine.setup(engine, this.settings.viewsFolder, options);
    return this;
  }

  // Static file serving
  static(path, folder) {
    // Implement static file serving logic here
    return this;
  }
}

module.exports = Application;