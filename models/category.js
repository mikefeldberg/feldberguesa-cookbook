var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    label: String,
    imageUrl: String,
    dateDeleted: Date,
});

module.exports = mongoose.model('Category', categorySchema);