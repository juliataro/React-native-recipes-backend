const express = require('express');
const router = express.Router();

// mongodb recipe model

const Recipe = require('./../models/Recipe')

// Add recipe
router.post('/new', (req, res) => {
    let {  categoryId, title, photo_url, photosArray, time, ingredients, description} = req.body;
    title = title.trim();
    categoryId = categoryId.trim();
    photo_url = photo_url.trim();

    if (title == "" || categoryId == "" || photo_url == "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
        
    }else if (!/^[a-zA-Z ]*$/.test(title)) {
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        })
    }else {
        // Checking if recipe already exists
        Recipe.find({title}).then(result => {
            if(result.length) {
                // A recipe already exists
                res.json({
                    status: "FAILED",
                    message: "Recipe with provided name already exists."
                })
            } else {
                // Try to create new recipe
                const newRecipe = new Recipe({
                    title,
                    categoryId,
                    photo_url
                });

                newRecipe.save().then(result => {
                    res.json({
                        status: "SUCCESS",
                        message: "New recipe created!",
                        data: result
                    })
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while saving the recipe!"
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occured while checking for existing recipe!"
            })
        })
    }
})



module.exports = router;