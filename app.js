var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const passport = require("./config/passport");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

app.use(bodyParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
//INITIALIZE SEQUELIZE
const models = require('./models');

models.sequelize.sync().then(function () {
    console.log('database is up!')
}).catch(function (error) {
    console.log('Problem Launching database update ' + error)
});


require('./routes/index')(app);
require('./routes/inventory')(app);
require('./routes/products')(app);
require('./routes/purchaseOrder')(app);
require('./routes/sales')(app);
require('./routes/users')(app);

module.exports = app;
