var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    googleId: String,
    dateDeleted: Date,
    sessionId: String,
    deletedAt: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);