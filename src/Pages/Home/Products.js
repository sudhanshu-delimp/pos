import React from "react";
import productData from "../../utils/products";
import lock from "../../assets/images/lock.svg";
import useAddToCart from "../../hooks/useAddToCart";
import { notifyError } from "../../utils/toast";
import useAsync from './../../hooks/useAsync';
import ProductServices from "../../services/ProductServices";


const Products = () => {
  const { handleAddItem } = useAddToCart();
  const { data, loading, error } = useAsync(() => ProductServices.getAllProducts());




  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      notifyError("Insufficient stock");
    } else {
      const { description, ...updatedProduct } = product;
      const newItem = {
        ...updatedProduct,
        id: product._id,
        title: product.title,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
        quantity: product.quantity,
      };
      handleAddItem(newItem);
    }
  };


  return (
    <div className="grid--container grid items-center justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-[10px] pt-1 pl-2 pb-10">
      {productData?.map((item) => (
        <div
          key={item._id}
          className="items bg-gray-100 rounded-[9px] p-3 pb-6"
        >
          <div className="images--container">
            <img src={item.image} className="rounded-[9px] w-full" />
          </div>
          <div className="content">
            <p className="pt-3 pb-1 text-left">{item.title}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[7px]">
                <h1 className="text-left text-[20px] font-bold">
                  {item.price}
                </h1>
                <p className="line-through">{item.originalPrice}</p>
              </div>
              <img
                className="group-hover:grayscale cursor-pointer group-hover:brightness-[15] p-2 border h-auto self-end border-solid rounded-md border-gray-300"
                onClick={() => handleAddToCart(item)}
                src={lock}
                alt="add-cart"
              />
            </div>
          </div>
          <div className="flex align-bottom"></div>
        </div>
      ))}
    </div>
  );
};

export default Products;
