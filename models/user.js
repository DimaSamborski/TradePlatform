var crypto = require('crypto');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/tradePlatform');


var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        require: true,
        default: ''
    },
    created: {
        type: Date,
        default: Date.now
    },
    userPhoto: {
        type: String,
        required: false,
        default: "http://flgso.ru/images/avatars/default.png"
    },
    productSold: {
        type: Number,
        required: false,
        default: 0
    },
    offTake: {
        type: Number,
        required: false,
        default: 0
    }
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha512', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

exports.User = mongoose.model('User', schema);