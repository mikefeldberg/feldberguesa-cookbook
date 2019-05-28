var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    ingredients: Array,
    instructions: Array,
    skillLevel: Number,
    timePrep: Number,
    timeCook: Number,
    timeWait: Number,
    timeTotal: Number,
    servings: Number,
    categories: Array,
    heroImage: String,
    imageUrl: String,
    stars: Number,
    addedBy: String,
    userId: String,
    deletedAt: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);