import { instanceApi } from './instanceApi';
import { api } from './apiConstant';

const CategoryApi = {
  getAllCategories: async () => {
    try {
      const response = await instanceApi.get(api.getAllCategories);
      return response.data;
    } catch (error) {
      console.error('Error getting all categories:', error);
      throw error;
    }
  },
  createCategory: async (request) => {
    try {
      const response = await instanceApi.post(api.createCategories, request);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  deleteCategory: async (id) => {
    try {
      const response = await instanceApi.delete(api.deleteCategory(id));
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
  updateCategory: async ({id, request}) => {
    try {
      console.log(request);
      const response = await instanceApi.patch(api.updateCategory(id), request);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },
  getCategoryId: async (id) => {
    try {
      const response = await instanceApi.get(api.getCategoryId(id));
      return response.data;
    } catch (error) {
      console.error('Error getting user by id:', error);
      throw error;
    }
  }
}

export default CategoryApi;