var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    ingredients: Array,
    instructions: Array,
    skillLevel: String,
    timePrep: Number,
    timeCook: Number,
    timeWait: Number,
    timeTotal: Number,
    servings: Number,
    categories: Array,
    heroImageUrl: String,
    imageUrl: {
        type: String,
        default: "https://i.imgur.com/xKqTrkS.jpg"
    },
    images: [String],
    rating: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    },
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