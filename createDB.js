var User = require('./models/user');

var user = new User({
    username: "Tester",
    password: "Secret"
});

user.save(function (err, user, affected) {
    if (err) throw err;
    console.log(arguments);
});