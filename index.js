const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');
const User = require('./models/User');

mongoose.connect(keys.mongoURI).then(() => {
  console.log('db connected');
});

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const port = process.env.PORT || 5000;
app.listen(port);
