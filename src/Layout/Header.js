import React, { useContext, useEffect, useRef, useState } from 'react';
import { useCart } from 'react-use-cart';
import { TiCancel } from "react-icons/ti";
import { MdMoreHoriz } from "react-icons/md";
import CustomerModal from '../Pages/Customer/CustomerModal';
import { AppContext } from '../context/AppContext';



function Header() {
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


  return (
    <>
      <div className="box--container m-w-[300px] bg-[#3498db] flex items-center justify-end gap-[5px] p-2">
        <div
          onClick={emptyCart}
          className="max-w-[100px] rounded-[6px] flex flex-col cursor-pointer items-center justify-center gap-[5px] w-[80px] h-[45px] bg-[#ffffffc7]"
        >
          <TiCancel className="text-[20px]" />
          <p>Void</p>
        </div>
        <div
          className="relative max-w-[100px] rounded-[6px] flex flex-col items-center justify-center gap-[5px] w-[80px] h-[45px] bg-[#ffffffc7] cursor-pointer"
          onClick={toggleDropdown}
        >
          <MdMoreHoriz className="text-[20px] cursor-pointer" />
          <p>More</p>
          {dropdownVisible && (
            <div
              ref={dropdownRef}
              className="absolute top-[100%] right-0 mt-2 w-[120px] bg-white border border-gray-300 rounded shadow-lg"
            >
              <div className="flex flex-col">
                <button
                  className=" py-1 hover:bg-gray-100"
                  onClick={() => setCustomerModal(true)}
                >
                  Add Customer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {customerModal &&
        < CustomerModal />
      }
    </>
  )
}

export default Header
