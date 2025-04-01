import {instanceApi} from "./instanceApi";

const CategoryApi = {
  getAllCategory: async () => {
    const response = await instanceApi.get(`/categories`);
    return response;
  },
  getCategoryProduct: async () => {
    const response = await instanceApi.get(`/custom/getCategory`);
    return response;
  }
}
export default CategoryApi;
