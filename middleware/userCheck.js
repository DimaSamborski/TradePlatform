module.exports = function (req, res, next) {
    if (req.session.user){
        req.checkUser = true;
    }else {
        req.checkUser = false;
    }
    next();
};