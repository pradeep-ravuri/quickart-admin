import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const NavBar = ({ setToken }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/"); // redirect to admin login
  };

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[max(11%,80px)]" src={assets.logo} alt="Admin Logo" />

      <button
        onClick={logoutHandler}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
