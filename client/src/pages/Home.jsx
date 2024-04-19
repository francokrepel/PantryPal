import React, { useState } from 'react';
import ingredientsArray from '../data/ingredientArray';

function Home() {
    const [data, setData] = useState({
        ingredientInput: '',  // Here we define ingredientInput inside a single state object
        ingredients: []
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

    return (
        <div>
            <h1>Welcome to PantryPal</h1>
            <input
                type="text"
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
            <button onClick={addIngredient}>Add Ingredient</button>

            <h3>Ingredients List</h3>
            <ul>
                {data.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
