import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import RecipeCard from '../components/RecipeCard';
import RecipeSkeleton from '../components/RecipeSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    SunIcon, 
    SparklesIcon,
    MoonIcon
} from '@heroicons/react/24/outline';

const SeasonalDrinks = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSeason, setSelectedSeason] = useState(() => {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 'Spring';
        if (month >= 5 && month <= 7) return 'Summer';
        if (month >= 8 && month <= 10) return 'Autumn';
        return 'Winter';
    });

    const seasons = [
        { id: 'All', name: 'All 🌟', color: 'bg-indigo-600', bg: 'bg-indigo-100/20' },
        { id: 'Spring', name: 'Spring 🌸', color: 'bg-green-500', bg: 'bg-green-100/20' },
        { id: 'Summer', name: 'Summer ☀️', color: 'bg-orange-400', bg: 'bg-orange-100/20' },
        { id: 'Autumn', name: 'Autumn 🍂', color: 'bg-brown-600', bg: 'bg-amber-100/20' },
        { id: 'Winter', name: 'Winter ❄️', color: 'bg-blue-600', bg: 'bg-blue-100/20' }
    ];

    useEffect(() => {
        const fetchDrinks = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`recipes?category=Drink&season=${selectedSeason}`);
                setRecipes(res.data);
            } catch (err) {
                console.error("Error fetching seasonal drinks:", err.response?.data || err.message);
                setRecipes([]);
            } finally {
                setLoading(false);
            }
        };
        fetchDrinks();
    }, [selectedSeason]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4 transition-colors duration-300 font-inter relative overflow-hidden">
            {/* Seasonal Background Blobs */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full blur-[150px] animate-blob"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-300 rounded-full blur-[150px] animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20 animate-container">
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 mb-6 uppercase tracking-[0.4em] text-[10px] font-black text-blue-500 bg-white dark:bg-gray-900 px-6 py-2 rounded-full border border-gray-100 dark:border-gray-800 shadow-xl"
                    >
                        <SparklesIcon className="h-4 w-4" /> Limited Edition
                    </motion.div>
                    <h1 className="text-6xl md:text-9xl font-black font-outfit text-gray-900 dark:text-white uppercase tracking-tighter mb-10 leading-[0.8] transition-all">
                        Seasonal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-400">Drinks.</span>
                    </h1>
                    
                    <div className="flex flex-wrap justify-center gap-4 mt-12">
                        {seasons.map((s) => (
                            <motion.button
                                key={s.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedSeason(s.id)}
                                className={`px-10 py-4 rounded-[2rem] font-black uppercase tracking-widest text-[11px] transition-all shadow-xl flex items-center gap-3 ${selectedSeason === s.id ? `${s.color} text-white shadow-lg` : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-500 border border-gray-100 dark:border-gray-800'}`}
                            >
                                {s.name}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* REPLACED AnimatePresence with simple ternary for stability */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
                        {[...Array(8)].map((_, i) => <RecipeSkeleton key={i} />)}
                    </div>
                ) : recipes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    </div>
                ) : (
                    <div className="glass dark:bg-gray-900/40 rounded-[3rem] p-24 text-center border border-dashed border-gray-300 dark:border-gray-800 max-w-2xl mx-auto">
                        <MoonIcon className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                        <h2 className="text-3xl font-black font-outfit text-gray-900 dark:text-white uppercase mb-4">No {selectedSeason} Drinks Found</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-bold leading-relaxed">We're still distilling the spirit of {selectedSeason}. Check back soon or share your favorite recipe with the community!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeasonalDrinks;
