const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/Recipe');

dotenv.config();

// ============================================================
//  HAND-CURATED IMAGE URLS - Using Pexels CDN (stable & free)
//  Format: https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg
//  All IDs manually picked to match the exact dish/drink.
//  NO Unsplash URLs - Pexels photos are permanent, never deleted.
// ============================================================
const recipes = [

  // ─── INDIAN FOOD ───────────────────────────────────────────

  {
    title: "Paneer Tikka Masala",
    ingredients: ["Paneer", "Yogurt", "Ginger-Garlic Paste", "Garam Masala", "Tomato Puree", "Cream", "Bell Peppers"],
    instructions: ["Marinate paneer with yogurt and spices.", "Grill until golden.", "Simmer bell peppers and tomato puree with cream.", "Add paneer and serve."],
    cuisine: "Indian",
    prepTime: 20, cookTime: 25, servings: 4, calories: 450,
    category: "Food", season: "All",
    // Paneer tikka masala - creamy orange Indian curry
    imageUrl: "https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Butter Chicken",
    ingredients: ["Chicken", "Butter", "Tomato Sauce", "Cream", "Ginger-Garlic Paste", "Kasuri Methi"],
    instructions: ["Marinate and cook chicken.", "Prepare a creamy tomato base with butter.", "Mix chicken into the sauce.", "Top with cream and fenugreek."],
    cuisine: "Indian",
    prepTime: 30, cookTime: 30, servings: 4, calories: 550,
    category: "Food", season: "All",
    // Butter chicken / murgh makhani - rich tomato cream curry
    imageUrl: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Mutton Rogan Josh",
    ingredients: ["Mutton", "Kashmiri Red Chili", "Fennel Seeds", "Ginger Powder", "Yogurt", "Onion Paste"],
    instructions: ["Sauté meat with spices.", "Add yogurt and onion paste.", "Slow cook until tender and red."],
    cuisine: "Indian",
    prepTime: 15, cookTime: 90, servings: 6, calories: 600,
    category: "Food", season: "Winter",
    // Mutton rogan josh - deep red spiced lamb curry
    imageUrl: "https://images.pexels.com/photos/6260921/pexels-photo-6260921.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Chicken Biryani",
    ingredients: ["Basmati Rice", "Chicken", "Saffron", "Fried Onions", "Mint", "Yogurt"],
    instructions: ["Marinate chicken.", "Layer with half-cooked rice.", "Dum cook for 20 minutes."],
    cuisine: "Indian",
    prepTime: 40, cookTime: 40, servings: 4, calories: 700,
    category: "Food", season: "All",
    // Chicken biryani with saffron basmati rice
    imageUrl: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=800"
  },

  // ─── SPRING DRINKS ─────────────────────────────────────────

  {
    title: "Spring Matcha Latte",
    ingredients: ["Matcha powder", "Hot water", "Milk", "Honey"],
    instructions: ["Whisk matcha with water.", "Add frothed milk and honey."],
    cuisine: "Asian",
    prepTime: 5, cookTime: 0, servings: 1, calories: 120,
    category: "Drink", season: "Spring",
    // Matcha green tea latte with froth
    imageUrl: "https://images.pexels.com/photos/3046045/pexels-photo-3046045.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Lavender Lemonade",
    ingredients: ["Lemons", "Dried Lavender", "Sugar", "Water", "Ice"],
    instructions: ["Make lavender simple syrup.", "Mix with lemon juice and water.", "Serve over ice."],
    cuisine: "Western",
    prepTime: 10, cookTime: 5, servings: 4, calories: 150,
    category: "Drink", season: "Spring",
    // Lavender lemonade - purple/violet lemon drink
    imageUrl: "https://images.pexels.com/photos/4051761/pexels-photo-4051761.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Berry Hibiscus Refresher",
    ingredients: ["Hibiscus tea", "Strawberries", "Lemon", "Sparkling water"],
    instructions: ["Brew and chill hibiscus tea.", "Muddle strawberries.", "Combine with sparkling water."],
    cuisine: "Western",
    prepTime: 5, cookTime: 0, servings: 1, calories: 80,
    category: "Drink", season: "Spring",
    // Hibiscus berry red iced drink
    imageUrl: "https://images.pexels.com/photos/4051757/pexels-photo-4051757.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Cherry Blossom Soda",
    ingredients: ["Cherry syrup", "Club soda", "Maraschino cherries"],
    instructions: ["Combine syrup and soda.", "Garnish with cherries."],
    cuisine: "Japanese",
    prepTime: 2, cookTime: 0, servings: 1, calories: 140,
    category: "Drink", season: "Spring",
    // Pink cherry soda drink with cherries
    imageUrl: "https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=800"
  },

  // ─── SUMMER DRINKS ─────────────────────────────────────────

  {
    title: "Mango Lassi",
    ingredients: ["Mango Pulp", "Yogurt", "Sugar", "Cardamom"],
    instructions: ["Blend all ingredients.", "Serve chilled."],
    cuisine: "Indian",
    prepTime: 5, cookTime: 0, servings: 2, calories: 200,
    category: "Drink", season: "Summer",
    // Mango lassi - thick golden drink in a tall glass
    imageUrl: "https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Watermelon Mint Cooler",
    ingredients: ["Watermelon", "Mint leaves", "Lime juice", "Salt"],
    instructions: ["Blend watermelon and mint.", "Strain and add lime juice."],
    cuisine: "Universal",
    prepTime: 10, cookTime: 0, servings: 3, calories: 90,
    category: "Drink", season: "Summer",
    // Watermelon juice/drink - bright red refreshing glass
    imageUrl: "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Piña Colada Sparkler",
    ingredients: ["Pineapple juice", "Coconut milk", "Sparkling water"],
    instructions: ["Mix juice and coconut milk.", "Top with sparkling water."],
    cuisine: "Tropical",
    prepTime: 5, cookTime: 0, servings: 1, calories: 180,
    category: "Drink", season: "Summer",
    // Piña colada tropical coconut pineapple drink
    imageUrl: "https://images.pexels.com/photos/4051764/pexels-photo-4051764.jpeg?auto=compress&cs=tinysrgb&w=800"
  },

  {
    title: "Cucumber Mint Fizz",
    ingredients: ["Cucumber", "Mint", "Lime", "Soda water"],
    instructions: ["Muddle cucumber and mint.", "Add lime and soda."],
    cuisine: "Modern",
    prepTime: 5, cookTime: 0, servings: 1, calories: 40,
    category: "Drink", season: "Summer",
    // Cucumber mint fizz - green clear refreshing drink
    imageUrl: "https://images.pexels.com/photos/2103949/pexels-photo-2103949.jpeg?auto=compress&cs=tinysrgb&w=800"
  },

  // ─── AUTUMN DRINKS ─────────────────────────────────────────


  {
    title: "Almond Maple Steamer",
    ingredients: ["Almond milk", "Maple syrup", "Cinnamon"],
    instructions: ["Heat and froth milk.", "Stir in syrup and spice."],
    cuisine: "Modern",
    prepTime: 2, cookTime: 3, servings: 1, calories: 160,
    category: "Drink", season: "Autumn",
    // Almond milk latte steamer - warm frothy cup with cinnamon
    imageUrl: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800"
  },

  // ─── WINTER DRINKS ─────────────────────────────────────────

  {
    title: "Winter Peppermint Cocoa",
    ingredients: ["Milk", "Cocoa Powder", "Peppermint Extract", "Sugar"],
    instructions: ["Heat milk and whisk in cocoa and sugar.", "Add peppermint extract."],
    cuisine: "Holiday",
    prepTime: 5, cookTime: 5, servings: 1, calories: 280,
    category: "Drink", season: "Winter",
    // Hot cocoa / peppermint hot chocolate with marshmallows
    imageUrl: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Golden Turmeric Milk",
    ingredients: ["Milk", "Turmeric", "Ginger", "Black Pepper", "Honey"],
    instructions: ["Simmer milk with spices for 5 minutes.", "Strain and add honey."],
    cuisine: "Ayurvedic",
    prepTime: 2, cookTime: 5, servings: 1, calories: 180,
    category: "Drink", season: "Winter",
    // Golden milk / turmeric latte - yellow warm drink
    imageUrl: "https://images.pexels.com/photos/4264085/pexels-photo-4264085.jpeg?auto=compress&cs=tinysrgb&w=800"
  },


  // ─── ALL-SEASON DRINKS ─────────────────────────────────────

  {
    title: "Masala Chai",
    ingredients: ["Black Tea", "Milk", "Ginger", "Cardamom"],
    instructions: ["Boil water with spices.", "Add tea and milk.", "Simmer and strain."],
    cuisine: "Indian",
    prepTime: 2, cookTime: 6, servings: 2, calories: 110,
    category: "Drink", season: "All",
    // Masala chai / Indian spiced tea in a glass or kulhad
    imageUrl: "https://images.pexels.com/photos/734983/pexels-photo-734983.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Instant Protein Coffee",
    ingredients: ["Instant Coffee", "Protein Powder", "Water/Milk"],
    instructions: ["Mix coffee with water.", "Shake with protein powder."],
    cuisine: "Fitness",
    prepTime: 2, cookTime: 0, servings: 1, calories: 150,
    category: "Drink", season: "All",
    // Coffee shake / black iced coffee / protein coffee
    imageUrl: "https://images.pexels.com/photos/1162455/pexels-photo-1162455.jpeg?auto=compress&cs=tinysrgb&w=800"
  },

  // ─── ADDITIONAL FOOD ───────────────────────────────────────

  {
    title: "Classic Avocado Toast",
    ingredients: ["Bread", "Avocado", "Chili Flakes"],
    instructions: ["Toast bread.", "Mash avocado with salt.", "Top with flakes."],
    cuisine: "Western",
    prepTime: 5, cookTime: 2, servings: 1, calories: 230,
    category: "Food", season: "All",
    // Avocado toast on sourdough with chili flakes and seeds
    imageUrl: "https://images.pexels.com/photos/1824353/pexels-photo-1824353.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Greek Yogurt Parfait",
    ingredients: ["Greek Yogurt", "Berries", "Granola"],
    instructions: ["Layer yogurt, berries, and granola."],
    cuisine: "Healthy",
    prepTime: 5, cookTime: 0, servings: 1, calories: 250,
    category: "Food", season: "All",
    // Greek yogurt parfait with berries and granola in a glass
    imageUrl: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Spicy Ramen",
    ingredients: ["Ramen Noodles", "Egg", "Chili Oil", "Bok Choy"],
    instructions: ["Boil noodles.", "Add bok choy and chili oil.", "Top with soft-boiled egg."],
    cuisine: "Asian",
    prepTime: 5, cookTime: 10, servings: 1, calories: 480,
    category: "Food", season: "Winter",
    // Spicy ramen bowl with soft-boiled egg and green onions
    imageUrl: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');
    await Recipe.deleteMany({});
    console.log('Cleared existing recipes.');

    await Recipe.insertMany(recipes);
    console.log(`\n✅ Database seeded successfully with ${recipes.length} items!`);
    recipes.forEach((r, i) => {
      console.log(`  ${i + 1}. [${r.category}] ${r.title}`);
    });
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedDB();
