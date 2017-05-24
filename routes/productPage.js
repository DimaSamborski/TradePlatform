var express = require('express');
var router = express.Router();
var Product = require('../models/product').Product;
var User = require('../models/user').User;

router.get('/user/?:userID/product/?:productName', function (req, res, next) {
    var product;


    Product.findOne({name: req.params.productName, authorID: req.params.userID}, function (err, product) {
        this.product = product;
    });
    var phoneNumber;
    User.findOne({_id: req.params.userID}, function (err, user) {
        phoneNumber = user.phoneNumber;
    }) ;

    res.render('productPage', {
        title: 'product',
        login: req.checkUser,
        productPrice: this.product.price + '$',
        productImg: this.product.photo,
        productName: this.product.name,
        productDescription: this.product.description,
        authorID: this.product.authorID,
        authorPhoneNumber: this.phoneNumber
    });
});

module.exports = router;