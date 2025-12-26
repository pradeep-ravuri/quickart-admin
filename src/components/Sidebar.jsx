import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l transition
     ${isActive ? "bg-gray-200 text-black font-medium" : "text-gray-700"}`;

  return (
    <div className="w-[18%] min-h-screen border-r-2 hidden sm:block">
      <div className="flex flex-col gap-4 pt-6 pl-[15%] text-[15px]">
        <NavLink to="/add" className={linkClasses}>
          <img className="w-5 h-5" src={assets.add_icon} alt="Add" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to="/list" className={linkClasses}>
          <img className="w-5 h-5" src={assets.list_icon} alt="List" />
          <p>List Items</p>
        </NavLink>

        <NavLink to="/order" className={linkClasses}>
          <img className="w-5 h-5" src={assets.order_icon} alt="Orders" />
          <p>Order Items</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
