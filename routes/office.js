var express = require('express');
var router = express.Router();
var Product = require('../models/product').Product;

router.get('/', function (req, res, next) {
    var user = req.session.user;

    var productList;

    var query = Product.find({authorID: user._id}, null, {limit: 10, sort: {'create': -1}});
    query.exec(function (err, docs) {
        this.productList = docs;
    });

    if (req.checkUser === false) next();
    else {

        res.render('office', {
            title: 'office',
            login: req.checkUser,
            userImg: user.userPhoto,
            userName: user.username,
            soldProduct: user.productSold,
            offTake: user.offTake,
            products: this.productList ? this.productList : {}
        });
    }
});

module.exports = router;