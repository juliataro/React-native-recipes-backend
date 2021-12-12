const express = require('express');
const router = express.Router();

// mongodb recipe model

const Ingredient = require('./../models/Ingredient')

// Recipes
router.post('/ingredients', (req, res) => {
    let { name} = req.body;
   

    if (name == "" ) {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
        
    }else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        })
    }else {
        // Checking if recipe already exists
        Ingredient.find({name}).then(result => {
            if(result.length) {
                // A recipe already exists
                res.json({
                    status: "FAILED",
                    message: "Ingredient with provided name already exists."
                })
            } else {
                // Try to create new recipe
                const newIngredient = new Ingredient({
                    name
                   
                });

                newIngredient.save().then(result => {
                    res.json({
                        status: "SUCCESS",
                        message: "New ingredient created!",
                        data: result
                    })
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while saving the ingredient!"
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occured while checking for existing ingredient!"
            })
        })
    }
})

module.exports = router;