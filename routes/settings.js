var express = require('express');
var router = express.Router();
var User = require('../models/user').User;

router.get('/', function (req, res, next) {
    res.render('settings', {title: 'settings', login: req.checkUser,userPhoto : req.session.user.userPhoto, username : req.session.user.username, phoneNumber : req.session.user.phoneNumber });
});

router.post('/', function (req,res,next) {


    User.findById(req.session.user._id, function (err, doc) {
        doc.username = req.body.username;
        doc.userPhoto = req.body.userPhoto;
        doc.phoneNumber = req.body.phoneNumber;
        doc.save(function (err) {
            if(err) throw err;
        })
    });
    req.session.user.phoneNumber = req.body.phoneNumber;
    res.redirect("/");
});

module.exports = router;