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
        <div className="p-4 sm:ml-96">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data?.length > 0 &&
                        data?.map((item, index) => (
                            <div key={index + 1} className="group relative bg-gray-100 rounded-[9px] p-3">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={item.images[0]?.src}
                                        alt="Front of men's Basic Tee in black."
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-gray-700">
                                            <a href="#">
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {item.name}
                                            </a>
                                        </h3>
                                        <p class="mt-1 font-medium text-gray-900">
                                            ${item.sale_price ? item.sale_price : item.regular_price}
                                            {parseInt(item.regular_price) > parseInt(item.sale_price) && (
                                                <span class="text-gray-500 line-through ml-2">
                                                    ${item.regular_price}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <img
                                        onClick={() => handleAddToCart(item)}
                                        className="group-hover:grayscale cursor-pointer group-hover:brightness-[15] p-2 border h-auto self-end border-solid rounded-md border-gray-300"
                                        src="/static/media/lock.5caf6f12a3990c557832ab6963c7d653.svg"
                                        alt="add-cart"
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
