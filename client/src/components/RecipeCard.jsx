import React from 'react';
import { FaRegThumbsUp } from "react-icons/fa";

function RecipeCard({ recipe }) {
    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow hover:scale-105 duration-300 relative">
            <a href="#">
                <img className="rounded-t w-full" src={recipe.image} alt={recipe.title} />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{recipe.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Likes: {recipe.likes}</p>
                <p>Missed Ingredients: {recipe.missedIngredientCount}</p>
                <ul>
                    {recipe.missedIngredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient.name} ({ingredient.amount} {ingredient.unitLong})</li>
                    ))}
                </ul>
            </div>
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                <FaRegThumbsUp />
                <span>{recipe.likes}</span>
            </div>
        </div>
    );
}

export default RecipeCard;
