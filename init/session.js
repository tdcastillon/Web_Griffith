const session = require('express-session');
const key = require('./key');
const sessionConfig = {
  secret: key.getKey(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
};

module.exports = session(sessionConfig);