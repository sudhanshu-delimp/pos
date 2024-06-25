import React from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { TiCancel } from "react-icons/ti";
import { MdMoreHoriz } from "react-icons/md";
import productData from "../../utils/products";
import lock from "../../assets/images/lock.svg";
import useAddToCart from "../../hooks/useAddToCart";
import { notifyError } from "../../utils/toast";
import { useCart } from "react-use-cart";

console.log("productData", productData);

const Products = () => {
  const { handleAddItem } = useAddToCart();

  const { emptyCart } = useCart();

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
    <>
      <div className="product--container">
        <div className="box--container m-w-[300px] bg-[#2874f075] flex items-center	justify-end gap-[5px] p-2">
          <div
            onClick={emptyCart}
            className="max-w-[100px] rounded-[6px] flex flex-col cursor-pointer items-center	justify-center gap-[5px] w-[80px] h-[80px] bg-[#ffffffc7]"
          >
            <TiCancel className="text-[20px]" />
            <p>Void</p>
          </div>
          <div className="max-w-[100px] rounded-[6px] flex flex-col	 items-center	justify-center gap-[5px] w-[80px] h-[80px] bg-[#ffffffc7]">
            <MdMoreHoriz className="text-[20px]" />
            <p>More</p>
          </div>
        </div>
        <div className="grid--container grid items-center justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-[10px]">
          {productData?.map((item) => (
            <div
              key={item._id}
              className="items bg-gray-100 rounded-[9px] p-3 pb-6"
            >
              <div className="images--container ">
                <img src={item.image} className="rounded-[9px] w-full" />
              </div>
              <div className="content">
                <p className="pt-3 pb-1 text-left	">{item.title}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center	gap-[7px]">
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
      </div>
    </>
  );
};

export default Products;
