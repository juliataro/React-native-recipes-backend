// mongodb
require('./config/db');

const app = require('express')();
const port = 3000;

const RecipesRouter = require('./api/Recipes');
const CategoriesRouter = require('./api/Categories');
const IngredientsRouter = require('./api/Ingredients');

// For accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/recipes', RecipesRouter)
app.use('/', CategoriesRouter)
app.use('/', IngredientsRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})