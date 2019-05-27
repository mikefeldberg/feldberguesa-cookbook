var mongoose = require('mongoose');

var ingredientSchema = new mongoose.Schema({
    item: String,
    quantity: String,
    preparation: String,
    deletedAt: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Ingredient', ingredientSchema);