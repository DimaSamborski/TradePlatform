var mongoose = require('mongoose');
if (!mongoose.connect) mongoose.connect('mongodb://localhost/tradePlatform');

module.exports = mongoose;