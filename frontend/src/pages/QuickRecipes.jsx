import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import RecipeCard from '../components/RecipeCard';
import RecipeSkeleton from '../components/RecipeSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { ClockIcon, BoltIcon, SparklesIcon } from '@heroicons/react/24/outline';

const QuickRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeLimit, setTimeLimit] = useState(5); // 2 or 5

    useEffect(() => {
        const fetchQuickRecipes = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`recipes?prepTime=${timeLimit}`);
                setRecipes(res.data);
            } catch (err) {
                console.error("Error fetching quick recipes", err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuickRecipes();
    }, [timeLimit]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4 transition-colors duration-300 font-inter">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 relative">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 mb-6 uppercase tracking-[0.3em] text-[10px] font-black text-orange-500 bg-orange-50 dark:bg-orange-950/40 px-6 py-2 rounded-full border border-orange-100 dark:border-orange-500/20"
                    >
                        <BoltIcon className="h-4 w-4" /> Express Kitchen
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-black font-outfit text-gray-900 dark:text-white uppercase tracking-tighter mb-8 leading-[0.8]">
                        Lightning <span className="text-orange-500">Fast.</span>
                    </h1>
                    
                    {/* Time Toggle */}
                    <div className="flex justify-center gap-4 mt-12">
                        {[5, 10, 15].map((time) => (
                            <button
                                key={time}
                                onClick={() => setTimeLimit(time)}
                                className={`px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl ${timeLimit === time ? 'bg-orange-500 text-white shadow-orange-500/30' : 'bg-white dark:bg-gray-900 text-gray-500 border border-gray-100 dark:border-gray-800'}`}
                            >
                                {time} Min Recipes
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div 
                            key="skeleton"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {[...Array(8)].map((_, i) => <RecipeSkeleton key={i} />)}
                        </motion.div>
                    ) : recipes.length > 0 ? (
                        <motion.div 
                            key="content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {recipes.map((recipe, idx) => (
                                <motion.div
                                    key={recipe._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <RecipeCard recipe={recipe} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass dark:bg-gray-900/40 rounded-[3rem] p-24 text-center border border-dashed border-gray-300 dark:border-gray-800 max-w-2xl mx-auto"
                        >
                            <ClockIcon className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                            <h2 className="text-3xl font-black font-outfit text-gray-900 dark:text-white uppercase mb-4">No {timeLimit}m Recipes</h2>
                            <p className="text-gray-500 dark:text-gray-400 font-bold">We're still perfecting our super-fast techniques. Spread the word or upload your own!</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default QuickRecipes;
