# Pyxify

A lightweight and fast web framework for Node.js. Pyxify provides an intuitive API for building web applications and RESTful APIs with features like routing, middleware support, view engine integration, and more. 

## Features

- 🚀 Lightweight and fast
- 🛣️ Intuitive routing system with parameter support
- 🔄 Middleware support
- 🎨 Multiple view engine support (Nunjucks, EJS, Pug)
- 🎮 Controller system
- 📦 Built-in caching
- 🔒 Error handling
- 🗂️ Static file serving

## Installation

```bash
npm install pyxify@latest
```

## Quick Start

```javascript
// import { pyxify } from "pyxify";
const { pyxify } = require('pyxify');
const app = pyxify;

app.get('/', (req, res) => {
  res.json({ message: 'Hello, Pyxify!' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

## Routing

### Basic Routes

```javascript
// import { router } from "pyxify";
const { router } = require('pyxify');

const route = router;

route.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

route.post('/users', (req, res) => {
  // Handle user creation
});
```

### Route Parameters

```javascript
route.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `Fetching user ${userId}` });
});
```

### Using Routers

```javascript
// routes/users.js
// import { router } from "pyxify";
const { router } = require('pyxify');

const route = router;

route.get('/', (req, res) => {
  res.json({ users: ['Alice', 'Bob'] });
});

module.exports = router;

// app.js
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);
```

## Middleware

### Creating Middleware

```javascript
function loggerMiddleware(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
}

app.use(loggerMiddleware);
```

### Route-Specific Middleware

```javascript
function authMiddleware(req, res, next) {
  if (req.headers.authorization) {
    next();
  } else {
    res.statusCode = 401;
    res.json({ error: 'Unauthorized' });
  }
}

route.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected route' });
});
```

## View Engines

Pyxify supports multiple view engines including Nunjucks, EJS, and Pug.

```javascript
app.set('viewsFolder', './views');
app.setViewEngine('nunjucks', { autoescape: true });

app.get('/', (req, res) => {
  res.render('index.html', {
    title: 'Welcome',
    message: 'Hello from Pyxify!'
  });
});
```

## Controllers

```javascript
// controllers/userController.js
class UserController {
  static getAllUsers(req, res) {
    res.json({ users: ['Alice', 'Bob'] });
  }

  static getUserById(req, res) {
    const userId = req.params.id;
    res.json({ userId });
  }
}

module.exports = UserController;

// routes/users.js
const UserController = require('../controllers/userController');
route.get('/', UserController.getAllUsers);
route.get('/:id', UserController.getUserById);
```

## Error Handling

```javascript
function errorHandler(err, req, res, next) {
  console.error(err);
  res.statusCode = err.statusCode || 500;
  res.json({
    error: err.message || 'Internal Server Error'
  });
}

app.use(errorHandler);
```

## Static Files

```javascript
app.static('/public', './public');
```

## Project Structure

Recommended project structure:

```plaintext
my-app/
├── controllers/
│   └── userController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── routes/
│   ├── index.js
│   └── users.js
├── views/
│   └── index.html
├── public/
│   ├── css/
│   └── js/
├── app.js
└── package.json
```

## Configuration

```javascript
app.set('maxJsonSize', 1024 * 1024); // Set max JSON size to 1MB
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)

## Author
- ! Ｄᴇᴠɪʟɪѕʜ ｃʜʀᴏɴɪᴄʟᴇѕ
- Iscordian.dev

## Support

<<<<<<< HEAD
If you have any questions or need help, please open an issue on GitHub.
