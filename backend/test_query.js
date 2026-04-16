const mongoose = require('mongoose');
require('dotenv').config();
const Recipe = require('./models/Recipe');

const testQuery = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("--- TESTING CATEGORY ONLY (Drink) ---");
        const categoryOnly = await Recipe.find({ category: 'Drink' });
        console.log(`FOUND ${categoryOnly.length} drinks`);

        console.log("\n--- TESTING CATEGORY (Drink) AND SEASON (Spring or All) ---");
        const capitalizedSeason = 'Spring';
        const queryWithSeason = { 
            category: 'Drink', 
            season: { $in: [capitalizedSeason, 'All'] } 
        };
        console.log("QUERY:", JSON.stringify(queryWithSeason, null, 2));
        const results = await Recipe.find(queryWithSeason);
        console.log(`FOUND ${results.length} drinks for Spring/All`);
        results.forEach(r => console.log(`- ${r.title} (${r.season})`));

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

testQuery();
