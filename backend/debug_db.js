const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/Recipe');

dotenv.config();

const checkDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const count = await Recipe.countDocuments();
    const categories = await Recipe.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    
    console.log("TOTAL RECIPES IN DB:", count);
    console.log("CATEGORIES:", JSON.stringify(categories, null, 2));
    
    // Check first 5 of each category
    for (let catObj of categories) {
        const samples = await Recipe.find({ category: catObj._id }).limit(3);
        console.log(`SAMPLES FOR ${catObj._id}:`, JSON.stringify(samples.map(s => s.title), null, 2));
    }
    
    process.exit();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

checkDB();
