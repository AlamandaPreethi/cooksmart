import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { FavoritesContext } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';
import RecipeSkeleton from '../components/RecipeSkeleton';
import RecentlyViewed from '../components/RecentlyViewed';
import QuickTips from '../components/QuickTips';
import { motion } from 'framer-motion';
import { HeartIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const { user } = useContext(AuthContext);
    const { favorites, loadingFavs } = useContext(FavoritesContext);
    
    // Derived state directly from Context
    const loading = loadingFavs;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 font-inter">
            {/* Hero Section */}
            <div className="relative py-24 overflow-hidden border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 dark:bg-red-900/20 rounded-full blur-[120px] opacity-50 transform translate-x-1/2 -translate-y-1/2 animate-blob"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center md:text-left"
                    >
                        <div className="inline-flex items-center gap-2 mb-4 uppercase tracking-[0.3em] text-[10px] font-black text-red-500 bg-red-50 dark:bg-red-500/10 px-4 py-1.5 rounded-full border border-red-100 dark:border-red-500/20">
                            <HeartIcon className="h-4 w-4" /> Personal Library
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black font-outfit text-gray-900 dark:text-white leading-[0.8] mb-6 tracking-tighter">
                            Your <span className="text-red-500">Favorites.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl leading-relaxed">
                            A curated gallery of your most loved culinary secrets.
                        </p>
                    </motion.div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-40">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => <RecipeSkeleton key={i} />)}
                    </div>
                ) : favorites.length > 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {favorites.map((fav, idx) => (
                            fav.recipeId && (
                                <motion.div
                                    key={fav._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <RecipeCard 
                                        recipe={fav.recipeId} 
                                    />
                                </motion.div>
                            )
                        ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass dark:bg-gray-900/40 rounded-[3rem] p-24 text-center border-2 border-dashed border-gray-200 dark:border-gray-800"
                    >
                        <SparklesIcon className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                        <h2 className="text-4xl font-black font-outfit text-gray-900 dark:text-white uppercase mb-4 tracking-tighter">No favorites yet</h2>
                        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-12">Capture your first favorite today and start your personal journey.</p>
                        <Link to="/" className="bg-gray-950 dark:bg-white text-white dark:text-gray-900 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl transition-transform hover:scale-105">
                            Discover Recipes
                        </Link>
                    </motion.div>
                )}

                <div className="mt-20">
                    <RecentlyViewed />
                </div>
            </main>
            <QuickTips />
        </div>
    );
};

export default Favorites;
