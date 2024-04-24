const express = require('express');
const router = express.Router();
const { fetchRecipes, recipesById} = require('../controllers/recipeController');

router.get('/recipes', fetchRecipes);
router.post('/recipesById', recipesById);

module.exports = router;