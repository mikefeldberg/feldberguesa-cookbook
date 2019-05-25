var mongoose = require('mongoose');

var levelSchema = new mongoose.Schema({
    skillLevel: String,
    dateDeleted: Date,
}, {
    timestamps: true
});

module.exports = mongoose.model('Level', levelSchema);