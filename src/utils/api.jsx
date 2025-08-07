import axios from 'axios';

const api = axios.create({
  baseURL: ' https://souled-db-3.onrender.com'
});

export default api;

// http://localhost:3000