const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Recipe = require('./models/Recipe');

dotenv.config({ path: path.join(__dirname, '.env') });

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const drinks = await Recipe.find({ category: 'Drink' });
    console.log(`TOTAL DRINKS: ${drinks.length}`);
    
    const seasonCounts = drinks.reduce((acc, d) => {
      acc[d.season] = (acc[d.season] || 0) + 1;
      return acc;
    }, {});
    
    console.log('SEASON DISTRIBUTION:');
    console.log(JSON.stringify(seasonCounts, null, 2));
    
    console.log('SAMPLES (FIRST 10):');
    drinks.slice(0, 10).forEach(d => {
       console.log(`- ${d.title}: ${d.season}`);
    });

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

check();
