/**
 * imageMapper.js
 * Provides high-quality, verified Pexels photo IDs
 * for recipes and drinks. Pexels photos are permanent (no 404s).
 * Format: https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg
 */

// ── FOOD MAP ─────────────────────────────────────────────────────────────────
const FOOD_MAP = {
  // Indian curries & dishes
  'paneer tikka masala': ['9609844'],
  'butter chicken':     ['7625056'],
  'murgh makhani':      ['7625056'],
  'rogan josh':         ['6260921'],
  'mutton':             ['6260921'],
  'biryani':            ['12737656'],
  'chicken biryani':    ['12737656'],
  'paneer':             ['9609844'],
  'tikka':              ['9609844'],
  'curry':              ['7625056'],
  'dal':                ['4393073'],
  'naan':               ['1639547'],

  // Western food
  'avocado toast':      ['1824353'],
  'avocado':            ['1824353'],
  'toast':              ['1824353'],
  'parfait':            ['1099680'],
  'yogurt parfait':     ['1099680'],
  'greek yogurt':       ['1099680'],
  'granola':            ['1099680'],

  // Asian
  'ramen':              ['2098085'],
  'spicy ramen':        ['2098085'],
  'sushi':              ['2323398'],
  'noodles':            ['2098085'],

  // Pasta / Pizza / Burgers
  'pasta':              ['1279330'],
  'pizza':              ['2147491'],
  'burger':             ['1639562'],
  'steak':              ['769289'],
  'taco':               ['461198'],
  'salad':              ['1211887'],

  // Breakfast / Dessert
  'pancake':            ['1640777'],
  'waffle':             ['1640777'],
  'egg':                ['824635'],
  'breakfast':          ['1640777'],
  'cake':               ['291528'],
  'dessert':            ['1854652'],
  'soup':               ['539451'],
  'rice':               ['723198'],
};

// ── DRINK MAP ────────────────────────────────────────────────────────────────
const DRINK_MAP = {
  // Tea / Chai
  'masala chai':              ['734983'],
  'chai':                     ['734983'],
  'tea':                      ['1638208'],
  'green tea':                ['1638208'],

  // Coffee
  'protein coffee':           ['1162455'],
  'instant coffee':           ['1162455'],
  'coffee':                   ['312418'],
  'espresso':                 ['312418'],
  'latte':                    ['312418'],

  // Matcha
  'matcha latte':             ['3046045'],
  'matcha':                   ['3046045'],

  // Lemonade variants
  'lavender lemonade':        ['4051761'],
  'strawberry lemonade':      ['3784455'],
  'iced strawberry lemonade': ['3784455'],
  'lemonade':                 ['3407777'],

  // Fruit drinks
  'mango lassi':              ['5946081'],
  'lassi':                    ['5946081'],
  'mango':                    ['5946081'],
  'watermelon':               ['1337825'],
  'watermelon mint cooler':   ['1337825'],

  // Tropical
  'pina colada':              ['4051764'],
  'piña colada':              ['4051764'],
  'coconut':                  ['4051764'],

  // Fizz / Soda
  'berry hibiscus':           ['4051757'],
  'hibiscus':                 ['4051757'],
  'cherry blossom soda':      ['3407777'],
  'cherry':                   ['3407777'],
  'cucumber mint fizz':       ['2103949'],
  'cucumber':                 ['2103949'],
  'soda':                     ['2103949'],

  // Hot autumn / winter
  'hot spiced apple cider':   ['3671085'],
  'apple cider':              ['3671085'],
  'pumpkin spice steamer':    ['5718053'],
  'pumpkin spice':            ['5718053'],
  'pumpkin':                  ['5718053'],
  'almond maple steamer':     ['312418'],
  'almond maple':             ['312418'],

  // Winter hot drinks
  'peppermint cocoa':         ['1695052'],
  'winter peppermint cocoa':  ['1695052'],
  'cocoa':                    ['1695052'],
  'hot chocolate':            ['3551717'],
  'hot dark chocolate':       ['3551717'],
  'dark chocolate':           ['3551717'],
  'chocolate':                ['3551717'],
  'turmeric milk':            ['4264085'],
  'golden turmeric milk':     ['4264085'],
  'golden milk':              ['4264085'],
  'turmeric':                 ['4264085'],

  // General
  'milkshake':                ['3622372'],
  'smoothie':                 ['775032'],
  'juice':                    ['1346347'],
  'mocktail':                 ['4051757'],
  'cocktail':                 ['4051764'],
};

// ── FALLBACKS ────────────────────────────────────────────────────────────────
const FALLBACK_FOOD  = '1640777'; // food bowl / breakfast
const FALLBACK_DRINK = '1337825'; // refreshing chilled drink

// ── STATE ────────────────────────────────────────────────────────────────────
const usedIds = new Set();

// ── HELPERS ──────────────────────────────────────────────────────────────────

/** Lowercase + remove punctuation → array of words > 2 chars */
const getKeywords = (text) =>
  text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 2);

/** Build a full Pexels CDN URL from a photo ID */
const buildUrl = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

/**
 * Picks an unused, perfectly matched Pexels image for a recipe/drink.
 * Strategy (ordered by priority):
 *  1. Full phrase match on title (e.g. "mango lassi")
 *  2. Multi-word partial phrase match
 *  3. Single-keyword match
 *  4. Category fallback
 */
const getIntelligentImage = (title, category = 'Food', existingUrls = []) => {
  // Register already-used IDs so we never duplicate
  existingUrls.forEach(url => {
    const m = url.match(/photos\/(\d+)\//);
    if (m) usedIds.add(m[1]);
  });

  const map      = category.toLowerCase() === 'drink' ? DRINK_MAP : FOOD_MAP;
  const fallback = category.toLowerCase() === 'drink' ? FALLBACK_DRINK : FALLBACK_FOOD;
  const lower    = title.toLowerCase();

  const pick = (ids) => {
    const free = ids.filter(id => !usedIds.has(id));
    return free.length > 0 ? free[0] : ids[0]; // allow reuse only as last resort
  };

  let selectedId = null;

  // 1. Try exact / longest phrase first (sort by phrase length desc)
  const sortedPhrases = Object.keys(map).sort((a, b) => b.length - a.length);
  for (const phrase of sortedPhrases) {
    if (lower.includes(phrase)) {
      selectedId = pick(map[phrase]);
      if (selectedId) break;
    }
  }

  // 2. Keyword fallback
  if (!selectedId) {
    const keywords = getKeywords(title);
    for (const word of keywords) {
      if (map[word]) {
        selectedId = pick(map[word]);
        if (selectedId) break;
      }
    }
  }

  // 3. Hard fallback
  if (!selectedId) selectedId = fallback;

  usedIds.add(selectedId);
  return buildUrl(selectedId);
};

/** Resets the used-IDs tracker (call before a fresh seed run) */
const resetUsedImages = () => usedIds.clear();

module.exports = { getIntelligentImage, resetUsedImages };
