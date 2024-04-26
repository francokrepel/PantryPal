import React from 'react';
import { FaRegThumbsUp, FaHeart} from "react-icons/fa";
import axios from 'axios';
import {toast} from 'react-hot-toast'


function RecipeCard({ recipe, userId, inDashboard = false }) {
    // console.log(user)
    

    const handleFavorite = async (recipeId, userId) => {
        try {
            const response = await axios.post('/user/handleFavorite', {
                userId, recipeId
            });
            if (response.data.message) {
                toast.success(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                console.log('Failed to update favorites:', error);
                toast.error("Failed to update favorites due to a network or server issue.");
            }
        }
    };
    
    

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow hover:scale-105 duration-300 relative flex flex-col justify-between">
            <div>
                <a href="#">
                    <img className="rounded-t w-full" src={recipe.image} alt={recipe.title} />
                </a>
                <div className="p-3">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{recipe.title}</h5>
                    </a>
                    {/* different info depending on if in dashboard or recipe search */}
                    {!inDashboard ? (
                        <>
                        <p className=''>Ingredients Missing: {recipe.missedIngredientCount}</p>
                        <ul className='list-disc pl-5'>
                            {(recipe.missedIngredients || []).map((ingredient, idx) => (
                                <li key={idx}>{ingredient.name} ({ingredient.amount} {ingredient.unitLong})</li>
                            ))}
                        </ul>
                        </>
                    ) : (
                        <>
                        <p className=''>Ingredients:</p>
                        <ul className='list-disc pl-5'>
                            {recipe.extendedIngredients.map((ingredient, idx) => (
                                <li key={idx}>{ingredient.name} ({ingredient.amount} {ingredient.unitLong})</li>
                            ))}
                        </ul>
                        </>
                    )}
                </div>
            </div>
            <div className="p-3 text-center">
                <button className='w-[150px] mx-auto transition-colors duration-300 bg-[#1A4D2E] hover:bg-[#4F6F52] text-white font-bold my-3 py-4 rounded'>
                    Get Cookin'
                </button>
            </div>
            {!inDashboard && (
                <div className="absolute bottom-8 right-4 flex items-center space-x-2">
                    <FaRegThumbsUp />
                    <span>{recipe.likes}</span>
                </div>
            )}
            <button onClick={() => handleFavorite(recipe.id, userId)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                <FaHeart />
            </button>
        </div>
    );
    
    
}

export default RecipeCard;
