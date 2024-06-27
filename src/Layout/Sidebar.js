import React, { useContext, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useCart } from "react-use-cart";
import useAddToCart from "../hooks/useAddToCart";
import { useSelector } from "react-redux";
import { notifySuccess, notifyError } from "../utils/toast";
import OrderServices from "../services/OrderServices";
import useUtilsFunction from "../hooks/useUtilsFunction";
import { saveCustomer } from '../redux/reducers/appSlice';
import { useDispatch } from 'react-redux';
import { AppContext } from "../context/AppContext";


function Sidebar() {
  const dispatch = useDispatch();
  const { updateItemQuantity, removeItem } = useCart();
  const { handleIncreaseQuantity } = useAddToCart();
  const { customer } = useSelector(state => state.app)
  const [loading, setLoading] = useState(false)
  const { catchError } = useUtilsFunction();
  const { setCustomerModal } = useContext(AppContext);
  const { isEmpty, items, cartTotal, totalItems, emptyCart } = useCart();


  console.log("isEmpty", isEmpty)


  const createOrder = async () => {
    if (customer?.id) {
      const cartItems = items.map(item => ({ product_id: item.id, quantity: item.quantity }))
      let payload = {
        payment_method: "delimpterminal",
        payment_method_title: "Terminal",
        set_paid: false,
        customer_id: customer.id,
        billing: customer.billing,
        shipping: customer.shipping,
        line_items: cartItems
      };
      try {
        setLoading(true);
        const response = await OrderServices.createOrderApi(payload);
        notifySuccess("Order created successfully")
        emptyCart();
        dispatch(saveCustomer(""))
        setLoading(false);
      } catch (error) {
        const errorMessage = catchError(error);
        setLoading(false);
        notifyError(errorMessage);
      }
    }
    else {
      setCustomerModal(true)
    }
  }

  return (
    <div className="add__to_cart_container pr-3 pl-3 shadow-md relative flex flex-col gap-[15px] w-[50rem]">
      <div className="p-2 mt-1">
        {customer?.first_name && <h4 className="text-blue-700 font-bold">{customer.first_name}</h4>}
      </div>
      <div className="ccc">
        {items?.length > 0 &&
          items?.map((item, index) => (
            <div
              key={index + 1}
              className="cart--container flex items-centergap-[10px] bg-gray-100 p-2 rounded-[6px] mt-1 mb-2"
            >
              <div className="image--wrapper w-[30px] h-[30px] rounded-full outline outline-1 outline-offset-4 outline-gray-900">
                <img src={item.image} className="rounded-full" />
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
                    {item.itemTotal}
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

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 bg-[#3498db] p-2 h-[50px]  absolute bottom-0 sm:bottom-4 md:bottom-3 lg:bottom-0">
        <h1 className=" text-[20px] cursor-pointer font-bold text-right mt-1">
          {cartTotal > 0 && <span onClick={createOrder}>
            {loading ? "Processing" : "Checkout"}  ${cartTotal?.toFixed(2)}
          </span>
          }
        </h1>
      </div>
    </div>
  );
}

export default Sidebar;
