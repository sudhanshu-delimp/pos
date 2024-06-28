import React, { useContext, useEffect, useRef, useState } from "react";
import { useCart } from "react-use-cart";
import { TiCancel } from "react-icons/ti";
import { MdMoreHoriz } from "react-icons/md";
import CustomerModal from "../Pages/Customer/CustomerModal";
import { AppContext } from "../context/AppContext";
import { useDispatch } from "react-redux";
import { saveCustomer } from "../redux/reducers/appSlice";
import { CgMoreVerticalO } from "react-icons/cg";

function Header() {
  const dispatch = useDispatch()
  const { emptyCart } = useCart();
  const dropdownRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { customerModal, setCustomerModal } = useContext(AppContext);

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
  }, []);

  const handleVoidCustomer = () => {
    dispatch(saveCustomer(""));
    emptyCart();

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
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <a href="#" className="flex ms-2 md:me-24">

                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  AppHo sma
                </span>
              </a>
            </div>



            <div className="flex items-center">
              <div className="items-center ms-3 relative">
                <div>
                  <button
                    onClick={toggleDropdown}
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <span className="w-8 h-8 rounded-full text-white text-3xl">
                      <CgMoreVerticalO />
                    </span>

                  </button>
                </div>
                
                {dropdownVisible &&
                <div
                  className="z-50 absolute right-0 transition duration-150-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  
                  <ul className="py-1 w-[180px]" role="none">
                    
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                        role="menuitem"
                      >
                        Create Customer
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                        role="menuitem"
                      >
                        Orders
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
