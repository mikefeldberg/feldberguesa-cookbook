var mongoose = require('mongoose');

var levelSchema = new mongoose.Schema({
    skillLevel: String,
    deletedAt: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Level', levelSchema);