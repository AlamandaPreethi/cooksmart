import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    HeartIcon, 
    LightBulbIcon, 
    BeakerIcon, 
    CommandLineIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

const About = () => {
    const navigate = useNavigate();
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const techStack = [
        { name: "MongoDB", color: "text-green-500", icon: "🍃" },
        { name: "Express.js", color: "text-gray-400", icon: "🚂" },
        { name: "React 19", color: "text-blue-500", icon: "⚛️" },
        { name: "Node.js", color: "text-green-600", icon: "🌳" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 font-inter">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1543353071-873f17a7a088?w=1600&auto=format&fit=crop&q=80" 
                        alt="Background" 
                        className="w-full h-full object-cover opacity-60 dark:opacity-40 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-gray-950/60 to-gray-50 dark:to-gray-950"></div>
                </div>

                <div className="relative z-10 text-center px-4">
                    <motion.span 
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="inline-block py-1.5 px-4 rounded-full bg-orange-500/80 backdrop-blur-md text-white font-bold text-sm mb-6 border border-orange-400/50 uppercase tracking-widest shadow-xl"
                    >
                        Our Mission
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-8xl font-black font-outfit text-white mb-6 drop-shadow-2xl"
                    >
                        Cook <span className="text-orange-500">Smarter.</span><br/>Waste <span className="text-red-500">Less.</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 max-w-3xl mx-auto font-medium drop-shadow-md"
                    >
                        We created CookSmart to help you turn the food in your kitchen into a great dinner every single night.
                    </motion.p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-20 -mt-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Vision Card */}
                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="glass dark:bg-gray-900/40 p-10 rounded-3xl col-span-1 md:col-span-2 shadow-2xl transition-all border border-white/20 dark:border-white/5"
                    >
                        <HeartIcon className="h-12 w-12 text-red-500 mb-6" />
                        <h2 className="text-4xl font-black font-outfit mb-4 dark:text-white">Why CookSmart?</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-inter">
                            Every year, tons of perfectly good food are thrown away because we don't know how to use what's in our pantry. CookSmart helps you waste less food and decide what to cook faster by suggesting recipes based on the ingredients you already have at home.
                        </p>
                    </motion.div>

                    {/* Features Quick List */}
                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-gradient-to-br from-orange-500 to-red-600 p-10 rounded-3xl shadow-xl text-white border border-white/10"
                    >
                        <LightBulbIcon className="h-12 w-12 mb-6 text-white" />
                        <h3 className="text-3xl font-black font-outfit mb-6">Core Features</h3>
                        <ul className="space-y-4 font-bold font-inter text-lg">
                            <li className="flex items-center gap-3"><ArrowRightIcon className="h-5 w-5" /> 100+ Tasty Recipes</li>
                            <li className="flex items-center gap-3"><ArrowRightIcon className="h-5 w-5" /> Ingredient Filtering</li>
                            <li className="flex items-center gap-3"><ArrowRightIcon className="h-5 w-5" /> Saved Favorites</li>
                            <li className="flex items-center gap-3"><ArrowRightIcon className="h-5 w-5" /> Smart Kitchen Hacks</li>
                        </ul>
                    </motion.div>
                </div>

                {/* Tech Stack Section */}
                <div className="mt-32 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="mb-12"
                    >
                        <h2 className="text-4xl font-black font-outfit mb-4 dark:text-white">Built with Modern Tech</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Powering zero-waste cooking with high-performance engineering.</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-10">
                        {techStack.map((tech, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className="glass dark:bg-gray-900/60 p-8 rounded-2xl flex flex-col items-center gap-4 border border-white/10 dark:border-white/5"
                            >
                                <span className="text-5xl">{tech.icon}</span>
                                <span className={`font-black uppercase tracking-widest text-sm ${tech.color}`}>{tech.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Developer Footer Section */}
                <div className="mt-40 bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[120px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                    <BeakerIcon className="h-16 w-16 mx-auto mb-8 text-orange-500" />
                    <h2 className="text-4xl md:text-6xl font-black font-outfit mb-8">Ready to start your culinary journey?</h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Join thousands of home chefs who are making the most of every ingredient.</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <button onClick={() => navigate('/register')} className="bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-xl shadow-orange-500/20 text-lg uppercase tracking-wider">Get Started</button>
                        <button onClick={() => navigate('/quick')} className="bg-white/10 hover:bg-white/20 text-white font-black px-10 py-4 rounded-2xl transition-all backdrop-blur-md border border-white/10 text-lg uppercase tracking-wider">Try Demo</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
