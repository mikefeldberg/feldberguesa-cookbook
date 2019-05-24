var mongoose = require('mongoose');

var levelSchema = new mongoose.Schema({
    skillLevel: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Level', levelSchema);