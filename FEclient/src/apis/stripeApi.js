import { instanceApi } from "./instanceApi";

const StripeApi = {
  createCheckoutSession: async (request) => {
    const response = await instanceApi.post(`/create-checkout-session`, request);
    return response;
  },
  createPaymentIntent: async (request) => {
    const response = await instanceApi.post(`/stripe/create-payment-intent`, request);
    return response;
  },
  createSetupIntent: async (request) => {
    const response = await instanceApi.post(`/stripe/create-setup-intent`, request);
    return response;
  },
}

export default StripeApi;