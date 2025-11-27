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

api.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response?.data?.error) {
      err.message = err.response.data.error;
    }
    return Promise.reject(err);
  }
);

export default api;
