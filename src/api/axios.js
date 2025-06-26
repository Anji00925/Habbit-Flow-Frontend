import axios from 'axios';

const API = axios.create({
  baseURL: 'https://habbit-flow-backend-1.onrender.com//api', // Change to your backend URL
});

// Attach token to every request (update as needed)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // You should store token after login
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
