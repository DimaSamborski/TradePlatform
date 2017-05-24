var express = require('express');
var router = express.Router();
var Product = require('../models/product').Product;
var User = require('../models/user').User;

router.post('/', function (req, res, next) {
    var productName = req.body.productName;
    var userID = req.body.userID;

    Product.findOne({name: productName, authorID: userID}, function (err, product) {
        product.remove();
    });

    User.findById(userID , function (err, doc) {
        doc.offTake += 1;
        doc.productSold -= 1;
        doc.save(function (err) {
            if(err) throw err;
        })
    })
});

module.exports = router;
