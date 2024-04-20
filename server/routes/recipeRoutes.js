const express = require('express');
const router = express.Router();
const { fetchRecipes } = require('../controllers/recipeController');

router.get('/recipes', fetchRecipes);

module.exports = router;