import { instanceApi } from './instanceApi';
import { api } from './apiConstant';

const ProductApi = {
  getAllProducts: async () => {
    try {
      const response = await instanceApi.get(api.getAllProducts);
      return response.data;
    } catch (error) {
      console.error('Error getting all products:', error);
      throw error;
    }
  },
  createProduct: async (request) => {
    try {
      const response = await instanceApi.post(api.createProducts, request);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },
  deleteProduct: async (id) => {
    try {
      const response = await instanceApi.delete(api.deleteProduct(id));
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
  updateProduct: async ({id, request}) => {
    try {
      const response = await instanceApi.patch(api.updateProduct(id), request);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },
  getProductId: async (id) => {
    try {
      const response = await instanceApi.get(api.getProductId(id));
      return response.data;
    } catch (error) {
      console.error('Error getting product by id:', error);
      throw error;
    }
  },
  getProductByCategory: async (request) => {
    try {
      const response = await instanceApi.post(api.getProductByCategory, request);
      return response.data;
    } catch (error) {
      console.error('Error getting product by category:', error);
      throw error;
    }
  },
}

export default ProductApi;