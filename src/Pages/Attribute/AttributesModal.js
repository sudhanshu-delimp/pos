import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import useAddToCart from '../../hooks/useAddToCart';
import { useSelector } from 'react-redux';

const AttributesModal = ({ product }) => {
    const { handleAddItem } = useAddToCart();
    const { setCustomerModal, setBillingAddress, setAttributeModal } = useContext(AppContext);
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [quantity, setQuantity] = useState(1)
    const { customer } = useSelector((state) => state.app);


    useEffect(() => {
        const isValid = product.attributes.every(attr =>
            selectedAttributes.find(item => item.key === attr.name && item.value)
        );
        setIsFormValid(isValid);
    }, [selectedAttributes, product.attributes]);

    const handleSelectChange = (attributeName, option) => {
        setSelectedAttributes(prevState => {
            const existingAttr = prevState.find(attr => attr.key === attributeName);
            if (existingAttr) {
                return prevState.map(attr =>
                    attr.key === attributeName ? { ...attr, value: option } : attr
                );
            } else {
                return [...prevState, { key: attributeName, value: option }];
            }
        });
    };

    const getPrice = (product) => {
        const price = product?.sale_price || product?.regular_price || product?.price;
        return price;
    };


    const handleAddToCart = () => {
        if (product.shipping_required && !customer.id) {
            setAttributeModal(false)
            setCustomerModal(true)
            setBillingAddress(true)
        }
        const price = parseInt(product.sale_price) || parseInt(product.regular_price) || parseInt(product.price) || 0
        const newItem = {
            id: product.id,
            title: product.name,
            image: product.images[0]?.src,
            price: price,
            status: product.status,
            quantity: quantity,
            meta_data: selectedAttributes,
            shipping_required: product.shipping_required
        };
        handleAddItem(newItem);
        setAttributeModal(false)
    }


    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-6">
                <div className="bg-white rounded-lg p-6 w-[100%] max-w-[1100px] min-h-80 transition-transform duration-300 translate-x-0">
                    <section className="relative">
                        <div className="flex items-center justify-between rounded-t mb-5">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white"> </h3>
                            <a
                                type="button"
                                className="cursor-pointer text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center"
                                data-modal-hide="default-modal"
                                onClick={() => setAttributeModal(false)}
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

                        <div className="w-full mx-auto max-h-[550px] overflow-y-auto lg:max-h-[800] lg:overflow-y-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto max-md:px-2 ">
                                <div className="img">
                                    <div className="img-box w-full md:w-96 lg:w-full h-full">
                                        <img
                                            src={product?.images[0]?.src}
                                            alt="product"
                                            className="h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="data w-full xl:justify-start justify-start flex">
                                    <div className="data w-full">
                                        <h2 className="font-manrope text-[18px] md:text-[24px] lg:text-[24px] leading-10 text-gray-900 mb-2 capitalize">
                                            {product.name}
                                        </h2>
                                        <div className="flex flex-col sm:flex-row mb-2">
                                            <h6 className="font-manrope font-semibold text-xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                                                ${getPrice(product)}
                                            </h6>
                                        </div>
                                        <form className="mx-auto">
                                            {product.attributes.map((item, index) =>
                                                <React.Fragment key={index}>
                                                    <label
                                                        htmlFor={`attribute-${index}`}
                                                        className="text-base block mb-2 text-gray-900 dark:text-white"
                                                    >
                                                        {item.name}
                                                    </label>
                                                    {item?.options?.length > 0 &&
                                                        <select
                                                            id={`attribute-${index}`}
                                                            className="mb-4 text-base bg-gray-50 border border-gray-300 text-gray-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            onChange={(e) => handleSelectChange(item.name, e.target.value)}
                                                        >
                                                            <option value="">Select an option</option>
                                                            {item.options.map((option, index2) =>
                                                                <option key={index2} value={option}>{option}</option>
                                                            )}
                                                        </select>
                                                    }
                                                </React.Fragment>
                                            )}
                                        </form>
                                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 gap-3">
                                            <div className="mt-4 flex items-center">
                                                <div className="flex">
                                                    <button
                                                        type='button'
                                                        disabled={quantity === 1}
                                                        onClick={() => setQuantity(quantity - 1)} className="bg-gray-300 text-gray-700 rounded-l px-3 py-2.5">
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        readOnly
                                                        className="w-12 text-center border-t border-b border-gray-300"
                                                        value={quantity}
                                                    />
                                                    <button
                                                        type='button'
                                                        onClick={() => setQuantity(quantity + 1)} className="bg-gray-300 text-gray-700 rounded-r px-3 py-2.5">
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={handleAddToCart}
                                                    type='button'
                                                    className="btn ml-4 bg-[#3498db] text-white rounded px-3 py-2 w-full"
                                                    disabled={!isFormValid}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div >
    )
}

export default AttributesModal;
