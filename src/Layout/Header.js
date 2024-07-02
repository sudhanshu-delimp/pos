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

  const handleLogOut = () => {
    emptyCart();
    dispatch(logout());
  }


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
                  <span className="flex items-center gap-2 self-center text-sm font-semibold sm:text-xs whitespace-nowrap dark:text-white text-white capitalize font-normal">
                  <FiMapPin />
                  47 W 13th St, New York, NY 10011, USA
                  </span>
                </span>
              }
            </div>

            <div className="flex items-center text-white">
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 gap-4">
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
    </>

  );
}

export default Header;
