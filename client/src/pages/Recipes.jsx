import React, { useState } from 'react';
import axios from 'axios';
import ingredientsArray from '../data/ingredientArray';
import RecipeCard from '../components/RecipeCard';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

export default function Recipes() {
    const { user } = useContext(UserContext);
    console.log(user);

    const [data, setData] = useState({
        ingredientInput: '',
        ingredients: [],
        recipes: [],
    });

    const [isCuisinesOpen, setIsCuisinesOpen] = useState(false);
    const [isDietaryOpen, setIsDietaryOpen] = useState(false);

    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] = useState([]);

    const cuisinesOptions = [
        'African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean',
        'Chinese', 'Eastern European', 'European', 'French', 'German',
        'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish',
        'Korean', 'Latin American', 'Mediterranean', 'Mexican',
        'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai',
        'Vietnamese'
    ];

    const dietaryOptions = [
        'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan',
        'Paleo', 'Primal', 'Low FODMAP', 'Whole30'
    ];

    const clearAll = () => {
        setData({
            ...data,
            ingredients: [],
            ingredientInput: ''
        });
    
        setSelectedDietaryRestrictions([]);
        setSelectedCuisines([]);
    };

    const clearIngredients = () => {
        setData({
            ...data,
            ingredients: [],
        });
    };

    const removeIngredient = (index) => {
        const newIngredients = data.ingredients.filter((_, idx) => idx !== index);
        setData({
            ...data,
            ingredients: newIngredients,
        });
    };

    const addIngredient = (ingredient) => {
        const { ingredients } = data;
        if (ingredient.trim() !== '' && !ingredients.includes(ingredient)) {
            setData({
                ...data,
                ingredients: [...ingredients, ingredient],
                ingredientInput: '',
            });
        }
    };

    const fetchRecipes = async () => {
        const { ingredients } = data;
        try {
            const response = await axios.get('/api/recipes', {
                params: {
                    ingredients: ingredients.join(','),
                },
            });
            setData({
                ...data,
                recipes: response.data, // API returns array of recipes
            });
        } catch (error) {
            console.error('Failed to fetch recipes:', error);
        }
    };

    const toggleCuisines = () => {
        setIsCuisinesOpen((prev) => !prev);
    };

    const toggleDietary = () => {
        setIsDietaryOpen((prev) => !prev);
    };

    const handleCuisineChange = (option) => {
        if (selectedCuisines.includes(option)) {
            setSelectedCuisines(selectedCuisines.filter(cuisine => cuisine !== option));
        } else {
            setSelectedCuisines([...selectedCuisines, option]);
        }
    };

    const handleDietaryChange = (option) => {
        if (selectedDietaryRestrictions.includes(option)) {
            setSelectedDietaryRestrictions(selectedDietaryRestrictions.filter(restriction => restriction !== option));
        } else {
            setSelectedDietaryRestrictions([...selectedDietaryRestrictions, option]);
        }
    };

    const handleIngredientChange = (e) => {
        const { value } = e.target;
        setData({ ...data, ingredientInput: value });

        if (ingredientsArray.includes(value)) {
            addIngredient(value);
        }
    };

    return (
        <div className="p-4">
            <div className="mt-[6px] w-full flex flex-col">
                <h1 className="md:text-7xl sm:text-6xl text-5xl font-bold md:py-6 pb-6">
                    {!!user && (
                        <h1>
                            So <span className="text-[#1A4D2E]">{user.name}</span>, what's in your kitchen?
                        </h1>
                    )}
                </h1>
            </div>
            <div className="flex items-center mb-2 relative">
                <input
                    type="text"
                    className="form-control flex-1"
                    placeholder="Enter ingredients you have..."
                    value={data.ingredientInput}
                    onChange={handleIngredientChange}
                    list="ingredients-list"
                    id="ingredient-input"
                />
                <datalist id="ingredients-list">
                    {ingredientsArray.map((ingredient, index) => (
                        <option key={index} value={ingredient} />
                    ))}
                </datalist>
                <button className="btn btn-success ml-2" onClick={fetchRecipes}>Find Recipes</button>
                <button className="btn btn-primary ml-2" onClick={clearIngredients}>Clear Ingredients</button>
                <button className="btn btn-danger ml-2" onClick={clearAll}>Clear All</button>

            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                {data.ingredients.map((ingredient, index) => (
                    <div key={index} className="bg-[#a1d2b5] text-gray-900 rounded-full px-3 py-1 flex items-center">
                        {ingredient}
                        <button className="ml-2 text-red-500" onClick={() => removeIngredient(index)}>-</button>
                    </div>
                ))}
            </div>

            <div className="mb-4">
                <div>
                    <button className="arrow-button" onClick={toggleCuisines}>
                        Cuisines {isCuisinesOpen ? '▼' : '►'}
                    </button>
                    {isCuisinesOpen && (
                        <div className="cuisines-grid grid grid-cols-5 gap-4">
                            {cuisinesOptions.map((option, index) => (
                                <label key={index} className="block">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        value={option}
                                        onChange={() => handleCuisineChange(option)}
                                        checked={selectedCuisines.includes(option)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
                <br></br>
                <div className="mb-2">
                    <button className="arrow-button" onClick={toggleDietary}>
                        Dietary Restrictions {isDietaryOpen ? '▼' : '►'}
                    </button>
                    {isDietaryOpen && (
                        <div className="dietary-grid grid grid-cols-2 gap-4">
                            {dietaryOptions.map((option, index) => (
                                <label key={index} className="block">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        value={option}
                                        onChange={() => handleDietaryChange(option)}
                                        checked={selectedDietaryRestrictions.includes(option)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full py-5 px-4">
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
                    {!!user && data.recipes && data.recipes.length > 0 && data.recipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} userId={user._id} />
                    ))}
                </div>
            </div>
        </div>
    );
}