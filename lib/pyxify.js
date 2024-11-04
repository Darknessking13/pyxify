const Application = require('./core/application');
const Router = require('./helpers/router');
const Controller = require('./helpers/controller');

// Create the main application factory
function createApplication() {
  return new Application();
}

// Attach classes to the main export
createApplication.Router = Router;
createApplication.Controller = Controller;

// Export the factory function as default
module.exports = createApplication;
