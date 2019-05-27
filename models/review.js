var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    recipeId: Number,
    userId: Number,
    reviewBody: String,
    rating: Number,
    deletedAt: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Review', reviewSchema);