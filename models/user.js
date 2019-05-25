var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    googleId: String,
    favorites: Array,
    recipes: Array,
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
    sessionId: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);