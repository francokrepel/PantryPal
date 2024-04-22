import React from 'react';

function RecipeCard({ recipe }) {
    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow hover:scale-105 duration-300">
            <a href="#">
                <img className="rounded w-full" src={recipe.image} alt="" />
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
            {/* <a href="#" className="flex transition-colors duration-300 bg-[#1A4D2E] hover:bg-[#4F6F52] text-white font-bold my-5 py-4 rounded">
                    Read more
                </a> */}
        </div>
    );
}

export default RecipeCard;
