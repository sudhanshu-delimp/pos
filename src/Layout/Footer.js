import React from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/authSlice";

function Footer() {
  const dispatch = useDispatch();


  return (
    <footer className="bg-gray-800 text-white p-4 fixed bottom-0 w-full z-40">
      <div className="container mx-auto">
        <p className="text-center">© 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>

  );
}

export default Footer;
