import React, { useContext, useRef, useState } from "react";
import { useCart } from "react-use-cart";
import CustomerModal from "../Pages/Customer/CustomerModal";
import { AppContext } from "../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/authSlice";
import { MdLogout } from "react-icons/md";
import { SlUser } from "react-icons/sl";


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
                <span onClick={() => setCustomerModal(true)} className="flex cursor-pointer ms-2 md:me-24">
                  <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white text-white">
                    {`${customer.first_name} ${customer.last_name}`}
                  </span>
                </span>
              }
            </div>

            <div className="flex items-center text-white">
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 gap-4">
                <li className="bg-[#3498db] rounded px-3 py-3 cursor-pointer">
                  <div onClick={() => setCustomerModal(true)} className="flex items-center space-x-2 flex-col gap-1">
                    <SlUser />
                    <span className="text-white">Add User</span>
                  </div>

                </li>
                <li className="bg-[#3498db] rounded px-3 py-3">
                  <span className="cursor-pointer flex items-center gap-1.5">
                    <div onClick={handleLogOut} className="flex items-center space-x-2 flex-col gap-1">
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
