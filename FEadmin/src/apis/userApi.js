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
  updateProfile: async ({id, request}) => {
    const response = await instanceApi.put(`/users/profile`, request);
    return response;
  },
  changePassword: async (request) => {
    const response = await instanceApi.post(`/users/reset-password`, request);
    return response;
  },
  getUsers: async () => {
    const response = await instanceApi.get(`/users`);
    return response;
  },
  createUser: async (request) => {
    const response = await instanceApi.post(`/users/create`, request);
    return response;
  },
  getUserById: async (id) => {
    const response = await instanceApi.get(`/users/${id}`);
    return response;
  },
  updateUser: async ({id, request}) => {
    const response = await instanceApi.patch(`/users/${id}`, request);
    return response;
  },
  deleteUser: async (id) => {
    const response = await instanceApi.delete(`/users/${id}`);
    return response;
  }
}
export default UserApi;
