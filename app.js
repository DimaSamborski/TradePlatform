const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('./config/config');

var index = require('./routes/index');
var users = require('./routes/users');
var office = require('./routes/office');
var login = require('./routes/login');
var settings = require('./routes/settings');
var addProduct = require('./routes/addProduct');
var productPage = require('./routes/productPage');
var goOut = require('./routes/goOut');
var buyProduct = require('./routes/buyProduct');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

var store = new MongoDBStore(
    {
        uri: 'mongodb://localhost:27017/tradePlatform',
        collection: 'UserSessions'
    });

// Catch errors
store.on('error', function (error) {
    if (error) throw error;
    assert.ifError(error);
    assert.ok(false);
});

app.use(require('express-session')({
    secret: 'TradePlatformSecret',
    cookie: {
        path: "/",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    key: "sid",
    resave: true,
    saveUninitialized: true
}));

app.use(require('./middleware/loadUser'));
app.use(require('./middleware/userCheck'));


app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/office', office);
app.use('/settings', settings);
app.use('/addProduct', addProduct);
app.use('/product', productPage);
app.use('/goOut', goOut);
app.use('/buyProduct', buyProduct);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
