const User = require('../models/user');

module.exports = {
    index,
};

function index(req, res, next) {
    console.log('REQ QUERY BELOW')
    console.log(req.query)
    // let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
    // let sortKey = req.query.sort || 'name';
    res.render('/');

    // User.find(modelQuery)
    //     .sort(sortKey).exec(function (err, users) {
    //         if (err) return next(err);
    //         res.render('students/index', {
    //             students,
    //             name: req.query.name,
    //             sortKey,
    //             user: req.user
    //         });
    //     });
}