import React, { useContext, useState } from "react";
import lock from "../../assets/images/lock.svg";
import useAddToCart from "../../hooks/useAddToCart";
import useAsync from "./../../hooks/useAsync";
import ProductServices from "../../services/ProductServices";
import { AppContext } from "../../context/AppContext";
import { useSelector } from "react-redux";
import Loader from "../../components/preloader/Loader";
import AttributesModal from "../Attribute/AttributesModal";



const Products = () => {
    const { handleAddItem } = useAddToCart();
    const { data, loading, error } = useAsync(() => ProductServices.getAllProducts());
    const { setCustomerModal, setBillingAddress, attributeModal, setAttributeModal } = useContext(AppContext);
    const { customer } = useSelector((state) => state.app);
    const [product, setProduct] = useState("")


    const handleAddToCart = (product) => {
        if (product?.attributes?.length > 0) {
            setAttributeModal(true)
            setProduct(product)
        }
        else {
            if (product.shipping_required && !customer.id) {
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
                quantity: 1,
                shipping_required: product.shipping_required
            };
            handleAddItem(newItem);
        }
    };

    const getPrice = (product) => {
        const price = product?.sale_price || product?.regular_price || product?.price
        return price
    }

    const toggleAttributeModal = () => {
        setAttributeModal(!attributeModal)

    }

    console.log("attributeModal", attributeModal)

    return (
        <>
            <div className="py-[12px] px-[4px] sm:ml-96">
                <div className="py-[12px] px-[4px] border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20 mb-14">
                    <div className="grid pos--content">
                        {data?.length > 0 &&
                            data?.map((item, index) => (
                                <div key={index + 1} className="group relative bg-gray-100 rounded-[9px] p-3">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={item?.images[0]?.src}
                                            alt="Front of men's Basic Tee in black."
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-gray-700 line-clamp-2">
                                                <span>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {item.name}
                                                </span>
                                            </h3>
                                            <p onClick={toggleAttributeModal} className="mt-1 font-medium text-gray-900">
                                                ${getPrice(item)}
                                                {parseInt(item.regular_price) > parseInt(item.sale_price) && (
                                                    <span className="text-gray-500 line-through ml-2">
                                                        ${item.regular_price}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <img
                                            onClick={() => handleAddToCart(item)}
                                            className="group-hover:grayscale cursor-pointer group-hover:brightness-[15] p-2 border h-auto self-end border-solid rounded-md border-gray-300"
                                            src={lock}
                                            alt="add-cart"
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                {loading &&
                    <Loader loading={loading} />
                }
            </div>
            {attributeModal &&
                <AttributesModal product={product} />
            }
        </>
    );
};

export default Products;
