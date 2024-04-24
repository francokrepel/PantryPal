import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import RecipeCard from '../components/RecipeCard';

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const [data, setData] = useState({
        recipes: []
    });

    const fetchFavorites = async () => {
        try {
            const idResponse = await axios.get('/user/getFavorites', {
                params: { userId: user._id }
            });
            const recipeIds = idResponse.data;

            const recipeObjects = await axios.post('/api/recipesById', {
                recipeIds : recipeIds
            });

            setData({ ...data, recipes: recipeObjects.data });
        } catch (error) {
            console.error('Failed to fetch favorited recipes:', error);
        }
    };

    useEffect(() => {
      if (user) {
        fetchFavorites();
      }
    }, [user]);

    return (
        <div className="p-4">
            <h1 className='md:text-7xl sm:text-6xl text-5xl font-bold md:py-6 pb-6'>{!!user && data.recipes.length > 0 &&(<h1>hey <span className='text-[#1A4D2E]'>{user.name}</span>, these are your favorite recipes:</h1>)}</h1>
            <div className='w-full py-5 px-4'>
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
                    {!!user && data.recipes.length > 0 && (data.recipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} userId={user._id} />
                    )))}
                </div>
                <h2 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>{!!user && data.recipes.length == 0 &&(<h2> no favorites added yet <span className='text-[#1A4D2E]'>{user.name}</span>, browse recipes on the recipes page</h2>)}</h2>
            </div>
        </div>
    );
}
