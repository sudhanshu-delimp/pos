import requests from "./httpServices";

const ProductServices = {
  getAllProducts: async () => {
    return requests.get("/wc/v3/products?per_page=100");
  },
};

export default ProductServices;
