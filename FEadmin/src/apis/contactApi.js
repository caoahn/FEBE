import { instanceApi } from './instanceApi';
import { api } from './apiConstant';

const ContactApi = {
  getContact: async () => {
    try {
      const response = await instanceApi.get(api.getContact);
      return response.data;
    } catch (error) {
      console.error('Error getting contact:', error);
      throw error;
    }
  },
  deleteContact: async (id) => {
    try {
      console.log('id', id);
      const response = await instanceApi.delete(api.deleteContacts(id));
      return response.data;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
}

export default ContactApi;