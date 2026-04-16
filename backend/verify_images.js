const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/Recipe');

dotenv.config();

const verifyData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const recipes = await Recipe.find({});
        console.log(`Total Recipes: ${recipes.length}`);
        
        const urls = recipes.map(r => r.imageUrl);
        const uniqueUrls = new Set(urls);
        
        console.log(`Unique URLs: ${uniqueUrls.size}`);
        
        recipes.forEach(r => {
            console.log(`- [${r.category}] ${r.title}: ${r.imageUrl}`);
        });

        if (uniqueUrls.size === recipes.length) {
            console.log("SUCCESS: All recipes have unique images.");
        } else {
            console.log("WARNING: Duplicate images found.");
        }
        
        const genericId = '1546069901-ba9599a7e63c';
        const hasGeneric = urls.some(url => url.includes(genericId));
        if (hasGeneric) {
            console.log("WARNING: Some recipes still use the generic salad bowl image.");
        } else {
            console.log("SUCCESS: No recipes use the generic salad bowl image.");
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verifyData();
