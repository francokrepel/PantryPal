import React, { useState } from 'react';
import axios from 'axios';
import ingredientsArray from '../data/ingredientArray';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function Recipes() {
    const [data, setData] = useState({
        ingredientInput: '',
        ingredients: [],
        recipes: [],
    });

    const addIngredient = () => {
        const { ingredientInput, ingredients } = data;
        if (ingredientInput.trim() !== '') {
            setData({
                ...data,
                ingredients: [...ingredients, ingredientInput],
                ingredientInput: ''
            });
        }
    };

    const fetchRecipes = async () => {
        const { ingredients } = data;
        try {
            const response = await axios.get(`http://localhost:8000/api/recipes`, {
                params: {
                    ingredients: ingredients.join(',')
                }
            });
            setData({
                ...data,
                recipes: response.data  // api returns array of recipes
            });
        } catch (error) {
            console.error('Failed to fetch recipes:', error);
        }
    };

    return (
        <div>
        <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter ingredients you have..."
                value={data.ingredientInput}
                onChange={(e) => setData({...data, ingredientInput: e.target.value})}
                list="ingredients-list"
            />
            <datalist id="ingredients-list">
                {ingredientsArray.map((ingredient, index) => (
                    <option key={index} value={ingredient} />
                ))}
            </datalist>
            <button className="btn btn-primary" onClick={addIngredient}>Add Ingredient</button>
            <button className="btn btn-success ml-2" onClick={fetchRecipes}>Find Recipes</button>

            <h3>Ingredients List</h3>
            <ul className="list-unstyled">
                {data.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            {data.recipes.length > 0 && (
                <div className="d-flex flex-wrap justify-content-start">
                    {data.recipes.map((recipe, index) => (
                        <Card key={index} style={{ width: '18rem', margin: '10px' }}>
                            <Card.Img variant="top" src={recipe.image} />
                            <Card.Body>
                                <Card.Title>{recipe.title}</Card.Title>
                                <Card.Text>
                                    Likes: {recipe.likes}
                                    <br />
                                    Missed Ingredients: {recipe.missedIngredientCount}
                                    <ul>
                                        {recipe.missedIngredients.map((ingredient, idx) => (
                                            <li key={idx}>
                                                {ingredient.name} ({ingredient.amount} {ingredient.unitLong})
                                            </li>
                                        ))}
                                    </ul>
                                </Card.Text>
                                <Button variant="primary">View Recipe</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
