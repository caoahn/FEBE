import {instanceApi} from "./instanceApi";

const SendEmailApi =  {
  sendEmail: async (data) => {
    const response = await instanceApi.post(`/users/forgot_password`, data);
    return response;
  }
}

export default SendEmailApi;