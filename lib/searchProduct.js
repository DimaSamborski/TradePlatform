class Product {
    searchByIdAndName(req, res, productName, productAuthor){
        var Product = require('../models/product').Product;

        var async = require('async');

        async.waterfall([
            function (callback) {
                Product.find({name: productName, authorID: productAuthor}, callback);
            },
            function (product, callback) {
                if (product) {
                    req.productList = product
                } else {
                    req.productList = false;
                }
            }
        ], function (product) {
            if (err) return next(err);
        })
    };


}

module.exports = Product;