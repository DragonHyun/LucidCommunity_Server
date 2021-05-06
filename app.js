const createError = require('http-errors');
const errorHandler = require('./middlewares/error-handler');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { logger, stream } = require('./config/winston');
const passport = require('passport');
const passportConfig = require('./util/passport');

const routes = require('./Routes');

//const { sequelize } = require('./MySQL/Models');

const app = express();

// sequelize.sync({ force: true })
//     .then(() => {
//         console.log('db connect success');
//     })
//     .catch((err) => {
//         //console.error(err);
//     });

app.use(morgan('dev', { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
passportConfig();
app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(errorHandler);

module.exports = app;
