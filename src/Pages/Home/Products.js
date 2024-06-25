import React, { useState, useEffect, useRef } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { TiCancel } from "react-icons/ti";
import { MdMoreHoriz } from "react-icons/md";
import productData from "../../utils/products";
import lock from "../../assets/images/lock.svg";
import useAddToCart from "../../hooks/useAddToCart";
import { notifyError } from "../../utils/toast";
import { useCart } from "react-use-cart";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

console.log("productData", productData);

const Products = () => {
  const { handleAddItem } = useAddToCart();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
        <div className="grid--container grid items-center justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-[10px] pt-1 pl-2">
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
            <TiCancel className="text-[30px]" />
            <p>Order</p>
          </div>
          <div className="max-w-[100px] rounded-[6px] flex flex-col cursor-pointer items-center justify-center gap-[5px] w-[80px] h-[45px] bg-[#ffffffc7]">
            <IoIosLogOut className="text-[30px]" />
            <p>Logout</p>
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-96">
            <h2 className="text-2xl mb-4">Add Customer</h2>
            <div className="table_container">
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div class="pb-4 bg-white dark:bg-gray-900">
                  <label for="table-search" class="sr-only">
                    Search
                  </label>
                  <div class="relative mt-1">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                      class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search for items"
                    />
                  </div>
                </div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-all-search" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Color
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-search-1" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td class="px-6 py-4">Silver</td>
                      <td class="px-6 py-4">Laptop</td>
                      <td class="px-6 py-4">$2999</td>
                      <td class="px-6 py-4">
                        <a
                          href="#"
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-2"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-search-2" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Microsoft Surface Pro
                      </th>
                      <td class="px-6 py-4">White</td>
                      <td class="px-6 py-4">Laptop PC</td>
                      <td class="px-6 py-4">$1999</td>
                      <td class="px-6 py-4">
                        <a
                          href="#"
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-3"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-search-3" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Magic Mouse 2
                      </th>
                      <td class="px-6 py-4">Black</td>
                      <td class="px-6 py-4">Accessories</td>
                      <td class="px-6 py-4">$99</td>
                      <td class="px-6 py-4">
                        <a
                          href="#"
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-3"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-3" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Apple Watch
                      </th>
                      <td class="px-6 py-4">Silver</td>
                      <td class="px-6 py-4">Accessories</td>
                      <td class="px-6 py-4">$179</td>
                      <td class="px-6 py-4">
                        <a
                          href="#"
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-3"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-3" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        iPad
                      </th>
                      <td class="px-6 py-4">Gold</td>
                      <td class="px-6 py-4">Tablet</td>
                      <td class="px-6 py-4">$699</td>
                      <td class="px-6 py-4">
                        <a
                          href="#"
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-3"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-3" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Apple iMac 27"
                      </th>
                      <td class="px-6 py-4">Silver</td>
                      <td class="px-6 py-4">PC Desktop</td>
                      <td class="px-6 py-4">$3999</td>
                      <td class="px-6 py-4">
                        <a
                          href="#"
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
