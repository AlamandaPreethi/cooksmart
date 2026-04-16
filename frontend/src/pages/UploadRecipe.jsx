import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
    CloudArrowUpIcon, 
    BeakerIcon, 
    ClockIcon, 
    FireIcon, 
    UserGroupIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

const UploadRecipe = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        cuisine: '',
        imageUrl: '',
        prepTime: 15,
        cookTime: 20,
        servings: 4,
        calories: 400,
        category: 'Food',
        season: 'All'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/recipes', formData);
            alert('Recipe uploaded successfully!');
            navigate('/dashboard');
        } catch (err) {
            console.error('Upload failed', err);
            alert(err.response?.data?.msg || 'Error uploading recipe');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-300">
                <div className="glass dark:bg-gray-900/60 p-12 rounded-[3rem] text-center max-w-lg border border-white/20">
                    <SparklesIcon className="h-16 w-16 text-orange-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-black font-outfit mb-4 dark:text-white uppercase">Members Only</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-bold mb-8">Please login to share your culinary masterpieces with the world.</p>
                    <button onClick={() => navigate('/login')} className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-transform">
                        Login to Upload
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4 transition-colors duration-300 font-inter">
            <div className="max-w-4xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-2 px-4 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 font-black text-[10px] uppercase tracking-widest mb-4">Share Your Secrets</span>
                    <h1 className="text-4xl md:text-6xl font-black font-outfit text-gray-900 dark:text-white uppercase tracking-tighter">Upload <span className="text-orange-500">Masterpiece</span></h1>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="glass dark:bg-gray-900/60 p-8 md:p-12 rounded-[3rem] border border-white/20 shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Recipe Title</label>
                                <input 
                                    name="title" value={formData.title} onChange={handleChange} required
                                    placeholder="e.g. Grandma's Secret Ravioli"
                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 dark:text-white font-bold transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Cuisine Style</label>
                                <input 
                                    name="cuisine" value={formData.cuisine} onChange={handleChange} required
                                    placeholder="e.g. Italian, Spicy, Healthy"
                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 dark:text-white font-bold transition-all"
                                />
                            </div>
                        </div>

                        <div className="mt-8 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Image URL</label>
                            <div className="relative">
                                <CloudArrowUpIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input 
                                    name="imageUrl" value={formData.imageUrl} onChange={handleChange} required
                                    placeholder="Paste image address here..."
                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 dark:text-white font-bold transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Details & Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Preparation Details */}
                        <div className="glass dark:bg-gray-900/60 p-8 md:p-10 rounded-[3rem] border border-white/20">
                            <h3 className="text-xl font-black font-outfit mb-6 uppercase tracking-tight dark:text-white">Prep Details</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <ClockIcon className="h-6 w-6 text-orange-500 shrink-0" />
                                    <div className="flex-grow">
                                        <p className="text-[10px] font-black uppercase text-gray-400">Prep Time (mins)</p>
                                        <input name="prepTime" type="number" value={formData.prepTime} onChange={handleChange} className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 font-bold dark:text-white py-1 outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FireIcon className="h-6 w-6 text-red-500 shrink-0" />
                                    <div className="flex-grow">
                                        <p className="text-[10px] font-black uppercase text-gray-400">Calories (kcal)</p>
                                        <input name="calories" type="number" value={formData.calories} onChange={handleChange} className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 font-bold dark:text-white py-1 outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <UserGroupIcon className="h-6 w-6 text-blue-500 shrink-0" />
                                    <div className="flex-grow">
                                        <p className="text-[10px] font-black uppercase text-gray-400">Servings</p>
                                        <input name="servings" type="number" value={formData.servings} onChange={handleChange} className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 font-bold dark:text-white py-1 outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Categorization */}
                        <div className="glass dark:bg-gray-900/60 p-8 md:p-10 rounded-[3rem] border border-white/20">
                            <h3 className="text-xl font-black font-outfit mb-6 uppercase tracking-tight dark:text-white">Classification</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Category</p>
                                    <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-xl font-bold dark:text-white outline-none">
                                        <option value="Food">Food / Main Course</option>
                                        <option value="Drink">Drink / Beverage</option>
                                    </select>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Primary Season</p>
                                    <select name="season" value={formData.season} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-xl font-bold dark:text-white outline-none">
                                        <option value="All">All Seasons</option>
                                        <option value="Spring">Spring 🌸</option>
                                        <option value="Summer">Summer ☀️</option>
                                        <option value="Autumn">Autumn 🍂</option>
                                        <option value="Winter">Winter ❄️</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ingredients & Steps */}
                    <div className="glass dark:bg-gray-900/60 p-8 md:p-12 rounded-[3rem] border border-white/20">
                         <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Ingredients (comma separated)</label>
                                <textarea 
                                    name="ingredients" value={formData.ingredients} onChange={handleChange} required
                                    placeholder="Chicken, Garlic, Salt, Pepper..."
                                    rows="3"
                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 dark:text-white font-bold transition-all resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Instructions (period separated steps)</label>
                                <textarea 
                                    name="instructions" value={formData.instructions} onChange={handleChange} required
                                    placeholder="Chop the garlic. Sauté in butter. Add chicken..."
                                    rows="5"
                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 dark:text-white font-bold transition-all resize-none"
                                />
                            </div>
                         </div>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-orange-500/20 uppercase tracking-[0.2em] transition-all disabled:opacity-50"
                    >
                        {loading ? "Transmitting Recipe..." : "Publish To CookSmart"}
                    </motion.button>
                </form>
            </div>
        </div>
    );
};

export default UploadRecipe;
