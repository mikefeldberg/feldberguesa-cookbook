const User = require('../models/user');

module.exports = {
    profile,
};

function profile(req, res, next) {
    User.findById(req.user._id).exec(function(err, user) {
        res.render('member/account', { user, name: user.name });
    });
}
