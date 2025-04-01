import {instanceApi} from "./instanceApi";

const UserApi = {
  login: async (request) => {
    const response = await instanceApi.post(`/users/login`, request);
    return response;
  },
  logout: async () => {
    const response = await instanceApi.post(`/users/logout`);
    return response;
  },
  register: async (request) => {
    const response = await instanceApi.post(`/users`, request);
    return response;
  },
  profile: async () => {
    const response = await instanceApi.get(`/users/profile`);
    return response;
  },
  updateProfile: async (request) => {
    const response = await instanceApi.put(`/users/profile`, request);
    return response;
  },
  changePassword: async (request) => {
    const response = await instanceApi.post(`/users/reset-password`, request);
    return response;
  },
  
}
export default UserApi;
