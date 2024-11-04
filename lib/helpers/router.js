const { matchRoute, parseParams } = require('../utils/utils');

class Router {
  constructor() {
    this.routes = {};
    this.prefix = '';
    this.middleware = [];
  }

  addRoute(method, path, handlers) {
    if (!this.routes[method]) {
      this.routes[method] = [];
    }
    const validHandlers = handlers.filter(handler => typeof handler === 'function');
    if (validHandlers.length === 0) {
      throw new Error(`No valid handlers provided for route: ${method} ${path}`);
    }
    // Store the original path without prefix
    this.routes[method].push({ path, handlers: validHandlers });
  }

  get(path, ...handlers) {
    this.addRoute('GET', path, handlers);
  }

  post(path, ...handlers) {
    this.addRoute('POST', path, handlers);
  }

  put(path, ...handlers) {
    this.addRoute('PUT', path, handlers);
  }

  delete(path, ...handlers) {
    this.addRoute('DELETE', path, handlers);
  }

  get(path, ...handlers) {
    this.addRoute('GET', path, handlers);
  }

  post(path, ...handlers) {
    this.addRoute('POST', path, handlers);
  }

  put(path, ...handlers) {
    this.addRoute('PUT', path, handlers);
  }

  delete(path, ...handlers) {
    this.addRoute('DELETE', path, handlers);
  }

  patch(path, ...handlers) {
    this.addRoute('PATCH', path, handlers);
  }

  options(path, ...handlers) {
    this.addRoute('OPTIONS', path, handlers);
  }

  use(path, handler) {
    if (typeof path === 'function') {
      this.middleware.push(path);
    } else if (handler instanceof Router) {
      handler.prefix = path;
      Object.keys(handler.routes).forEach(method => {
        if (!this.routes[method]) {
          this.routes[method] = [];
        }
        // Add routes with the combined prefix
        handler.routes[method].forEach(route => {
          this.routes[method].push({
            path: this.normalizePath(path + route.path),
            handlers: route.handlers
          });
        });
      });
    } else if (typeof handler === 'function') {
      this.middleware.push((req, res, next) => {
        if (req.url.startsWith(path)) {
          handler(req, res, next);
        } else {
          next();
        }
      });
    }
  }

  normalizePath(path) {
    // Remove duplicate slashes and ensure proper formatting
    return '/' + path.split('/').filter(Boolean).join('/');
  }

  async route(req, res) {
    const method = req.method;
    const path = req.url.split('?')[0];

    // Run middleware
    for (const mw of this.middleware) {
      if (typeof mw !== 'function') continue;
      await new Promise((resolve, reject) => {
        mw(req, res, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      if (res.writableEnded) return;
    }

    if (!this.routes[method]) {
      throw { statusCode: 404, message: 'Not Found' };
    }

    for (const route of this.routes[method]) {
      const fullPath = this.normalizePath(route.path);
      const match = matchRoute(fullPath, path);
      if (match) {
        req.params = parseParams(fullPath, path);
        for (const handler of route.handlers) {
          if (typeof handler !== 'function') continue;
          await new Promise((resolve, reject) => {
            handler(req, res, (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
          if (res.writableEnded) return;
        }
        return;
      }
    }

    throw { statusCode: 404, message: 'Not Found' };
  }
}

module.exports = Router;
