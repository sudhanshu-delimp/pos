import requests from "./httpServices";

const CustomerServices = {

  addCustomerApi: async (body) => {
    return requests.post("/wc/v3/customers", body);
  },

  getCustomerListApi: async (body) => {
    return requests.get("/wc/v3/customers", body);
  },

  customerLogin: async (body) => {
    return requests.post("/customer/login", body);
  },

  verifyEmailAddress: async (body) => {
    return requests.post("/customer/verify-email", body);
  },

  registerCustomer: async (body) => {
    return requests.post('/customer/register', body);
  },

  forgetPassword: async (body) => {
    return requests.put("/customer/forget-password", body);
  },

  resetPassword: async (body) => {
    return requests.put("/customer/reset-password", body);
  },

  changePassword: async (body) => {
    return requests.post("/customer/change-password", body);
  },

  updateCustomer: async (id, body) => {
    return requests.put(`/customer/${id}`, body);
  },

  getCustomerById: async (id) => {
    return requests.get(`/customer/${id}`);
  },

};

export default CustomerServices;
