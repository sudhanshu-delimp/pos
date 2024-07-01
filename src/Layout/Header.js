import React, { useContext, useEffect, useRef, useState } from "react";
import { useCart } from "react-use-cart";
import CustomerModal from "../Pages/Customer/CustomerModal";
import { AppContext } from "../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { saveCustomer } from "../redux/reducers/appSlice";
import { CgMoreVerticalO } from "react-icons/cg";
import { logout } from "../redux/reducers/authSlice";
import { RiUserAddFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { SlUser } from "react-icons/sl";


function Header() {
  const dispatch = useDispatch()
  const { emptyCart } = useCart();
  const { customer } = useSelector((state) => state.app);
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
                    <div onClick={() => dispatch(logout())} className="flex items-center space-x-2 flex-col gap-1">
                      <MdLogout />
                      <span className="text-white">Logout</span>
                    </div>
                  </span>
                </li>
              </ul>

              {/* <div className="items-center ms-3 relative">
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
                        <span
                          onClick={() => setCustomerModal(true)}
                          className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                          role="menuitem"
                        >
                          Create Customer
                        </span>
                      </li>
                     
                      <li>
                        <span
                          onClick={() => dispatch(logout())}
                          className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          role="menuitem"
                        >
                          Sign out
                        </span>
                      </li>
                    </ul>
                  </div>
                }
              </div> */}


            </div>
          </div>
        </div>
      </nav>
      {customerModal && <CustomerModal />}
    </>

  );
}

export default Header;
