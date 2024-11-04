const path = require('path');
const nunjucks = require('nunjucks');
const ejs = require('ejs');
const pug = require('pug');

class ViewEngine {
  constructor() {
    this.engine = null;
    this.engineName = null;
    this.viewsFolder = null;
  }

  setup(engineName, viewsFolder, options = {}) {
    this.engineName = engineName;
    this.viewsFolder = viewsFolder;

    switch (engineName) {
      case 'nunjucks':
        this.engine = nunjucks.configure(viewsFolder, options);
        break;
      case 'ejs':
        this.engine = ejs;
        break;
      case 'pug':
        this.engine = pug;
        break;
      default:
        throw new Error(`Unsupported view engine: ${engineName}`);
    }
  }

  setViewsFolder(folder) {
    this.viewsFolder = folder;
    if (this.engineName === 'nunjucks') {
      this.engine = nunjucks.configure(folder, this.engine.opts);
    }
  }

  render(view, data, viewsFolder = this.viewsFolder) {
    if (!this.engine) {
      throw new Error('View engine not set up');
    }

    const fullPath = path.join(viewsFolder, view);

    switch (this.engineName) {
      case 'nunjucks':
        return new Promise((resolve, reject) => {
          this.engine.render(fullPath, data, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      case 'ejs':
        return new Promise((resolve, reject) => {
          ejs.renderFile(fullPath, data, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      case 'pug':
        return Promise.resolve(this.engine.renderFile(fullPath, data));
      default:
        throw new Error(`Unsupported view engine: ${this.engineName}`);
    }
  }
}

module.exports = ViewEngine;
