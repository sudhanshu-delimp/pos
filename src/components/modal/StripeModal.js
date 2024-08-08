import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Checkout from '../../Pages/Checkout/Checkout';
import { useCart } from 'react-use-cart';
import { useDispatch, useSelector } from 'react-redux';
import { saveCustomer, saveStoreOrderId } from '../../redux/reducers/appSlice';
import OrderServices from '../../services/OrderServices';

const StripeModal = ({ orderId }) => {
    const dispatch = useDispatch();
    const { emptyCart } = useCart();
    const { setSreipeModal } = useContext(AppContext);
    const { storeOrderId } = useSelector((state) => state.app);


    const clearCartData = () => {
        emptyCart();
        dispatch(saveCustomer(""));
        dispatch(saveStoreOrderId(""));
        setSreipeModal(false)
    }

    const closeStripeModal = async () => {
        if (storeOrderId) {
            try {
                const response = await OrderServices.removeOrderApi(storeOrderId);
                console.log("deleteOrder Response", response)
                dispatch(saveStoreOrderId(""));
            } catch (error) {
                console.log(error)
            }
        }
        setSreipeModal(false)
    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-6">
            <div className="bg-white rounded-lg p-6 max-w-[1100px] min-h-80 transition-transform duration-300 translate-x-0">
                <section className="relative">
                    <div className="flex items-center justify-between rounded-t mb-4">
                        <button onClick={closeStripeModal} type="button" className="flex items-center justify-center px-3 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:border-gray-800">
                            <svg className="w-3.5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>Go back</span>
                        </button>
                        <a
                            type="button"
                            className="cursor-pointer text-gray-500 bg-transparent hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center"
                            data-modal-hide="default-modal"
                            onClick={closeStripeModal}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </a>
                    </div>
                    <div className="w-full mx-auto max-h-[500px] overflow-y-auto lg:max-h-[800] lg:overflow-y-auto">
                        < Checkout orderId={orderId} clearCartData={clearCartData} />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default StripeModal
