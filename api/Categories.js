const express = require('express');
const router = express.Router();

// mongodb category model

const Category = require('./../models/Category')

// Post Categories
router.post('/categories', (req, res) => {
    let { name } = req.body;
    name = name.trim();
  

    if (name == "" ) {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
        
    }else if (!/^[a-zA-Z]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        })
    }else {
        // Checking if category already exists
        Category.find({name}).then(result => {
            if(result.length) {
                // A category already exists
                res.json({
                    status: "FAILED",
                    message: "Recipe with provided name already exists."
                })
            } else {
                // Try to create new recipe
                const newCategory = new Category({
                    name,
                   
                });

                newCategory.save().then(result => {
                    res.json({
                        status: "SUCCESS",
                        message: "New category created!",
                        data: result
                    })
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while saving the category!"
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occured while checking for existing category!"
            })
        })
    }
})



module.exports = router;