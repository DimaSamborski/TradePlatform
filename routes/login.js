var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var HttpError = require('../error/index');
var async = require('async');

router.get('/', function(req, res, next) {
    res.render('login', { title: 'login'});
});

router.post('/',function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    async.waterfall([
        function (callback) {
            User.findOne({username: username}, callback);
        },
        function (user, callback) {
            if(user) {
                if(user.checkPassword(password)){
                    req.session.user = user._id;
                    res.send(req.session.user);
                    callback(null, user);
                } else {
                    next(new HttpError(403, "Password not correct"));
                }
            }else {
                var user = new User({username: username, password: password});
                user.save(function (err) {
                    if(err) return next(err);
                    callback(null, user);
                });
                req.session.user = user._id;
                res.send(req.session.user);
            }

        }
    ], function (user, err) {
        if (err) return next(err);
        req.session.user = user._id;
        res.send(req.session.user);
    });
});
module.exports = router;