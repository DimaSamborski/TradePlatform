var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    authorID: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    description: {
        type: String,
        default: "My product"
    },
    price: {
        type: Number,
        require: true
    },
    categories: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
    }
});


exports.Product = mongoose.model('Product', schema);