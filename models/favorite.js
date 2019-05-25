var mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
    userId: Number,
    recipeId: Number,
    dateDeleted: Date,
});

module.exports = mongoose.model('Favorite', favoriteSchema);