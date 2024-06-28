import React from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/authSlice";
import { SiVoidlinux } from "react-icons/si";

function Footer() {
  const dispatch = useDispatch();


  return (
    <footer className="bg-gray-800 text-white p-4 fixed bottom-0 w-full z-40">
                  
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <a
                                href="https://flowbite.com/"
                                className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                            >
                                
                                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                Checkout: $426.15
                                </span>
                            </a>
                            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
                                <li>
                                    <a href="#" className="text-xl me-4 md:me-6 flex items-center	gap-1.5">
                                    <SiVoidlinux /> Void
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
             
                </footer>


  );
}

export default Footer;
