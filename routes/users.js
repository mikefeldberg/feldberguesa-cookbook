var express = require('express');
var router = express.Router();
var userController = require('../controllers/users')

router.get('/', userController.index);
router.get('/:id', userController.show);

module.exports = router;