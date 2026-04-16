import React from 'react';

const RecipeSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
            <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                </div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
                <div className="pt-4 flex justify-between">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-1/2"></div>
                    <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-xl w-1/3"></div>
                </div>
            </div>
        </div>
    );
};

export default RecipeSkeleton;
