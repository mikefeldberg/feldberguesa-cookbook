var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
    userId: Number,
    recipeId: Number,
    commentBody: String,
    favorites: {
        type: Schema.Types.ObjectId,
        ref: 'Favorite'
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    reviews: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    },
    dateDeleted: Date,
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);