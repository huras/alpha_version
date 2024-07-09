import axios from 'axios';

// Create the base URL with the subdomain
const baseURL = `http://localhost:8080`;

// Create the Axios instance with the custom baseURL
const api = axios.create({
  baseURL: baseURL,
});

export default api;
