const querystring = require('querystring');

function parseJSON(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  });
}

function sendJSON(res, data, maxSize) {
  const json = JSON.stringify(data);
  if (json.length > maxSize) {
    res.statusCode = 413;
    res.end('Payload Too Large');
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.end(json);
  }
}

function matchRoute(routePath, requestPath) {
  const routeParts = routePath.split('/');
  const requestParts = requestPath.split('/');
  const params = {};

  if (routeParts.length !== requestParts.length) {
    return null;
  }

  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(':')) {
      params[routeParts[i].slice(1)] = requestParts[i];
    } else if (routeParts[i] !== requestParts[i]) {
      return null;
    }
  }

  return { params };
}

function parseParams(routePath, requestPath) {
  const params = {};
  const routeParts = routePath.split('/');
  const requestParts = requestPath.split('/');

  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(':')) {
      const paramName = routeParts[i].slice(1);
      params[paramName] = requestParts[i];
    }
  }

  return params;
}

function parseQueryString(req) {
  const [, queryString] = req.url.split('?');
  return querystring.parse(queryString);
}

module.exports = {
  parseJSON,
  sendJSON,
  parseParams,
  matchRoute,
  parseQueryString
};