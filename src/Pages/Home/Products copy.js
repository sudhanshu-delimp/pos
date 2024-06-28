import React, { useContext } from "react";
import lock from "../../assets/images/lock.svg";
import useAddToCart from "../../hooks/useAddToCart";
import useAsync from "./../../hooks/useAsync";
import ProductServices from "../../services/ProductServices";


const Products = () => {
  const { handleAddItem } = useAddToCart();
  const { data, loading, error } = useAsync(() =>
    ProductServices.getAllProducts()
  );

  const handleAddToCart = (product) => {
    const newItem = {
      id: product.id,
      title: product.name,
      image: product.images[0]?.src,
      price: product.sale_price
        ? parseInt(product.sale_price)
        : parseInt(product.regular_price),
      originalPrice: parseInt(product.regular_price),
      status: product.status,
    };
    handleAddItem(newItem);
  };

  return (
    <div className="grid--container grid items-center justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-[10px] pt-1 pl-2 pb-10">
      {data?.length > 0 &&
        data?.map((item, index) => (
          <div
            key={index + 1}
            className="items bg-gray-100 rounded-[9px] p-3 pb-6"
          >
            <div className="images--container">
              <img
                src={item.images[0]?.src}
                className="rounded-[9px] w-[100%] h-[240px] object-cover max-w-[500px]"
              />
            </div>
            <div className="content">
              <p className="pt-3 pb-1 text-left">{item.name}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[7px]">
                  <h1 className="text-left text-[20px] font-bold">
                    {item.sale_price ? item.sale_price : item.regular_price}
                  </h1>
                  {parseInt(item.regular_price) > parseInt(item.sale_price) && (
                    <p className="line-through">{item.regular_price}</p>
                  )}
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
