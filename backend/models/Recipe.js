const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
}, { timestamps: true });

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    cuisine: { type: String },
    imageUrl: { type: String },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    
    // New Fields
    prepTime: { type: Number, default: 15 },
    cookTime: { type: Number, default: 20 },
    servings: { type: Number, default: 4 },
    calories: { type: Number, default: 400 },
    category: { type: String, enum: ['Food', 'Drink'], default: 'Food' },
    season: { type: String, enum: ['Spring', 'Summer', 'Autumn', 'Winter', 'All'], default: 'All' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);
