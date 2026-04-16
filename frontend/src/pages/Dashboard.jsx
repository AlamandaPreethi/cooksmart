import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { FavoritesContext } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';
import RecentlyViewed from '../components/RecentlyViewed';
import QuickTips from '../components/QuickTips';
import RecipeSkeleton from '../components/RecipeSkeleton';
import { motion } from 'framer-motion';
import { 
    HeartIcon, 
    UserIcon, 
    ArrowRightIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { favorites, loadingFavs } = useContext(FavoritesContext);
    
    // Derived state directly from Context
    const loading = loadingFavs;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-inter transition-colors duration-300">
            {/* Dashboard Hero */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 pt-12 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="flex items-center gap-3 mb-4 uppercase tracking-[0.2em] text-[10px] font-black text-orange-500">
                                <UserIcon className="h-4 w-4" /> Welcome Back
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black font-outfit text-gray-900 dark:text-white leading-[0.8] tracking-tighter">
                                Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">{user?.name || "Chef"}!</span>
                            </h1>
                        </motion.div>
                        
                        <div className="flex gap-4">
                            <Link to="/" className="bg-orange-500 hover:bg-orange-600 text-white font-black px-6 py-3 rounded-2xl transition-all shadow-xl shadow-orange-500/20 text-xs uppercase tracking-widest">
                                Start Searching
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Stats Card */}
                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="glass dark:bg-gray-900/60 p-8 rounded-[2.5rem] shadow-xl border border-white/20 flex items-center justify-between"
                    >
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Favorites</p>
                            <p className="text-4xl font-black font-outfit text-gray-900 dark:text-white">{favorites.length}</p>
                        </div>
                        <div className="p-4 bg-red-100 dark:bg-red-500/20 rounded-2xl text-red-500">
                            <HeartIcon className="h-8 w-8" />
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="glass dark:bg-gray-900/60 p-8 rounded-[2.5rem] shadow-xl border border-white/20 flex items-center justify-between"
                    >
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Account Level</p>
                            <p className="text-4xl font-black font-outfit text-gray-900 dark:text-white uppercase transition-colors hover:text-orange-500 cursor-default">Pro Chef</p>
                        </div>
                        <div className="p-4 bg-orange-100 dark:bg-orange-500/20 rounded-2xl text-orange-500">
                            <SparklesIcon className="h-8 w-8" />
                        </div>
                    </motion.div>
                </div>

                {/* Favorites Section */}
                <div className="mt-20 mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-xl">
                                <HeartIcon className="h-6 w-6 text-red-500" />
                            </div>
                            <h2 className="text-3xl font-black font-outfit text-gray-900 dark:text-white uppercase tracking-tight">
                                Your <span className="text-red-500">Favorites</span>
                            </h2>
                        </div>
                        <Link to="/favorites" className="text-sm font-black uppercase tracking-widest text-orange-500 flex items-center gap-2 hover:gap-3 transition-all">
                            View All <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <RecipeSkeleton />
                            <RecipeSkeleton />
                            <RecipeSkeleton />
                        </div>
                    ) : favorites.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {favorites.slice(0, 3).map(fav => (
                                fav.recipeId && (
                                    <RecipeCard 
                                        key={fav._id} 
                                        recipe={fav.recipeId} 
                                    />
                                )
                            ))}
                        </div>
                    ) : (
                        <div className="glass dark:bg-gray-900/40 rounded-[2.5rem] p-16 text-center border border-dashed border-gray-300 dark:border-gray-800">
                            <SparklesIcon className="h-12 w-12 text-orange-300 mx-auto mb-4" />
                            <p className="text-xl text-gray-500 dark:text-gray-400 font-bold mb-6">You haven't saved any recipes yet.</p>
                            <Link to="/" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-transform hover:scale-105">
                                Explore Recipes
                            </Link>
                        </div>
                    )}
                </div>

                <RecentlyViewed />
            </div>

            <QuickTips />
        </div>
    );
};

export default Dashboard;
