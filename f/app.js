var express = require('express');

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./connect/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const session = require("express-session");

var apiRouter = require('./routes/api');

var app = express();
const expressHbs = require("express-handlebars");

app.engine(
  ".hbs",
  expressHbs.engine({
    extname: "hbs",
    defaultLayout: "index",
    layoutsDir: "views/layouts/",
    helpers: {sum: (a,b) => a + b}
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use('/uploads',express.static('uploads'))

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "somesecret",
    cookie: { maxAge: 600000 },
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api', apiRouter);

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });



app.use(passport.initialize());


app.use(function(req, res, next) {
  console.log('404 - Khong tim thay trang')
  next();
});

module.exports = app;

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
