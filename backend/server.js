require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Enable dynamic CORS for Render to support credentials
app.use(cors({
    origin: function(origin, callback) {
        // Reflect the request origin. If no origin (e.g. server-to-server), allow it.
        callback(null, origin || true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/recipes', require('./routes/recipeRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));

// --- DEPLOYMENT: Serve frontend from the backend server ---
// This serves the static files built by Vite
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Fallback routing: send all unspecified routes to index.html
// Express 5.x strictly prohibits app.get('*') so we use a wildcard middleware instead
app.use((req, res, next) => {
    // Only send the HTML fallback if they are requesting a typical GET
    if (req.method === 'GET' && !req.path.startsWith('/api/')) {
        res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
    } else {
        next();
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
