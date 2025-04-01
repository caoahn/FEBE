import {instanceApi} from "./instanceApi";

const ProductApi = {
  getAllAsync: async () => {
    const response = await instanceApi.get(`/products`);
    return response;
  },
  getInfoProduct: async (id) => {
    const response = await instanceApi.get(`/products/${id}`);
    return response;
  },
  reviewProduct: async (id, data) => {
    const response = await instanceApi.post(`/products/${id}/review`, data);
    return response;
  },
  getProductAync: async (id) => {
    const response = await instanceApi.get(`/custom/product`);
    return response;
  },
  getServiceAsync: async (id) => {
    const response = await instanceApi.get(`/custom/service`);
    return response;
  },
  getPorductByCategoryId: async (request) => {
    const response = await instanceApi.post(`/custom/getProdcutById`, request);
    return response;
  }
}

export default ProductApi;