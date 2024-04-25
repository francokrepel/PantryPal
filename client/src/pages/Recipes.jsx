import React, { useState } from 'react';
import axios from 'axios';
import ingredientsArray from '../data/ingredientArray';
import RecipeCard from '../components/RecipeCard';

import { useContext} from 'react'
import { UserContext } from '../../context/userContext'

export default function Recipes() {

    const {user} = useContext(UserContext)
    console.log(user)
    
    const [data, setData] = useState({
        ingredientInput: '',
        ingredients: [],
        recipes: [],
    });

    const clearIngredients = () => {
        setData({
            ...data,
            ingredients: []
        });
    };

    function removeIngredient(index) {
        const newIngredients = data.ingredients.filter((_, idx) => idx !== index);
    
        setData({
            ...data,
            ingredients: newIngredients
        });
    }
    

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
            const response = await axios.get('/api/recipes', {
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
        <div className="p-4">
            <div className='mt-[6px] w-full flex flex-col'> 
                <h1 className='md:text-7xl sm:text-6xl text-5xl font-bold md:py-6 pb-6'>{!!user && (<h1>so <span className='text-[#1A4D2E]'>{user.name}</span>, whats in your kitchen?</h1>)}</h1>
            </div>
            <div className="flex items-center mb-2">
                <input
                    type="text"
                    className="form-control flex-1"
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
                <button className="btn btn-primary ml-2" onClick={addIngredient}>Add</button>
                <button className="btn btn-success ml-2" onClick={fetchRecipes}>Find Recipes</button>
                <button className="btn btn-danger ml-2" onClick={clearIngredients}>Clear All</button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                {data.ingredients.map((ingredient, index) => (
                    <div key={index} className="bg-[#a1d2b5] text-gray-900 rounded-full px-3 py-1 flex items-center">
                        {ingredient}
                        <button className="ml-2 text-red-500" onClick={() => removeIngredient(index)}>-</button>
                    </div>
                ))}
            </div>
            <div className='w-full py-5 px-4'>
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
                {!!user && data.recipes && data.recipes.length > 0 && data.recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} userId={user._id} />
                ))}
                </div>
            </div>
        </div>
    );
}
