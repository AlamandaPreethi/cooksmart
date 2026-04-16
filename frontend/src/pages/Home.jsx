import React from 'react';
import IngredientSearch from '../components/IngredientSearch';
import RecentlyViewed from '../components/RecentlyViewed';
import QuickTips from '../components/QuickTips';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center relative overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 w-full h-[80vh] overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-300 dark:bg-orange-900/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 dark:opacity-20 animate-blob"></div>
                <div className="absolute top-[10%] right-[-5%] w-[450px] h-[450px] bg-red-300 dark:bg-red-900/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 dark:opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-yellow-300 dark:bg-yellow-900/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 dark:opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center px-4 pt-24 pb-20 max-w-5xl mx-auto w-full">
                <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block py-2 px-5 rounded-full bg-orange-100/80 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-black text-xs mb-8 border border-orange-200 dark:border-orange-800/50 uppercase tracking-[0.2em]"
                >
                    Smart Cooking Made Simple
                </motion.span>
                
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-8xl font-black font-outfit text-gray-900 dark:text-white mb-8 leading-[0.9] tracking-tighter"
                >
                    Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">tasty meals</span> with ingredients you <span className="underline decoration-yellow-400 decoration-8 underline-offset-8">already have.</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-14 max-w-3xl mx-auto font-medium leading-relaxed"
                >
                    Don't know what to cook? Just enter your ingredients and we'll find the perfect recipe for you instantly.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-20 scale-105 md:scale-110 drop-shadow-2xl"
                >
                    <IngredientSearch />
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-10 flex justify-center"
                    >
                        <Link 
                            to="/results" 
                            className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2 group transition-all"
                        >
                            Or <span className="underline decoration-gray-300 dark:decoration-gray-700 underline-offset-4 group-hover:decoration-orange-500/50">Browse All Recipes</span> 
                            <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </motion.div>
                
                {/* Steps with Hover Effects */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-500 font-outfit font-medium text-sm border-t border-gray-200 dark:border-gray-800 pt-20">
                    {[
                        { num: "01", text: "List Ingredients", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                        { num: "02", text: "Find Recipes", color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
                        { num: "03", text: "Start Cooking", color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20" }
                    ].map((step, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -5 }}
                            className="flex flex-col items-center gap-4 group"
                        >
                            <div className={`w-20 h-20 rounded-[2.5rem] ${step.bg} flex items-center justify-center ${step.color} text-3xl font-black shadow-lg border-2 border-transparent group-hover:border-current transition-all duration-300`}>
                                {step.num}
                            </div>
                            <span className="text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest text-xs">{step.text}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Smart Sections */}
            <div className="w-full bg-white dark:bg-gray-900 transition-colors duration-300">
                <RecentlyViewed />
            </div>

            <QuickTips />

            {/* Visual Decorative Background Image */}
            <div className="w-full py-32 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format&fit=crop&q=80"
                    alt="Food Header"
                    className="w-full h-[500px] object-cover opacity-20 dark:opacity-10 pointer-events-none mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-950 via-transparent to-gray-50 dark:to-gray-950"></div>
            </div>
        </div>
    );
};

export default Home;
