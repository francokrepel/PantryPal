import React, { useState } from 'react';
import axios from 'axios';
import ingredientsArray from '../data/ingredientArray';
import RecipeCard from '../components/RecipeCard';
import { toast } from 'react-hot-toast';


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
        recipes: [],
        showAdvancedFilters: false
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

    const toggleAdvancedFilters = () => {
        setData({
            ...data,
            showAdvancedFilters: !data.showAdvancedFilters
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
                    cuisine: Array.from(cuisines).join('|'),
                    diet:Array.from(diets).join(',')
                }
            });
            if (response.data.results.length === 0) {
                toast.error("No results found for your search");
            } else {
                setData({
                    ...data,
                    recipes: response.data.results  // api returns array of recipes
                });
            }
        } catch (error) {
            console.error('Failed to fetch recipes:', error);
        }
    };

    const cuisineOptions = ["African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", "European", "French", "German", "Greek", "Indian", "Italian", "Japanese", "Mediterranean", "Mexican", "Thai", "Vietnamese"];
    const dietOptions = ["Gluten Free", "Ketogenic", "Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal"];

    return (
        <div className="p-4">
            <div className='mt-[6px] w-full flex flex-col'> 
                <h1 className='md:text-7xl sm:text-6xl text-5xl font-bold md:py-6 pb-6'>{!!user && (<h1>So <span className='text-[#1A4D2E]'>{user.name}</span>, whats in your kitchen?</h1>)}</h1>
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
                {/* <datalist id="ingredients-list">
                    {ingredientsArray.map((ingredient, index) => (
                        <option key={index} value={ingredient} />
                    ))}
                </datalist> */}
                <datalist id="ingredients-list">
                    {ingredientsArray
                        .filter(ingredient => {
                            const input = data.ingredientInput.toLowerCase();
                            const lowerCaseIngredient = ingredient.toLowerCase();
                            return lowerCaseIngredient.startsWith(input) || lowerCaseIngredient.includes(' ' + input);
                        })
                        .map((ingredient, index) => (
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
            <button className="text-lg font-semibold my-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" onClick={toggleAdvancedFilters}>
                {data.showAdvancedFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            {data.showAdvancedFilters && 
            (
                <>
                <p className='text-2xl font-bold my-2'>Choose your diets:</p>
                <div className='my-2 whitespace-nowrap grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3'>
                    {dietOptions.map(diet => (
                            <div key={diet} className="flex me-4">
                                <input 
                                    id={`${diet}-checkbox`} 
                                    type="checkbox" 
                                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    checked={data.diets.has(diet)}
                                    onChange={() => toggleItem(diet, 'diets')}
                                />
                                <label htmlFor={`${diet}-checkbox`} className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300">{diet}</label>
                            </div>
                        ))}
                </div>
                <p className='text-2xl font-bold my-2'>Choose cuisines:</p>
                <div className='my-2 whitespace-nowrap grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3'>
                    {cuisineOptions.map(cuisine => (
                            <div key={cuisine} className="flex me-4 ">
                                <input 
                                    id={`${cuisine}-checkbox`} 
                                    type="checkbox" 
                                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    checked={data.cuisines.has(cuisine)}
                                    onChange={() => toggleItem(cuisine, 'cuisines')}
                                />
                                <label htmlFor={`${cuisine}-checkbox`} className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300">{cuisine}</label>
                            </div>
                        ))}
                </div>
                </>
            )}
            <div className='w-full py-5 px-4'>
                {!!user && data.recipes && data.recipes.length == 0 && (
                    <div className="font-bold text-[#1A4D2E]">
                        <div className='max-w-[800px] mt-[24px] w-full mx-auto text-center flex flex-col justify-center items-center'> 
                              <p className='text-2xl font-bold p-2'>Input your ingredients and filters to find results...</p>
                          </div>
                    </div>
                )}
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
                    {!!user && data.recipes && data.recipes.length > 0 && data.recipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} userId={user._id} />
                    ))}
                </div>
            </div>
        </div>
    );
}
