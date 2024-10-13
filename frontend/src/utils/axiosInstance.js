import axios from 'axios';
import store from '../store';

// Create Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: '/api',
});

// Request interceptor to attach the authorization token
axiosInstance.interceptors.request.use(
    (config) => {
        const {
            userLogin: { userInfo },
        } = store.getState();

        if (userInfo?.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Optional: Response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn('Unauthorized - Logging out the user...');
            // Optionally: Dispatch a logout action or redirect the user
            // store.dispatch(logoutUser());
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
