import axios from 'axios';

// Create a public axios instance (for login, register, etc.)
export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Create a private axios instance (for authenticated requests)
export const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add a request interceptor to the private instance to attach the token
privateApi.interceptors.request.use(
  (config) => {
    // You can modify this to get the token from your preferred storage (e.g., localStorage, cookies)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors (unauthorized)
privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Handle unauthorized access (e.g., redirect to login, clear token)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        // Only redirect if we are not already on a public auth page to avoid loops or bad UX
        if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
           window.location.href = '/login'; 
        }
      }
    }
    return Promise.reject(error);
  }
);
