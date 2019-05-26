var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    ingredients: Object,
    instructions: Array,
    skillLevel: Object,
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