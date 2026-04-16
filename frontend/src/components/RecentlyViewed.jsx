import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/solid';

const RecentlyViewed = () => {
    const [recentRecipes, setRecentRecipes] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('recentlyViewed');
        if (stored) {
            setRecentRecipes(JSON.parse(stored));
        }
    }, []);

    if (recentRecipes.length === 0) return null;

    return (
        <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-xl">
                        <SparklesIcon className="h-6 w-6 text-orange-500" />
                    </div>
                    <h2 className="text-3xl font-black font-outfit text-gray-900 dark:text-white uppercase tracking-tight">
                        Recently <span className="text-orange-500">Viewed</span>
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {recentRecipes.map((recipe, idx) => (
                        <motion.div
                            key={recipe._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <RecipeCard 
                                recipe={recipe} 
                                onToggleFavorite={(id, isFav) => {
                                    // Optionally handle global state if needed, 
                                    // but for now just updating the card's inner state is enough
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentlyViewed;
