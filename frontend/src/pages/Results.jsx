import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../api/axios';
import RecipeCard from '../components/RecipeCard';
import IngredientSearch from '../components/IngredientSearch';
import RecipeSkeleton from '../components/RecipeSkeleton';
import QuickTips from '../components/QuickTips';
import { motion } from 'framer-motion';

const Results = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const ingredientsQuery = queryParams.get('ingredients') || '';

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                // If query exists, search by ingredients, otherwise fetch all
                const url = ingredientsQuery 
                    ? `/recipes?ingredients=${encodeURIComponent(ingredientsQuery)}` 
                    : '/recipes';
                const res = await axios.get(url);
                console.log("API RESPONSE DATA:", res.data);
                console.log("DATA LENGTH:", res.data.length);
                setRecipes(res.data);
            } catch (err) {
                console.error("Error fetching recipes", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [ingredientsQuery]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 pb-20 font-inter">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="mb-20 text-center relative">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 inline-block"
                    >
                        <h1 className="text-4xl md:text-6xl font-black font-outfit text-gray-900 dark:text-white uppercase tracking-tighter">
                            {ingredientsQuery ? "Your " : ""}
                            <span className="text-orange-500 underline decoration-orange-500/30 decoration-8 underline-offset-8">
                                {ingredientsQuery ? "Perfect Matches" : "Explore All Recipes"}
                            </span>
                        </h1>
                    </motion.div>
                    <div className="scale-105 max-w-4xl mx-auto drop-shadow-2xl">
                        <IngredientSearch initialQuery={ingredientsQuery} />
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => <RecipeSkeleton key={i} />)}
                    </div>
                ) : recipes.length > 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {recipes.map((recipe, idx) => (
                            <motion.div
                                key={recipe._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <RecipeCard 
                                    recipe={recipe} 
                                    onToggleFavorite={() => {}}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center glass dark:bg-gray-900/40 rounded-[3rem] p-16 md:p-24 border border-dashed border-gray-300 dark:border-gray-800 max-w-3xl mx-auto"
                    >
                        <span className="text-8xl mb-8 block grayscale opacity-50">👨‍🍳</span>
                        <h2 className="text-4xl font-black font-outfit text-gray-800 dark:text-white mb-4 uppercase tracking-tight">
                            {ingredientsQuery ? "No recipes found" : "No recipes available"}
                        </h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                            {ingredientsQuery ? (
                                <>
                                    We couldn't find matches for <span className="text-orange-500 font-black">"{ingredientsQuery}"</span>. <br/>Try simple ingredients like "Potato", "Rice", or "Chicken".
                                </>
                            ) : (
                                "There are no recipes in our database yet. Check back later or upload your own!"
                            )}
                        </p>
                    </motion.div>
                )}
            </div>
            <QuickTips />
        </div>
    );
};

export default Results;
