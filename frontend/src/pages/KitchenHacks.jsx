import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ScissorsIcon, 
    InboxArrowDownIcon, 
    FireIcon, 
    SparklesIcon, 
    ClockIcon,
    XMarkIcon,
    BeakerIcon
} from '@heroicons/react/24/outline';

const KitchenHacks = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const categories = [
        { 
            id: 'cutting', 
            name: 'Cutting', 
            icon: <ScissorsIcon className="h-8 w-8" />, 
            color: 'bg-red-500',
            hacks: [
                "Use a damp paper towel under your cutting board to prevent slipping.",
                "Cut cherry tomatoes between two plastic lids for a perfect slice.",
                "Chill onions before cutting to reduce eye irritation."
            ]
        },
        { 
            id: 'storage', 
            name: 'Storage', 
            icon: <InboxArrowDownIcon className="h-8 w-8" />, 
            color: 'bg-blue-500',
            hacks: [
                "Store potatoes with an apple to prevent sprouting.",
                "Wrap banana stems in plastic wrap to slow ripening.",
                "Keep celery wrapped in foil to keep it crisp for weeks."
            ]
        },
        { 
            id: 'cooking', 
            name: 'Cooking', 
            icon: <FireIcon className="h-8 w-8" />, 
            color: 'bg-orange-500',
            hacks: [
                "Freeze leftover herbs in olive oil using ice cube trays.",
                "Use a wooden spoon over a pot to prevent boiling over.",
                "Let meat rest for 10 minutes after cooking for maximum juiciness."
            ]
        },
        { 
            id: 'cleaning', 
            name: 'Cleaning', 
            icon: <SparklesIcon className="h-8 w-8" />, 
            color: 'bg-purple-500',
            hacks: [
                "Clean your microwave by steaming a bowl of lemon water.",
                "Use salt and half a lemon to scrub cast iron pans.",
                "Coffee grounds are great for deodorizing your fridge."
            ]
        },
        { 
            id: 'time', 
            name: 'Time-Saving', 
            icon: <ClockIcon className="h-8 w-8" />, 
            color: 'bg-green-500',
            hacks: [
                "Peel garlic quickly by shaking it in two metal bowls.",
                "Grate butter for easier mixing when baking.",
                "Measure sticky ingredients (honey/syrup) using a greased spoon."
            ]
        }
    ];

    const rotateVariants = {
        animate: {
            rotate: 360,
            transition: { duration: 50, repeat: Infinity, ease: "linear" }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4 font-inter relative overflow-hidden transition-colors duration-300">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400 rounded-full blur-[150px] animate-blob"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-[150px] animate-blob animation-delay-4000"></div>
            </div>

            <div className="z-10 text-center mb-16 max-w-2xl px-4">
                <h1 className="text-4xl md:text-6xl font-black font-outfit mb-4 dark:text-white uppercase tracking-tight">
                    Smart Kitchen <span className="text-orange-500">Hacks</span>
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 font-medium font-inter">
                    Learn simple professional tips to save time and reduce waste in your kitchen.
                </p>
            </div>

            {/* Circular UI Container */}
            <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center mt-10 md:mt-0">
                {/* Rotating Ring */}
                <motion.div 
                    variants={rotateVariants}
                    animate={selectedCategory ? "" : "animate"}
                    className="absolute inset-0 border-[2px] border-dashed border-gray-300 dark:border-gray-800 rounded-full"
                ></motion.div>

                {/* Center Core */}
                <div className="w-24 h-24 md:w-48 md:h-48 bg-white dark:bg-gray-900 rounded-full shadow-2xl flex flex-col items-center justify-center z-20 border-[4px] border-orange-500/20">
                    <BeakerIcon className="h-8 w-8 md:h-12 md:w-12 text-orange-500 mb-2" />
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400">CookSmart</span>
                </div>

                {/* Circular Categories */}
                {categories.map((cat, index) => {
                    const angle = (index * 360) / categories.length;
                    const radius = windowWidth < 768 ? 130 : 250;
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);

                    return (
                        <motion.button
                            key={cat.id}
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={{ x, y, opacity: 1 }}
                            whileHover={{ scale: 1.2, zIndex: 30 }}
                            onClick={() => setSelectedCategory(cat)}
                            className={`absolute w-16 h-16 md:w-28 md:h-28 rounded-full ${cat.color} text-white shadow-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-shadow hover:shadow-2xl border-4 border-white dark:border-gray-900 overflow-hidden`}
                            aria-label={`Show ${cat.name} hacks`}
                        >
                            <span className="scale-75 md:scale-110">{cat.icon}</span>
                            <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">{cat.name}</span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Detail Modal/Panel Overlay */}
            <AnimatePresence>
                {selectedCategory && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-md p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.8, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.8, y: 50, opacity: 0 }}
                            className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative border border-white/20"
                        >
                            <button 
                                onClick={() => setSelectedCategory(null)}
                                className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>

                            <div className={`w-16 h-16 ${selectedCategory.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg`}>
                                {selectedCategory.icon}
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black font-outfit mb-6 dark:text-white uppercase">
                                {selectedCategory.name} <span className="text-gray-300 dark:text-gray-700">Hacks</span>
                            </h2>

                            <div className="space-y-6">
                                {selectedCategory.hacks.map((hack, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-4 items-center bg-gray-50 dark:bg-gray-800/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-sm shrink-0">
                                            {i + 1}
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 font-bold leading-relaxed font-inter">
                                            {hack}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            <button 
                                onClick={() => setSelectedCategory(null)}
                                className="mt-12 w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform active:scale-95 shadow-xl"
                            >
                                Got it, Chef!
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <p className="mt-20 text-gray-400 font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                <SparklesIcon className="h-3 w-3" /> Click a category to see the tips
            </p>
        </div>
    );
};

export default KitchenHacks;
