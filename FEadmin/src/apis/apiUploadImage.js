import { instanceApi } from './instanceApi';
import { api } from './apiConstant';
import axios from 'axios';

const UploadImage = {
  uploadImage: async (file) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')) ;
      const config = {
        headers: { Authorization: `Bearer ${userInfo.refreshToken}` },
      }
      const response = await axios.post("http://localhost:5000/api/upload", file, config);
      return response.data;
    }
    catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  deleteImage: async (public_id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')) ;
      const config = {
        headers: { Authorization: `Bearer ${userInfo.refreshToken}` },
      }
      const response = await axios.post("http://localhost:5000/api/upload/destroy", {public_id} , config);
      return response.data;
    }
    catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  },
}

export default UploadImage;