var express = require('express');
var router = express.Router();
var commentsController = require('../controllers/comments');

router.get('/:id/edit', commentsController.edit);
router.put('/:id', commentsController.update);
router.delete('/:id/delete', commentsController.delete);

module.exports = router;