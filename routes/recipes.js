var express = require('express');
var router = express.Router();
var recipesController = require('../controllers/recipes');
var commentsController = require('../controllers/comments');
var imageUpload = require('../config/imageUpload');

router.get('/', recipesController.index);
router.get('/new', recipesController.new);
router.get('/:id', recipesController.show);
router.get('/:id/edit', recipesController.edit);
router.post('/:id/favorite', recipesController.favorite);
router.post('/:id/comment', commentsController.create);
router.delete('/:id/favorite', recipesController.unfavorite);
router.delete('/:id', recipesController.delete);
router.post('/', recipesController.create);
router.put('/:id', recipesController.update);


router.get('/upload', recipesController.upload);
router.get('/recipes/:id/images', recipesController.images);

router.post('/upload', imageUpload.array('images', 3), function (req, res, next) {
    req.files.forEach(function (file) {
        req.user.images.push(file.location);
    })
    req.user.save(function (err) {
        if (err) {
            console.log('ERROR')
            console.log(err);
        }
        res.redirect('/students');
    });
})

// display collection of all images for student


module.exports = router;