import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EnvelopeIcon, LockClosedIcon, UserIcon, BeakerIcon } from '@heroicons/react/24/outline';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.name, formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex relative overflow-hidden font-inter transition-colors duration-300">
            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 z-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-red-100 dark:bg-red-900/10 rounded-full blur-[120px] opacity-50 transform -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-12">
                        <Link to="/" className="lg:hidden flex items-center gap-2 mb-10">
                            <BeakerIcon className="h-10 w-10 text-orange-500" />
                            <span className="font-outfit font-black text-3xl dark:text-white">CookSmart</span>
                        </Link>
                        <h1 className="text-5xl font-black font-outfit text-gray-900 dark:text-white mb-4 tracking-tighter uppercase">Join Us.</h1>
                        <p className="text-gray-500 dark:text-gray-400 font-bold mb-12">Start your zero-waste journey with a free account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Full Name</label>
                            <div className="relative group">
                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Chef Gordon"
                                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-bold placeholder:text-gray-300 dark:placeholder:text-gray-700 dark:text-white"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Email Address</label>
                            <div className="relative group">
                                <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                <input 
                                    type="email" 
                                    placeholder="chef@cooksmart.com"
                                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-bold placeholder:text-gray-300 dark:placeholder:text-gray-700 dark:text-white"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Password</label>
                            <div className="relative group">
                                <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                <input 
                                    type="password" 
                                    placeholder="••••••••"
                                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-bold placeholder:text-gray-300 dark:placeholder:text-gray-700 dark:text-white"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                className="w-full bg-gray-950 dark:bg-white text-white dark:text-gray-950 font-black py-4 rounded-2xl transition-all shadow-2xl shadow-gray-900/20 uppercase tracking-widest text-sm hover:scale-[1.02] transform active:scale-95"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-gray-400 text-sm font-bold">
                            Already part of the family? {' '}
                            <Link to="/login" className="text-orange-500 hover:text-red-600 transition-colors underline underline-offset-4 font-black">Sign in here.</Link>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Visual Side Panel */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1556910111-a83406474136?w=1600&auto=format&fit=crop&q=80" 
                    alt="Kitchen" 
                    className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-gray-950 via-gray-950/40 to-transparent"></div>
                <div className="absolute top-20 right-20 z-10 text-right max-w-md">
                    <BeakerIcon className="h-16 w-16 text-red-500 ml-auto mb-8" />
                    <h2 className="text-6xl font-black font-outfit text-white leading-tight mb-6 tracking-tighter uppercase whitespace-pre-wrap">Beyond <br/>Cooking. <br/><span className="text-red-500">Living.</span></h2>
                    <p className="text-xl text-gray-400 font-medium">Capture the soul of your kitchen and share it with the world.</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
