var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var sequelize = require('./config/database');

var indexRouter = require('./routes/index');
var debugRouter = require('./routes/debug');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var logoutRouter = require('./routes/logout');
var collectionRouter = require('./routes/collection');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'asecret',
    resave: false,
    saveUninitialized: true,
  })
);
// custom middleware
app.use((req, res, next) => {
  if (req.session.authorized) {
    res.locals.showUserNav = true;
  } else {
    res.locals.showUserNav = false;
  }
  next(); 
});
// const checkSession = (req, res, next) => {
//   if (req.session.authorized == undefined) {
//     res.redirect('/');
//   }
//   next();
// }
// app.use('/collection', checkSession)

app.use('/', indexRouter);
app.use('/debug', debugRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/collection', collectionRouter);

// sequelize test connection
try {
  sequelize.sync();
  sequelize.authenticate();
  console.log("Database connection has been established ssuccessfully!");
} catch (error) {
  console.error('Unable to connect to database:', error);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
