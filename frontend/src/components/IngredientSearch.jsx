import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const IngredientSearch = ({ initialQuery = "" }) => {
    const [ingredients, setIngredients] = useState(initialQuery);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/results?ingredients=${encodeURIComponent(ingredients.trim())}`);
    };

    return (
        <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients (e.g., tomato, onion, chicken)..."
                className="w-full pl-12 pr-32 py-4 rounded-full border border-gray-200 bg-white shadow-xl shadow-orange-900/5 focus:border-orange-500 focus:ring-0 focus:outline-none text-lg transition-all font-inter placeholder-gray-400"
            />
            <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 rounded-full font-semibold font-outfit tracking-wide shadow-md transition-all transform hover:scale-105"
            >
                Search
            </button>
        </form>
    );
};
export default IngredientSearch;
