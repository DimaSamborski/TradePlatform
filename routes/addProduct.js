var express = require('express');
var router = express.Router();
var Product = require('../models/product').Product;
var User = require('../models/user').User;
var async = require('async');

router.get('/', function (req, res, next) {
    res.render('addProduct', {title: 'AddProduct', login: req.checkUser});
});
router.post('/', function (req, res, next) {
    var productName = req.body.productName;
    var productDescription = req.body.description;
    var productPrice = req.body.price;
    var categories = req.body.categories;
    var imgLink = req.body.img;
    var link = "/user/"+req.session.user._id+"/product/"+productName;

    async.waterfall([
        function (callback) {
            var product = new Product({
                name: productName,
                authorID: req.session.user._id,
                photo: imgLink,
                description: productDescription,
                price: productPrice,
                categories: categories,
                link: link
            });

            product.save(function (err) {
                if (err) return next(err);
            });
        }
    ]);

    User.findById(req.user._id , function (err, doc) {
        doc.productSold += 1;
        doc.save(function (err) {
            if(err) throw err;
        })
    })

});

module.exports = router;