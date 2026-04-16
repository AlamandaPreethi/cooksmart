import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import KitchenHacks from './pages/KitchenHacks';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Results from './pages/Results';
import Favorites from './pages/Favorites';
import RecipeDetails from './pages/RecipeDetails';
import UploadRecipe from './pages/UploadRecipe';
import QuickRecipes from './pages/QuickRecipes';
import SeasonalDrinks from './pages/SeasonalDrinks';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Router>
          <div className="min-h-screen flex flex-col font-inter bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/hacks" element={<KitchenHacks />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/results" element={<Results />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                <Route path="/upload" element={<UploadRecipe />} />
                <Route path="/quick" element={<QuickRecipes />} />
                <Route path="/drinks" element={<SeasonalDrinks />} />
              </Routes>
            </main>
            
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-8 text-center text-sm text-gray-500 font-inter mt-auto">
              <p>&copy; 2026 CookSmart. All rights reserved.</p>
            </footer>
          </div>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
