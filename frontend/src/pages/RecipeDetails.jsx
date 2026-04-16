import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ClockIcon, 
    FireIcon, 
    UserGroupIcon, 
    ChartBarIcon,
    ArrowLeftIcon,
    StarIcon,
    CheckBadgeIcon,
    LightBulbIcon,
    HeartIcon as HeartOutline
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { AuthContext } from '../context/AuthContext';
import { FavoritesContext } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';
import RecentlyViewed from '../components/RecentlyViewed';
import QuickTips from '../components/QuickTips';

const RecipeDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedRecipes, setRelatedRecipes] = useState([]);
    
    // Review form state
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`recipes/${id}`);
                setRecipe(res.data);
                
                // Fetch related recipes by cuisine
                if (res.data.cuisine) {
                    const relatedRes = await axios.get(`recipes?cuisine=${res.data.cuisine}`);
                    setRelatedRecipes(relatedRes.data.filter(r => r._id !== res.data._id).slice(0, 4));
                }

                // Favorites context handles checking logic globally so we don't need a local fetch here
                
                // Add to Recently Viewed
                if (res.data) {
                    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
                    const filtered = recentlyViewed.filter(r => r._id !== res.data._id);
                    const updated = [res.data, ...filtered].slice(0, 4);
                    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
                }
                
                window.scrollTo(0, 0);
            } catch (err) {
                console.error("Error fetching recipe", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchRecipe();
    }, [id, user]);

    const favoriteStatus = recipe ? isFavorite(recipe._id) : false;

    const handleFavorite = async () => {
        if (!user) return alert("Please login to save favorites.");
        try {
            await toggleFavorite(recipe);
        } catch (error) {
            console.error('Failed to toggle favorite', error);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert("Please login to review.");
        if (!reviewComment.trim()) return alert("Please write a comment.");

        setSubmitLoading(true);
        try {
            await axios.post(`recipes/${id}/reviews`, {
                rating: reviewRating,
                comment: reviewComment
            });
            
            const res = await axios.get(`recipes/${id}`);
            setRecipe(res.data);
            setReviewComment("");
            setReviewRating(5);
        } catch (error) {
            console.error('Failed to submit review', error);
        } finally {
            setSubmitLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-950">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-16 w-16 border-t-4 border-b-4 border-orange-500 rounded-full"
                ></motion.div>
            </div>
        );
    }

    if (!recipe) {
        return <div className="text-center py-20 text-4xl font-black font-outfit text-gray-800 dark:text-gray-200 uppercase">Recipe not found.</div>;
    }

    const stats = [
        { icon: <ClockIcon className="h-6 w-6"/>, label: "Cook Time", val: `${recipe.cookTime || 20} min`, color: "text-orange-500" },
        { icon: <FireIcon className="h-6 w-6"/>, label: "Calories", val: `${recipe.calories || 400} kcal`, color: "text-red-500" },
        { icon: <UserGroupIcon className="h-6 w-6"/>, label: "Servings", val: `${recipe.servings || 4} People`, color: "text-blue-500" },
        { icon: <ChartBarIcon className="h-6 w-6"/>, label: "Prep Time", val: `${recipe.prepTime || 15} min`, color: "text-green-500" }
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-20 font-inter transition-colors duration-300">
            {/* Header Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full bg-gray-900 overflow-hidden">
                <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={recipe.imageUrl || "https://images.unsplash.com/photo-1495195129352-aec325b55b65?w=1600&auto=format&fit=crop&q=80"} 
                    alt={recipe.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1495195129352-aec325b55b65?w=1600&auto=format&fit=crop&q=80";
                    }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>
                
                {/* Back Button */}
                <div className="absolute top-8 left-8 z-20">
                    <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl text-white font-black uppercase tracking-widest transition-all shadow-xl text-xs border border-white/10">
                        <ArrowLeftIcon className="h-4 w-4" /> Back
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 z-20">
                    <div className="max-w-6xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-block px-6 py-2 bg-orange-500 text-white rounded-full text-xs font-black tracking-[0.2em] uppercase mb-6 shadow-2xl"
                        >
                            {recipe.cuisine || "Worldwide"} • {recipe.category || "Food"}
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-8xl font-black font-outfit text-white mb-6 leading-[0.85] tracking-tighter drop-shadow-2xl"
                        >
                            {recipe.title}
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray-300 font-medium max-w-3xl drop-shadow-lg"
                        >
                            Enjoy this delicious {recipe.category?.toLowerCase() || "dish"}. Simple ingredients, professional results.
                        </motion.p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
                {/* Stats Bar */}
                <div className="glass dark:bg-gray-900/80 rounded-[3rem] shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 border border-white/20 dark:border-white/5 mb-16">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className={`${stat.color} mb-1 opacity-80`}>{stat.icon}</div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">{stat.label}</span>
                            <span className="text-lg font-black font-outfit text-gray-900 dark:text-white">{stat.val}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Panel */}
                    <div className="lg:col-span-1 space-y-12">
                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleFavorite}
                                className={`flex-1 flex justify-center items-center gap-2 py-4 px-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl ${favoriteStatus ? 'bg-red-500 text-white shadow-red-500/20' : 'bg-white dark:bg-gray-900 text-gray-950 dark:text-white border border-gray-100 dark:border-gray-800'}`}
                            >
                                {favoriteStatus ? <HeartSolid className="h-4 w-4" /> : <HeartOutline className="h-4 w-4" />}
                                {favoriteStatus ? "Saved" : "Save"}
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.02, y: -2 }}
                                className="flex-[2] bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-orange-500/30"
                            >
                                {recipe.category === 'Drink' ? 'Start Mixing 🍸' : 'Start Cooking 👨‍🍳'}
                            </motion.button>
                        </div>

                        {/* Ingredients */}
                        <div className="glass dark:bg-gray-900/40 p-10 rounded-[2.5rem] border border-white/10">
                            <h2 className="text-3xl font-black font-outfit text-gray-900 dark:text-white mb-8 border-b dark:border-white/5 pb-4 uppercase tracking-tighter">Ingredients</h2>
                            <ul className="space-y-6">
                                {recipe.ingredients.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 group">
                                        <div className="h-6 w-6 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center border border-orange-200 dark:border-orange-500/30 group-hover:scale-110 transition-transform">
                                            <CheckBadgeIcon className="h-4 w-4 text-orange-500" />
                                        </div>
                                        <span className="text-lg text-gray-700 dark:text-gray-300 font-bold capitalize">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Panel: Directions */}
                    <div className="lg:col-span-2">
                        <div className="glass dark:bg-gray-900/40 p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-3xl">
                            <div className="flex justify-between items-center mb-12 border-b dark:border-white/5 pb-8">
                                <h2 className="text-4xl md:text-5xl font-black font-outfit text-gray-900 dark:text-white uppercase tracking-tighter">Directions</h2>
                                <div className="flex items-center gap-2">
                                    <StarIcon className="h-6 w-6 text-yellow-500 fill-current" />
                                    <span className="text-2xl font-black font-outfit text-gray-900 dark:text-white">{(recipe.rating || 5).toFixed(1)}</span>
                                </div>
                            </div>

                            <div className="space-y-16">
                                {recipe.instructions.map((step, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="relative pl-20 group"
                                    >
                                        <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-gray-950 dark:bg-white text-white dark:text-gray-950 flex items-center justify-center font-black text-xl shadow-2xl group-hover:scale-110 transition-transform">
                                            {idx + 1}
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-1">Step {idx + 1}</h3>
                                            <p className="text-xl text-gray-600 dark:text-gray-300 font-bold leading-relaxed">{step}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Chef Hook Panel */}
                        <div className="mt-12 p-10 bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] relative overflow-hidden group">
                           <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                           <h3 className="flex items-center gap-3 text-orange-500 font-black uppercase tracking-[0.2em] text-xs mb-6">
                               <LightBulbIcon className="h-5 w-5" /> Professional Tip
                           </h3>
                           <p className="text-2xl text-white font-black font-outfit leading-snug">
                               "Always season your components at every stage. Freshness is the secret to great {recipe.category === 'Drink' ? 'drinks' : 'meals'}."
                           </p>
                        </div>
                    </div>
                </div>

                {relatedRecipes.length > 0 && (
                    <div className="mt-20 border-t dark:border-white/5 pt-20">
                        <h2 className="text-3xl font-black font-outfit mb-12 uppercase tracking-tighter dark:text-white">More {recipe.cuisine} Favorites</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedRecipes.map((r) => (
                                <RecipeCard key={r._id} recipe={r} onToggleFavorite={() => {}} />
                            ))}
                        </div>
                    </div>
                )}

                <RecentlyViewed />
            </div>

            <QuickTips />
        </div>
    );
};

export default RecipeDetails;
