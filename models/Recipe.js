const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    servings: {
        type: Number,
        required: true,
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    summary: {
        type: String,
        required: false,
    },
    ingredients: {
        type: Array,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    image: {
      type: String,
      require: true,
    },
    cloudinaryId: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
});

RecipeSchema.index({ name: 'text', summary: 'text', user: 'text' })

module.exports = mongoose.model("Recipe", RecipeSchema)