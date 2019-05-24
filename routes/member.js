var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('member/account', {name: req.query.name});
});

module.exports = router;
