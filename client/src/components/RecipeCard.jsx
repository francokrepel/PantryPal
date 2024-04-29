import React, { useState } from 'react';
import { FaRegThumbsUp, FaHeart } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-hot-toast';

function RecipeCard({ recipe, userId, inDashboard = false }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleFavorite = async (recipeId, userId) => {
        try {
            const response = await axios.post('/user/handleFavorite', { userId, recipeId });
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

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const toggleHover = () => {
        setIsHovered(!isHovered);
    };

    return (
        <div className={`w-full bg-white border border-gray-200 rounded-lg shadow ${isHovered ? 'scale-110' : 'hover:scale-105'} duration-300 relative flex flex-col justify-between`}>
            <div>
                <a href={recipe.image} target="_blank" rel="noopener noreferrer">
                    <img className="rounded-t w-full" src={recipe.image} alt={recipe.title} />
                </a>
                <div className="p-3">
                    <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{recipe.title}</h5>
                    </a>
                    <p className='font-semibold'>{recipe.readyInMinutes} minutes | Serves {recipe.servings}</p>
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
                    {inDashboard && (<div className="p-3 text-center">
                        <button onClick={toggleExpand} className='w-[150px] mx-auto transition-colors duration-300 bg-[#1A4D2E] hover:bg-[#4F6F52] text-white font-bold my-3 py-4 rounded'>
                            {isExpanded ? 'Hide Instructions' : 'Show Instructions'}
                        </button>
                    </div>)}
                    {isExpanded && inDashboard && (
                        <>
                            <p className="my-2">{
                                <div className='m-2'>
                                {recipe.analyzedInstructions.map((instruction, index) => (
                                    <div key={index} className="mb-4">
                                    <h3 className="text-xl font-bold mb-2">Steps:</h3>
                                    {instruction.steps.map(step => (
                                        <div key={step.number} className="mb-3">
                                        <p className="font-semibold">{step.number}. {step.step}</p>
                                        {step.ingredients.length > 0 && (
                                            <div>
                                            <h4 className="font-bold mt-2">Ingredients:</h4>
                                            <ul className="list-disc ml-5">
                                                {step.ingredients.map(ingredient => (
                                                <li key={ingredient.id} className="mt-1">
                                                    {ingredient.name} 
                                                    {ingredient.image && (
                                                    <img src={ingredient.image} alt={ingredient.name} className="inline w-8 h-8 ml-2"/>
                                                    )}
                                                </li>
                                                ))}
                                            </ul>
                                            </div>
                                        )}
                                        {step.equipment.length > 0 && (
                                            <div>
                                            <h4 className="font-bold mt-2">Equipment:</h4>
                                            <ul className="list-disc ml-5">
                                                {step.equipment.map(equip => (
                                                <li key={equip.id} className="mt-1">
                                                    {equip.name}
                                                    {equip.image && (
                                                    <img src={equip.image} alt={equip.name} className="inline w-8 h-8 ml-2"/>
                                                    )}
                                                </li>
                                                ))}
                                            </ul>
                                            </div>
                                        )}
                                        </div>
                                    ))}
                                    </div>
                                ))}
                            </div>
                             || "No instructions provided."}</p>
                        </>
                    )}
                </div>
            </div>
            <button onClick={() => handleFavorite(recipe.id, userId)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                <FaHeart />
            </button>
            <div className="absolute bottom-8 right-4 flex items-center space-x-2">
                <FaRegThumbsUp />
                <span>{recipe.aggregateLikes}</span>
            </div>
        </div>
    );
}

export default RecipeCard;
