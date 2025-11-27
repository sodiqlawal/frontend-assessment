import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    'https://quirky-frame-production.up.railway.app', // Base URL for the API
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
