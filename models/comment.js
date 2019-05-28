var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    userId: String,
    recipeId: String,
    commentBody: String,
    rating: Number,
    addedBy: String,
    addedTo: String,
    deletedAt: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);