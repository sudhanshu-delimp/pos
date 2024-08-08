import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useCart } from "react-use-cart";
import { useSelector } from "react-redux";
import { notifySuccess, notifyError } from "../utils/toast";
import OrderServices from "../services/OrderServices";
import useUtilsFunction from "../hooks/useUtilsFunction";
import { AppContext } from "../context/AppContext";
import StripeModal from './../components/modal/StripeModal';
import { saveStoreOrderId } from "../redux/reducers/appSlice";


function Footer() {
    const dispatch = useDispatch();
    const { customer } = useSelector((state) => state.app);
    const [loading, setLoading] = useState(false);
    const { catchError } = useUtilsFunction();
    const [orderId, setOrderId] = useState("")
    const { setCustomerModal, setBillingAddress, stripeModal, setSreipeModal } = useContext(AppContext);
    const { items, cartTotal } = useCart();


    const openOrderInNewTab = (orderId) => {
        const url = `${process.env.REACT_APP_TERMINAL_URL}?orderId=${orderId}`;
        const popupWindow = window.open(url, "_blank");
        // window.location.assign(url, '_blank', 'noopener,noreferrer');
        // var newWindow = window.open(url,"Popup", "width=700,height=800");
        if (popupWindow) {
            // popupWindow.location.href = `${process.env.REACT_APP_TERMINAL_URL}?orderId=${orderId}`;
            popupWindow.focus();
        } else {
            alert('Pop up blocked! Please enable pop-ups for this site.');
        }
    };

    const createOrder = async () => {
        const guestBilling = { first_name: "Guest" }
        if (items.find(item => item.shipping_required === true) && !customer.id) {
            setCustomerModal(true);
            setBillingAddress(true);
        } else {
            const cartItems = items.map((item) => ({
                product_id: item.id,
                quantity: item.quantity,
                meta_data: item.meta_data
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
                const order_id = response?.id;
                setBillingAddress(false);
                setOrderId(order_id);
                dispatch(saveStoreOrderId(order_id));
                setLoading(false);
                notifySuccess("Order created successfully!");
                setSreipeModal(true)
            } catch (error) {
                const errorMessage = catchError(error);
                setLoading(false);
                notifyError(errorMessage);
            }
        }
    };

    return (
        <>
            <footer className="bg-[#3498db] text-white fixed bottom-0 w-full z-40">
                <div className="px-[10px] py-[15px] lg:px-5 lg:pl-3">
                    <div className="sm:flex sm:items-center gap-6">
                        <span
                            className="flex items-center sm:mb-0 space-x-3 rtl:space-x-reverse"
                        >
                            <span className="self-center text-xl cursor-pointer font-semibold whitespace-nowrap dark:text-white">
                                <span >
                                    Total ${cartTotal?.toFixed(2)}
                                </span>
                            </span>
                        </span>
                        <ul className="flex items-center text-sm font-medium sm:mb-0">
                            <li className="bg-[#0fb4e0] transition duration-150 ease-out hover:ease-in cursor-pointer hover:bg-gray-700">
                                <div onClick={createOrder} className="flex items-center space-x-2">
                                    <button disabled={loading || items?.length === 0} className="btn text-white rounded px-4 py-2.5 w-full">{loading ? "Processing" : "Checkout"}</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>

            {stripeModal &&
                <StripeModal orderId={orderId} />
            }

        </>
    );
}

export default Footer;
