import React, { useContext, useRef, useState } from "react";
import { useCart } from "react-use-cart";
import CustomerModal from "../Pages/Customer/CustomerModal";
import { AppContext } from "../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/authSlice";
import { MdLogout } from "react-icons/md";
import { SlUser } from "react-icons/sl";
import { FaUserCheck } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";


function Header() {
  const dispatch = useDispatch()
  const { emptyCart } = useCart();
  const { customer } = useSelector((state) => state.app);
  const { customerModal, setCustomerModal } = useContext(AppContext);
  const [attributeModal, setAttributeModal] = useState(false)

  const handleLogOut = () => {
    emptyCart();
    dispatch(logout());
  }

  console.log("customer", customer)

  const toggleAttributeModal = () => {
    setAttributeModal(!attributeModal)

  }

  console.log("attributeModal", attributeModal)


  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-[#3498db] border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
              </button>
              {customer.first_name &&
                <span onClick={() => setCustomerModal(true)} className="flex flex-col cursor-pointer ms-14 md:me-24">
                  <span className="text-base font-semibold sm:text-sm whitespace-nowrap dark:text-white text-white capitalize flex items-center gap-2">
                    <FaUserCheck />
                    {`${customer.first_name} ${customer.last_name}`}
                  </span>
                  <span className="flex items-center gap-2 self-center text-sm font-semibold sm:text-xs whitespace-nowrap dark:text-white text-white capitalize">
                    <FiMapPin />
                    {customer?.billing?.address_1}
                  </span>
                </span>
              }
            </div>

            <div className="flex items-center text-white">
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 gap-4">
                <li className="bg-[#0fb4e0] px-3 py-3 transition duration-150 ease-out hover:ease-in cursor-pointer hover:bg-gray-700">
                  <div onClick={toggleAttributeModal} className="flex items-center space-x-2">
                    <span className="text-white">Popup</span>
                  </div>

                </li>
                <li className="bg-[#0fb4e0] px-3 py-3 transition duration-150 ease-out hover:ease-in cursor-pointer hover:bg-gray-700">
                  <div onClick={() => setCustomerModal(true)} className="flex items-center space-x-2">
                    <SlUser />
                    <span className="text-white">Add Customer</span>
                  </div>

                </li>
                <li className="bg-[#0fb4e0] px-3 py-3 hover:bg-gray-700">
                  <span className="cursor-pointer flex items-center gap-1.5">
                    <div onClick={handleLogOut} className="flex items-center space-x-2">
                      <MdLogout />
                      <span className="text-white">Logout</span>
                    </div>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {customerModal && <CustomerModal />}

      {attributeModal &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-6">
          <div className="bg-white rounded-lg p-6 w-[100%] max-w-[1100px] min-h-80 transition-transform duration-300 translate-x-0">
         
            <section className="relative ">
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

              <div className="w-full mx-auto max-h-[500px] overflow-y-auto lg:max-h-[800] lg:overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto max-md:px-2 ">
                  <div className="img">
                    <div className="img-box w-full md:w-96 lg:w-full h-full">
                      <img
                        src="https://alchemix.co/wp-content/uploads/2024/04/Untitled-design-46.png"
                        alt=" "
                        className="h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="data w-full xl:justify-start justify-start flex">
                    <div className="data w-full">

                      <h2 className="font-manrope text-[22px] md:text-[28px] lg:text-[28px] leading-10 text-gray-900 mb-2 capitalize">
                        Premium Cocktail Syrups | 3 Pack
                      </h2>
                      <div className="flex flex-col sm:flex-row mb-2">
                        <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                          $220
                        </h6>

                      </div>
                      <p className="text-gray-500 text-base font-normal mb-10">
                      Introducing our vibrant Basic Yellow Tropical Printed Shirt - a celebration of style and sunshine! Embrace the essence of summer wherever you go with this eye-catching piece that effortlessly blends comfort and tropical flair.
                      </p>

                      <form className="mx-auto">
                        <label
                          htmlFor="countries"
                          className="text-base block mb-2 text-gray-900 dark:text-white"
                        >
                          Flavor
                        </label>
                        <select
                          id="countries"
                          className="mb-4 text-base bg-gray-50 border border-gray-300 text-gray-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                         <option selected="">Choose an option</option>
                          <option value="US">Option One</option>
                          <option value="CA">Option Two</option>
                          <option value="FR">Option Three</option>
                          <option value="DE">Option Four</option>
                        </select>

                        <label
                          htmlFor="countries"
                          className="text-base block mb-2 text-gray-900 dark:text-white"
                        >
                          Flavor (2)
                        </label>
                        <select
                          id="countries"
                          className="mb-4 text-base bg-gray-50 border border-gray-300 text-gray-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option selected="">Choose an option</option>
                          <option value="US">Option One</option>
                          <option value="CA">Option Two</option>
                          <option value="FR">Option Three</option>
                          <option value="DE">Option Four</option>
                        </select>

                        <label
                          htmlFor="countries"
                          className="text-base block mb-2 text-gray-900 dark:text-white"
                        >
                          Flavor (3)
                        </label>
                        <select
                          id="countries"
                          className="text-base bg-gray-50 border border-gray-300 text-gray-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option selected="">Choose an option</option>
                          <option value="US">Option One</option>
                          <option value="CA">Option Two</option>
                          <option value="FR">Option Three</option>
                          <option value="DE">Option Four</option>
                        </select>
                      </form>


                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 gap-3">

                        <div className="mt-4 flex items-center">

                          <div className="flex">
                            <button className="bg-gray-300 text-gray-700 rounded-l px-3 py-1">
                              -
                            </button>
                            <input
                              type="number"
                              readOnly
                              className="w-12 text-center border-t border-b border-gray-300"
                              value={1}
                            />
                            <button className="bg-gray-300 text-gray-700 rounded-r px-3 py-1">
                              +
                            </button>
                          </div>
                          <button className="ml-4 bg-[#3498db] text-white rounded px-3 py-1 w-full">Add to Cart</button>
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
      }





    </>

  );
}

export default Header;
