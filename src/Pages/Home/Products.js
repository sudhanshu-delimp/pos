import React, { useState, useEffect, useRef } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { TiCancel } from "react-icons/ti";
import { MdMoreHoriz } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import productData from "../../utils/products";
import lock from "../../assets/images/lock.svg";
import useAddToCart from "../../hooks/useAddToCart";
import { notifyError } from "../../utils/toast";
import { useCart } from "react-use-cart";
import { IoIosLogOut } from "react-icons/io";
import { MdProductionQuantityLimits } from "react-icons/md";

console.log("productData", productData);

const Products = () => {
  const { handleAddItem } = useAddToCart();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [customerScreenVisible, setCustomerScreenVisible] = useState(false);
  const dropdownRef = useRef(null);

  const { emptyCart } = useCart();

  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      notifyError("Insufficient stock");
    } else {
      const { description, ...updatedProduct } = product;
      const newItem = {
        ...updatedProduct,
        id: product._id,
        title: product.title,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
        quantity: product.quantity,
      };
      handleAddItem(newItem);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  const handleAddCustomer = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCustomerScreenVisible(false);
  };

  const openCustomerScreen = () => {
    setCustomerScreenVisible(true);
  };

  const closeCustomerScreen = () => {
    setCustomerScreenVisible(false);
  };

  return (
    <>
      <div className="product--container">
        <div className="box--container m-w-[300px] bg-[#3498db] flex items-center justify-end gap-[5px] p-2">
          <div
            onClick={emptyCart}
            className="max-w-[100px] rounded-[6px] flex flex-col cursor-pointer items-center justify-center gap-[5px] w-[80px] h-[45px] bg-[#ffffffc7]"
          >
            <TiCancel className="text-[20px]" />
            <p>Void</p>
          </div>
          <div className="relative max-w-[100px] rounded-[6px] flex flex-col items-center justify-center gap-[5px] w-[80px] h-[45px] bg-[#ffffffc7]">
            <MdMoreHoriz
              className="text-[20px] cursor-pointer"
              onClick={toggleDropdown}
            />
            <p>More</p>
            {dropdownVisible && (
              <div
                ref={dropdownRef}
                className="absolute top-[100%] right-0 mt-2 w-[120px] bg-white border border-gray-300 rounded shadow-lg"
              >
                <div className="flex flex-col">
                  <button
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={handleAddCustomer}
                  >
                    Add Customer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="grid--container grid items-center justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-[10px] pt-1 pl-2 pb-10 pt-10">
          {productData?.map((item) => (
            <div
              key={item._id}
              className="items bg-gray-100 rounded-[9px] p-3 pb-6"
            >
              <div className="images--container">
                <img src={item.image} className="rounded-[9px] w-full" />
              </div>
              <div className="content">
                <p className="pt-3 pb-1 text-left">{item.title}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[7px]">
                    <h1 className="text-left text-[20px] font-bold">
                      {item.price}
                    </h1>
                    <p className="line-through">{item.originalPrice}</p>
                  </div>
                  <img
                    className="group-hover:grayscale cursor-pointer group-hover:brightness-[15] p-2 border h-auto self-end border-solid rounded-md border-gray-300"
                    onClick={() => handleAddToCart(item)}
                    src={lock}
                    alt="add-cart"
                  />
                </div>
              </div>
              <div className="flex align-bottom"></div>
            </div>
          ))}
        </div>
        <div className="order_and_logout_container m-w-[300px] h-[50px] bg-[#3498db] flex items-center justify-end gap-[5px] p-2">
          <div className="max-w-[100px] rounded-[6px] flex flex-col cursor-pointer items-center justify-center gap-[5px] w-[80px] h-[45px] bg-[#ffffffc7]">
            <MdProductionQuantityLimits className="text-[30px] text-[#000]" />
            <p className=" text-[#000]">Order</p>
          </div>
          <div className="max-w-[100px] rounded-[6px] flex flex-col cursor-pointer items-center justify-center gap-[5px] w-[80px] h-[45px] bg-[#ffffffc7]">
            <IoIosLogOut className="text-[30px] text-[#000]" />
            <p className="text-[#000]">Logout</p>
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`bg-white rounded-lg p-4 w-[80%] max-w-[600px] transition-transform duration-300 ${
              customerScreenVisible ? "translate-x-0" : "translate-x-0"
            }`}
          >
            {!customerScreenVisible ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <button
                      type="button"
                      className="bg-[#3498db] text-white px-4 py-2 rounded mr-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <a className=" text-[#000]">Customers</a>
                  </div>
                  <div>
                    <button
                      onClick={openCustomerScreen}
                      className="cursor-pointer bg-[#3498db] text-white px-4 py-2 rounded"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="table_container">
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg tbody_scroll">
                    <div className="pb-4 bg-white dark:bg-gray-900">
                      <label htmlFor="table-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="table-search"
                          className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[100%] search_customer"
                          placeholder="Search for items"
                        />
                      </div>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4 text-[#000]">A customer</td>
                          <td className="px-6 py-4 text-[#000] ">54154555</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4 text-[#000]">A customer</td>
                          <td className="px-6 py-4 text-[#000]">54154555</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4 text-[#000]">A customer</td>
                          <td className="px-6 py-4 text-[#000]">54154555</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4 text-[#000]">A customer</td>
                          <td className="px-6 py-4 text-[#000]">54154555</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4 text-[#000]">A customer</td>
                          <td className="px-6 py-4 text-[#000]">54154555</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4 text-[#000]">A customer</td>
                          <td className="px-6 py-4 text-[#000]">54154555</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Add your customer details content here */}
                <div className="addcustomer_container m-auto">
                  <div className="flex flex items-center justify-between">
                    <button
                      type="button"
                      className="bg-[#3498db] text-white px-4 py-2 rounded mb-4"
                      onClick={closeCustomerScreen}
                    >
                      Back
                    </button>
                    <h3>Create new customer</h3>
                    <button className="bg-[#3498db] text-white px-4 py-2 rounded mb-4">
                      Save
                    </button>
                  </div>

                  <div className="form_container max-w-[100%] m-auto">
                    <form>
                      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[10px]">
                        <input
                          type="text"
                          placeholder="First Name"
                          className="px-5 py-3"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="px-5 py-3"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Address Line 1"
                        className="px-5 py-3 mt-3 mb-3"
                      />
                      <input
                        type="text"
                        placeholder="Address Line 2"
                        className="px-5 py-3"
                      />
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[10px]">
                        <select className="px-5 py-3">
                          <option>Country</option>
                          <option>Usa</option>
                          <option>Austrlia</option>
                          <option>England</option>
                        </select>
                        <select className="px-5 py-3">
                          <option>State</option>
                          <option>Usa</option>
                          <option>Austrlia</option>
                          <option>England</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[10px] mt-3">
                        <input
                          type="text"
                          placeholder="Zip"
                          className="px-5 py-3"
                        />
                        <input
                          type="text"
                          placeholder="Phone"
                          className="px-5 py-3"
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="email"
                        className="px-5 py-3 mt-3"
                      />
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
