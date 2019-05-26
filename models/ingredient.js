var mongoose = require('mongoose');

var ingredientSchema = new mongoose.Schema({
    item: String,
    quantity: String,
    preparation: String,
    dateDeleted: Date,
}, {
    timestamps: true
});

module.exports = mongoose.model('Ingredient', ingredientSchema);