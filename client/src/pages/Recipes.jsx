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
        cuisines: new Set(),
        diets : new Set(),
        recipes: []
    });

    const toggleItem = (item, type) => {
        const updatedSet = new Set(data[type]);
        if (updatedSet.has(item)) {
            updatedSet.delete(item);
        } else {
            updatedSet.add(item);
        }
        setData({
            ...data,
            [type]: updatedSet
        });
    };

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
        const { ingredients, cuisines, diets  } = data;
        try {
            const response = await axios.get('/api/complexRecipes', {
                params: {
                    ingredients: ingredients.join(','),
                    cuisine: Array.from(cuisines).join(','),
                    diet:Array.from(diets).join(',')
                }
            });
            setData({
                ...data,
                recipes: response.data.results  // api returns array of recipes
            });
        } catch (error) {
            console.error('Failed to fetch recipes:', error);
        }
    };

    const cuisineOptions = ["African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European", "French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"];
    const dietOptions = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal"];

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
            <div className='grid grid-cols-5 gap-4'>
                {cuisineOptions.map(cuisine => (
                        <div key={cuisine} className="flex items-center me-4">
                            <input 
                                id={`${cuisine}-checkbox`} 
                                type="checkbox" 
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                checked={data.cuisines.has(cuisine)}
                                onChange={() => toggleItem(cuisine, 'cuisines')}
                            />
                            <label htmlFor={`${cuisine}-checkbox`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{cuisine}</label>
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
