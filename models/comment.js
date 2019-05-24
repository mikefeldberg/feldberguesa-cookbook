var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    userId: Number,
    recipeId: Number,
    commentBody: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);