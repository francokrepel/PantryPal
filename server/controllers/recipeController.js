/*
why axios here?
recipeController is responsible for interacting with the Spoonacular API, which is an external service. axios provides a 
clean and simple way to send these HTTP requests to the Spoonacular servers to fetch data based on the user's input. 
This involves sending a request over the network to an API that is not part of your application's local servers or databases.
*/
const axios = require('axios');

const fetchRecipes = async (req, res) => {
    const ingredients = req.query.ingredients;
    const apiKey = process.env.SPOONACULAR_API_KEY;

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
            params: {
                ingredients: ingredients,
                apiKey: apiKey
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Failed to fetch recipes:', error);
        res.status(500).send('Failed to fetch recipes');
    }
};

const recipesById = async (req, res) => {
    const { recipeIds } = req.body;
    const recipes = [];
    try {
        for (const id of recipeIds) {
            console.log(id)
            const request = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
                params: { apiKey: process.env.SPOONACULAR_API_KEY }
            })
            recipes.push(request.data)
        }
        res.json(recipes);
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        res.status(500).json({ error: 'Failed to fetch recipe details' });
    }
};


module.exports = {
    fetchRecipes,
    recipesById
}


