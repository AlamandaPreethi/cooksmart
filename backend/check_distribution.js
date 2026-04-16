const http = require('http');

const test = () => {
  http.get('http://localhost:5000/api/recipes', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        const recipes = JSON.parse(data);
        const counts = recipes.reduce((acc, r) => {
          acc[r.category] = (acc[r.category] || 0) + 1;
          return acc;
        }, {});
        console.log("TOTAL:", recipes.length);
        console.log("DISTRIBUTION:", JSON.stringify(counts, null, 2));
        console.log("DISH TITLES (FIRST 50):", recipes.filter(r => r.category === 'Food').slice(0, 50).map(r => r.title));
      } catch (e) { console.log(e.message); }
    });
  });
};

test();
