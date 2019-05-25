var express = require('express');
var router = express.Router();
var memberController = require('../controllers/members')

router.get('/', memberController.profile);

module.exports = router;