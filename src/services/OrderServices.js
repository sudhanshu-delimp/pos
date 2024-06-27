import requests from "./httpServices";

const OrderServices = {

  createOrderApi: async (body) => {
    return requests.post("/wc/v3/orders", body);
  },

  createPaymentIntent: async (body) => {
    return requests.post("/order/create-payment-intent", body);
  },

  getOrderCustomer: async ({ page = 1, limit = 8 }) => {
    return requests.get(`/order?limit=${limit}&page=${page}`);
  },

  getOrderById: async (id, body) => {
    return requests.get(`/order/${id}`, body);
  },

  acceptOfferApi: async (body) => {
    return requests.post(`/orders/update_offer_status`, body);
  },

  rejectOfferApi: async (body) => {
    return requests.post(`/orders/update_offer_status`, body);
  },

};

export default OrderServices;
