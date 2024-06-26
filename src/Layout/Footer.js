import React from 'react';
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";



function Footer() {
  return (
    <div>
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
  )
}

export default Footer
