const axios = require('axios');

const testAPI = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/recipes');
    console.log("API STATUS:", res.status);
    console.log("API DATA LENGTH:", res.data.length);
    
    // Count categories in API response
    const counts = res.data.reduce((acc, recipe) => {
      acc[recipe.category] = (acc[recipe.category] || 0) + 1;
      return acc;
    }, {});
    
    console.log("CATEGORY COUNTS IN API:", JSON.stringify(counts, null, 2));
    
    // Sample first 5
    console.log("SAMPLES (FIRST 5):", JSON.stringify(res.data.slice(0, 5).map(r => ({ title: r.title, cat: r.category })), null, 2));

  } catch (err) {
    console.error("API Error:", err.message);
    if (err.response) console.log("DATA:", err.response.data);
  }
};

testAPI();
