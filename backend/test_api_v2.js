const http = require('http');

const test = () => {
  http.get('http://localhost:5000/api/recipes', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        const recipes = JSON.parse(data);
        console.log("API STATUS:", res.statusCode);
        console.log("RECIPES COUNT:", recipes.length);
        console.log("CATEGORIES FOUND:", [...new Set(recipes.map(r => r.category))]);
        console.log("TITLES (FIRST 10):", recipes.slice(0, 10).map(r => r.title));
      } catch (e) {
        console.log("Error parsing JSON:", e.message);
        console.log("RAW DATA:", data.slice(0, 200));
      }
    });
  }).on('error', (err) => {
    console.log("Request Error:", err.message);
  });
};

test();
