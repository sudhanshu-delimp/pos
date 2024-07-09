import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Checkout from '../../Pages/Checkout/Checkout';

const StripeModal = () => {
    const { setSreipeModal } = useContext(AppContext);


    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-6">
            <div className="bg-white rounded-lg p-6 w-[100%] max-w-[1100px] min-h-80 transition-transform duration-300 translate-x-0">
                <section className="relative">
                    <div className="flex items-center justify-between rounded-t mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white"> </h3>
                        <a
                            type="button"
                            className="cursor-pointer text-gray-500 bg-transparent hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center"
                            data-modal-hide="default-modal"
                            onClick={() => setSreipeModal(false)}
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
                        < Checkout />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default StripeModal
