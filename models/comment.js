var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
    userId: String,
    recipeId: String,
    commentBody: String,
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