import {instanceApi} from "./instanceApi";

const ContactApi = {
  createContact: async (data) => {
    try {
      const response = await instanceApi.post("/contacts", data);
      return response.data;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  },
}

export default ContactApi;