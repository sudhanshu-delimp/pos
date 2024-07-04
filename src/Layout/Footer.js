import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { SiVoidlinux } from "react-icons/si";
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
    const { setCustomerModal , setBillingAddress } = useContext(AppContext);
    const { isEmpty, items, cartTotal, emptyCart } = useCart();

    const handleVoidProduct = () => {
        dispatch(saveCustomer(""));
        emptyCart();
    }

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
                const popupWindow = window.open("", "Popup", "width=600,height=700");
                const response = await OrderServices.createOrderApi(payload);
                const orderId = response.id
                setLoading(false);
                notifySuccess("Order created successfully");
                emptyCart();
                dispatch(saveCustomer(""));
                setBillingAddress(false);
                popupWindow.location.href = `${process.env.REACT_APP_TERMINAL_URL}?orderId=${orderId}`;
                // window.open(`${process.env.REACT_APP_TERMINAL_URL}?orderId=${orderId}`, "Popup", "width=600,height=700");
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
                            <span onClick={createOrder}>
                                {loading ? "Processing" : "Total"} ${cartTotal?.toFixed(2)}
                            </span>
                        )}
                    </span>
                </span>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
                    {/* <li onClick={handleVoidProduct} className="bg-[#0fb4e0] px-6 py-3 transition duration-150 ease-out hover:ease-in cursor-pointer hover:bg-gray-700">
                        <div className="flex items-center space-x-2">
                        <SiVoidlinux />
                            <span className="text-white"> Void</span>
                        </div>
                    </li> */}

                    <li onClick={handleVoidProduct} className="bg-[#0fb4e0] px-6 py-3 transition duration-150 ease-out hover:ease-in cursor-pointer hover:bg-gray-700">
                        <div className="flex items-center space-x-2">
                       
                            <span className="text-white text-base"> Checkout</span>
                        </div>
                    </li>

                    {/* <li>
                        <span onClick={handleVoidProduct} className="text-xl cursor-pointer me-4 md:me-6 flex items-center gap-1.5">
                            <SiVoidlinux /> Void
                        </span>
                    </li> */}
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
