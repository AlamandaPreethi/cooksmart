import axios from 'axios';

// In a strict Render deployment (Separate Frontend/Backend), set VITE_API_URL
// to your backend URL (e.g. https://your-backend.onrender.com/api)
// If you are deploying them together (Frontend served by Backend Node.js process),
// the fallback '/api/' will work natively in production without setting the env var.
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/'
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
