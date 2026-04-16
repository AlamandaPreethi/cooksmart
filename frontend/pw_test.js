const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Catch console logs
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

    // Sign up
    await page.goto('http://localhost:5173/register');
    await page.waitForLoadState('networkidle');
    await page.fill('input[type="text"]', 'PlaywrightTest');
    await page.fill('input[type="email"]', 'pwtest'+Date.now()+'@test.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Go to recipes index to view RecipeCards
    await page.goto('http://localhost:5173/results');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Click the first heart button we see
    const favoriteButtons = await page.$$('button:has(.h-5.w-5)');
    if (favoriteButtons.length > 0) {
        console.log('Found favorite buttons. Clicking the first one.');
        await favoriteButtons[0].click();
        await page.waitForTimeout(2000);
    } else {
        console.log('No favorite buttons found.');
    }

    // Go to favorites
    await page.goto('http://localhost:5173/favorites');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const favTitle = await page.locator('text=Your Favorites.').count();
    console.log('Favorites page title count:', favTitle);
    
    const recipeCards = await page.$$('.group');
    console.log('Recipe cards on favorites page:', recipeCards.length);

    await browser.close();
})();
