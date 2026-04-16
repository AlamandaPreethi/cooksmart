import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from './AuthContext';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [loadingFavs, setLoadingFavs] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) {
                setFavorites([]);
                setLoadingFavs(false);
                return;
            }
            try {
                setLoadingFavs(true);
                const res = await axios.get('favorites');
                setFavorites(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Error fetching favorites in context", err);
                setFavorites([]);
            } finally {
                setLoadingFavs(false);
            }
        };

        fetchFavorites();
    }, [user]);

    const isFavorite = (recipeId) => {
        return favorites.some(fav => fav.recipeId && (fav.recipeId._id === recipeId || fav.recipeId === recipeId));
    };

    const toggleFavorite = async (recipe) => {
        if (!user) return false;
        const recipeId = recipe._id || recipe.id;
        const alreadyFav = isFavorite(recipeId);

        try {
            if (alreadyFav) {
                // Optimistic UI update
                setFavorites(prev => prev.filter(fav => fav.recipeId && (fav.recipeId._id !== recipeId && fav.recipeId !== recipeId)));
                await axios.delete(`favorites/${recipeId}`);
                return false; // Resulting state is not favorite
            } else {
                // Determine structure to push to optimistic UI
                const newFav = { _id: Date.now().toString(), recipeId: recipe };
                setFavorites(prev => [...prev, newFav]);
                const res = await axios.post('favorites', { recipeId });
                // Replace optimistic with real
                setFavorites(prev => prev.map(f => f._id === newFav._id ? res.data : f));
                // Fetch to ensure population
                const updated = await axios.get('favorites');
                if (Array.isArray(updated.data)) setFavorites(updated.data);
                
                return true; // Resulting state is favorite
            }
        } catch (error) {
            console.error('Failed to toggle favorite', error);
            // Revert on fail
            const res = await axios.get('favorites');
            if (Array.isArray(res.data)) setFavorites(res.data);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, loadingFavs, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
