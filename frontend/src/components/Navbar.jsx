import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BeakerIcon, SparklesIcon } from '@heroicons/react/24/solid';
import ThemeToggle from './ThemeToggle';
import axios from '../api/axios';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleRandomRecipe = async () => {
        try {
            const res = await axios.get('/recipes/random');
            if (res.data && res.data._id) {
                navigate(`/recipe/${res.data._id}`);
            }
        } catch (error) {
            console.error("Failed to fetch random recipe", error);
        }
    };

    return (
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
                            <motion.div
                                whileHover={{ rotate: 15 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <BeakerIcon className="h-9 w-9 text-orange-500" />
                            </motion.div>
                            <span className="font-outfit font-black text-2xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
                                CookSmart
                            </span>
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-8">
                        <Link to="/results" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition font-bold font-outfit uppercase tracking-wider text-xs">Explore</Link>
                        <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition font-bold font-outfit uppercase tracking-wider text-xs">About</Link>
                        <Link to="/quick" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition font-bold font-outfit uppercase tracking-wider text-xs flex items-center gap-1.5 focus:text-orange-500">
                            Express
                        </Link>
                        <Link to="/drinks" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition font-bold font-outfit uppercase tracking-wider text-xs flex items-center gap-1.5">
                            Drinks
                        </Link>
                        <Link to="/hacks" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition font-bold font-outfit uppercase tracking-wider text-xs flex items-center gap-1.5">
                            Hacks
                        </Link>
                        <button 
                            onClick={handleRandomRecipe}
                            className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition font-bold font-outfit uppercase tracking-wider text-xs flex items-center gap-1.5"
                        >
                            <SparklesIcon className="h-4 w-4 text-orange-400" />
                            Random
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-1"></div>
                        
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link to="/favorites" className="hidden sm:block text-gray-600 dark:text-gray-300 hover:text-orange-500 transition font-bold text-xs uppercase tracking-widest">Favorites</Link>
                                <Link to="/upload" className="hidden sm:block text-gray-600 dark:text-gray-300 hover:text-orange-500 transition font-bold text-xs uppercase tracking-widest">Upload</Link>
                                <button onClick={handleLogout} className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl transition font-bold text-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition font-bold">Login</Link>
                                <Link to="/register" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2.5 rounded-xl transition shadow-lg shadow-orange-500/30 font-bold tracking-wide">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
