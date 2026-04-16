import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FavoritesContext } from '../context/FavoritesContext';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    ClockIcon, 
    FireIcon, 
    ChevronRightIcon,
    HeartIcon,
    StarIcon
} from '@heroicons/react/24/outline';

const RecipeCard = ({ recipe }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
    
    // We compute the visual state directly from Context
    const favoriteStatus = isFavorite(recipe._id || recipe.id);

    const handleToggleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) return alert("Please login to save favorites.");
        
        setLoading(true);
        try {
            await toggleFavorite(recipe);
        } catch (error) {
            console.error('Failed to toggle favorite', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group glass dark:bg-gray-900/60 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-white/5 flex flex-col h-full relative"
        >
            <Link 
                to={`/recipe/${recipe._id}`}
                className="absolute inset-0 z-10"
                aria-label={recipe.title}
            >
            </Link>

            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <img 
                    src={recipe.imageUrl || "https://images.unsplash.com/photo-1495195129352-aec325b55b65?w=800&auto=format&fit=crop&q=60"} 
                    alt={recipe.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1495195129352-aec325b55b65?w=800&auto=format&fit=crop&q=60";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Cuisine Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-900 dark:text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border border-white/20">
                        {recipe.cuisine || "Global"}
                    </span>
                </div>

                {/* Quick Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-center text-white z-20">
                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                        <ClockIcon className="h-4 w-4 text-orange-400" /> {recipe.prepTime || 15}m
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                        <StarIcon className="h-4 w-4 text-yellow-400 fill-current" /> {recipe.rating?.toFixed(1) || "5.0"}
                    </div>
                </div>

                {/* Favorite Button Overlay */}
                <div className="absolute top-4 right-4 z-30">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleToggleFavorite}
                        disabled={loading}
                        className={`p-3 rounded-2xl backdrop-blur-md transition-all shadow-xl ${favoriteStatus ? 'bg-red-500 text-white shadow-red-500/20' : 'bg-white/80 dark:bg-gray-900/80 text-gray-500 hover:text-red-500'}`}
                    >
                        <HeartIcon className={`h-5 w-5 ${favoriteStatus ? 'hidden' : 'block'}`} />
                        {/* We use a solid SVG icon for filled status securely */}
                        <svg className={`h-5 w-5 ${favoriteStatus ? 'block' : 'hidden'} fill-current`} viewBox="0 0 24 24">
                           <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col flex-grow relative z-20 pointer-events-none">
                <h3 className="text-2xl font-black font-outfit text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-orange-500 transition-colors">
                    {recipe.title}
                </h3>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-6 line-clamp-2 font-inter leading-relaxed">
                    {recipe.ingredients.join(', ')}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{recipe.category || 'Food'}</span>
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{recipe.calories || 400} Kcal</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 text-orange-500 font-black uppercase tracking-widest text-[10px] group/btn transition-all hover:gap-2 underline decoration-transparent hover:decoration-orange-500 underline-offset-4">
                        View Details <ChevronRightIcon className="h-3 w-3" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RecipeCard;
