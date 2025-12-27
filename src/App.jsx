import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  if (!token) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <ToastContainer />
        <Login setToken={setToken} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      <NavBar setToken={setToken} />
      <hr />

      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1 mx-8 my-8 text-gray-700 text-base">
          <Routes>
            {/* Default route */}
            <Route path="/" element={<Navigate to="/add" />} />

            <Route path="/add" element={<Add token={token} />} />
            <Route path="/list" element={<List />} />
            <Route path="/order" element={<Orders token={token} />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/add" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
