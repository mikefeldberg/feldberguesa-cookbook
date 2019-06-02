var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    label: String,
    imageUrl: String,
    recipeId: String,
    deletedAt: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);