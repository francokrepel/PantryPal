const express = require('express');
const router = express.Router();
const { fetchRecipes, fetchRecipesComplex, recipesById} = require('../controllers/recipeController');

router.get('/recipes', fetchRecipes);
router.get('/complexRecipes', fetchRecipesComplex)
router.post('/recipesById', recipesById);
module.exports = router;