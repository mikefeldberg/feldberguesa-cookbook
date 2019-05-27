var express = require('express');
var router = express.Router();
var userController = require('../controllers/users')

router.get('/', userController.profile);

module.exports = router;