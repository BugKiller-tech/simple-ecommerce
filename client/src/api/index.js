import axios from 'axios';

const config = {
  headers: {
      'content-type': 'multipart/form-data'
  }
}

export default {
  createCategory: (data) => axios.post('/api/categories/create', data),
  updateCategory: (data) => axios.post('/api/categories/update', data),
  deleteCategory: (data) => axios.post('/api/categories/delete', data),
  getAllCategory: () => axios.get('/api/categories/all'),


  createProduct: (data) => axios.post('/api/products/create', data, config),
  updateProduct: (data) => axios.post('/api/products/update', data, config),
  deleteProduct: (data) => axios.post('/api/products/delete', data),
  getAllProducts: () => axios.get('/api/products/all'),
}