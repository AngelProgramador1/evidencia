import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});

export const login = (credentials) => {
  return api.post('/login', credentials);
};

export const getProducts = () => {
  return api.get('/products');
};

export const addProduct = (product) => {
  return api.post('/products', product);
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};

export const getProviders = () => {
  return api.get('/providers');
};

export default api;
