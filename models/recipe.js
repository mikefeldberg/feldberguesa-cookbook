var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new mongoose.Schema({
    name: String,
    skillLevel: Number,
    stars: Number,
    servings: Number,
    ingredients: Array,
    timePrep: Number,
    timeCook: Number,
    timeWait: Number,
    timeTotal: Number,
    categories: Array,
    description: String,
    heroImage: String,
    imageUrl: String,
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
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);