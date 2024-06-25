import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { useCart } from "react-use-cart";
import useAddToCart from "../hooks/useAddToCart";

function Sidebar() {
  const { updateItemQuantity, removeItem } = useCart();
  const { handleIncreaseQuantity } = useAddToCart();

  const { isEmpty, items, cartTotal, totalItems, emptyCart } = useCart();

  console.log("totalItems", totalItems);

  return (
    <>
      <div className="add__to_cart_container pr-5 pl-5 pt-5 shadow-md relative flex flex-col gap-[15px] w-[25rem]">
        <div className="ccc">
          {items?.length > 0 &&
            items?.map((item, index) => (
              <div
                key={index + 1}
                className="cart--container flex items-center	gap-[10px] bg-gray-100 p-2 rounded-[6px] mt-2 mb-2"
              >
                <div className="image--wrapper w-[30px] h-[30px] rounded-full outline outline-1 outline-offset-4 outline-gray-900">
                  <img
                    src={require("../assets/images/t-shirt.jpg")}
                    className="rounded-full"
                  />
                </div>
                <div className="add--item--content">
                  <div>
                    <p className="text-left">{item.title}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 mb-1">
                      Item Price ${item.price}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <h1 className="text-left text-[16px] font-bold">
                      {" "}
                      {(item.price * item.quantity).toFixed(2)}
                    </h1>
                    <div className="flex gap-[20px] border border-gray-600 py-0 px-1 rounded-[5px] mx-5">
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <p>{item.quantity}</p>
                      <button onClick={() => handleIncreaseQuantity(item)}>
                        +
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)}>
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {totalItems > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 bottom-5 sm:bottom-4 md:bottom-3 bg-gray-100 p-2 rounded-[6px] absolute bottom-5 w-[85%]">
            <h1 className="text-left text-[20px] font-bold">Total</h1>
            <h1 className=" text-[20px] font-bold text-right mt-1">
              {cartTotal.toFixed(2)}
            </h1>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
