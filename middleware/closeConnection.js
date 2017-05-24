module.exports = function (req, res, next) {
    var mongoose = require('mongoose');
    mongoose.connection.close();
    next();
};