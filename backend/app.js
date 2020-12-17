const express = require('express');
const { ValidationError } = require('sequelize');

const { environment } = require('./config');
const { cookie } = require('express-validator');

const isProduction = environment === 'production';

const app = express();

app.use(require('morgan')('dev'));
app.use(require('cookie-parser')());
app.use(express.json());
if (!isProduction) {
  app.use(require('cors')());
}
app.use(require('helmet')({
  contentSecurityPolicy: false
}));
app.use(
  require('csurf')({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true
    }
  })
);

app.use(require('./routes'));

app.use((_req, _res, next) => {
  const err = new Error('The requested resource couldn\'t be found.');
  err.title = 'Resource Not Found';
  err.errors = ['The requested resource couldn\'t be found.'];
  err.status = 404;
  next(err);
});

app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;
