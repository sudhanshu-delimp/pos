import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useCart } from "react-use-cart";
import { saveCustomer } from "../redux/reducers/appSlice";
import { useSelector } from "react-redux";
import { notifySuccess, notifyError } from "../utils/toast";
import OrderServices from "../services/OrderServices";
import useUtilsFunction from "../hooks/useUtilsFunction";
import { AppContext } from "../context/AppContext";


function Footer() {
    const dispatch = useDispatch();
    const { customer } = useSelector((state) => state.app);
    const [loading, setLoading] = useState(false);
    const { catchError } = useUtilsFunction();
    const { setCustomerModal, setBillingAddress } = useContext(AppContext);
    const { isEmpty, items, cartTotal, emptyCart } = useCart();

    const guestBilling = { first_name: "Guest" }

    const createOrder = async () => {
        if (items.find(item => item.shipping_required === true) && !customer.id) {
            setCustomerModal(true);
            setBillingAddress(true);
        } else {
            const cartItems = items.map((item) => ({
                product_id: item.id,
                quantity: item.quantity,
            }));
            let payload = {
                payment_method: "delimpterminal",
                payment_method_title: "Terminal",
                set_paid: false,
                customer_id: customer.id || 0,
                billing: guestBilling,
                line_items: cartItems,
            };
            if (customer.id) {
                Object.assign(payload, { billing: customer.billing, shipping: customer.shipping, })
            }
            try {
                setLoading(true);
                const response = await OrderServices.createOrderApi(payload);
                const orderId = response.id
                setLoading(false);
                notifySuccess("Order created successfully");
                emptyCart();
                dispatch(saveCustomer(""));
                setBillingAddress(false);
                window.open(`${process.env.REACT_APP_TERMINAL_URL}?orderId=${orderId}`, '_blank', 'noopener,noreferrer');
            } catch (error) {
                const errorMessage = catchError(error);
                setLoading(false);
                notifyError(errorMessage);
            }
        }
    };


    return (
        <footer className="bg-[#3498db] text-white p-4 fixed bottom-0 w-full z-40">
            <div className="sm:flex sm:items-center gap-20">
                <span
                    className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                >
                    <span className="self-center text-xl cursor-pointer font-semibold whitespace-nowrap dark:text-white">
                        {cartTotal > 0 && (
                            <span >
                                Total : ${cartTotal?.toFixed(2)}
                            </span>
                        )}
                    </span>
                </span>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
                    {cartTotal > 0 && (
                        <li className="bg-[#0fb4e0] px-6 py-3 transition duration-150 ease-out hover:ease-in cursor-pointer hover:bg-gray-700">
                            <div onClick={createOrder} className="flex items-center space-x-2">
                                {cartTotal > 0 && (
                                    <span className="text-white text-base">{loading ? "Processing" : "Checkout"}</span>
                                )}
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
