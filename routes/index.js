var express = require('express');
var router = express.Router();
var product = require('../models/product').Product;

var productList;

var query = product.find({}, null, {limit: 10, sort: {'create': -1}});
query.exec(function (err, docs) {
    this.productList = docs;
});


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'index',
        login: req.checkUser,
        productsList: this.productList ? this.productList : {}
    });
});

module.exports = router;
