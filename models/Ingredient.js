const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: String, 
    
});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;