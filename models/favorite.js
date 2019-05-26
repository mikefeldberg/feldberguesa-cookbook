var mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
    userId: String,
    recipeId: String,
    deletedAt: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Favorite', favoriteSchema);