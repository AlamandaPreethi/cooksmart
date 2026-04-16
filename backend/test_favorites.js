const fs = require('fs');

(async () => {
    try {
        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'testuser4', email: 'test25@test.com', password: 'password123' })
        });
        const resData = await res.json();
        const token = resData.token;
        
        // Fetch recipes to favorite one
        const recipesRes = await fetch('http://localhost:5000/api/recipes');
        const recipes = await recipesRes.json();
        const recipeId = recipes[0]._id;

        // Add favorite
        const addRes = await fetch('http://localhost:5000/api/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
            body: JSON.stringify({ recipeId })
        });
        await addRes.json();

        // Get favorites
        const getRes = await fetch('http://localhost:5000/api/favorites', {
            headers: { Authorization: 'Bearer ' + token }
        });
        const getFavorites = await getRes.json();
        fs.writeFileSync('favorite_test_output.json', JSON.stringify(getFavorites, null, 2));

    } catch(err) {
        console.error(err);
    }
})();
