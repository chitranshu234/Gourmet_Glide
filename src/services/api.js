import axios from 'axios';

// --- API Service ---
const apiClient = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1/',
});

const api = {
  searchByName: (name) => apiClient.get(`search.php?s=${name}`),
  getById: (id) => apiClient.get(`lookup.php?i=${id}`),
  getRandom: () => apiClient.get('random.php'),
  listCategories: () => apiClient.get('categories.php'),
  filterByCategory: (category) => apiClient.get(`filter.php?c=${category}`),
};

export default api;