import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LightBulbIcon, XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const tips = [
    "Keep your ginger in the freezer; it's much easier to grate when frozen!",
    "Add a pinch of salt to your coffee to reduce bitterness.",
    "Store onions and potatoes separately to prevent them from rotting faster.",
    "Revive wilted herbs by placing them in a glass of ice water.",
    "Use an empty water bottle to suck up egg yolks and separate them from whites."
];

const QuickTips = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTip, setCurrentTip] = useState(0);

    const nextTip = () => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] font-inter">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 50 }}
                        className="glass dark:bg-gray-900/90 p-6 rounded-[2rem] shadow-2xl mb-4 w-72 md:w-80 border border-white/20 relative"
                    >
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-2 mb-4">
                            <LightBulbIcon className="h-5 w-5 text-orange-500" />
                            <span className="font-black uppercase tracking-widest text-[10px] text-gray-400">Pro Tip</span>
                        </div>

                        <p className="text-gray-700 dark:text-gray-200 font-bold leading-relaxed mb-6">
                            "{tips[currentTip]}"
                        </p>

                        <button 
                            onClick={nextTip}
                            className="flex items-center gap-1 text-orange-500 font-black uppercase tracking-widest text-[10px] hover:gap-2 transition-all"
                        >
                            Next Tip <ChevronRightIcon className="h-3 w-3" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-4 rounded-3xl shadow-xl shadow-orange-500/40 relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <LightBulbIcon className="h-8 w-8 text-white drop-shadow-md" />
            </motion.button>
        </div>
    );
};

export default QuickTips;
