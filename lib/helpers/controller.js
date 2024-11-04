class Controller {
    constructor() {
      // Add any common controller logic here
    }
  
    // Utility method to send a JSON response
    sendJson(res, data, statusCode = 200) {
      res.statusCode = statusCode;
      res.json(data);
    }
  
    // Utility method to render a view
    render(res, view, data) {
      res.end(res.app.viewEngine.render(view, data));
    }
  
    // Utility method to redirect
    redirect(res, url, statusCode = 302) {
      res.statusCode = statusCode;
      res.setHeader('Location', url);
      res.end();
    }
  }
  
  module.exports = Controller;