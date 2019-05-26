var mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
    userId: String,
    recipeId: String,
    dateDeleted: Date,
    favorited: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Favorite', favoriteSchema);