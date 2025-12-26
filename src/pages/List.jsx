import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const List = () => {
  const [list, setList] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Admin authentication required");
      return;
    }

    setDeletingId(id);

    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product removed");
        setList((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(response.data.message);
        fetchList();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
      fetchList();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <p className="mb-3 font-medium">All Products</p>

      <div className="flex flex-col gap-2">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm font-medium">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {list.length === 0 && (
          <p className="text-gray-500 text-sm py-6 text-center">
            No products found
          </p>
        )}

        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border text-sm"
          >
            <img
              className="w-12 h-12 object-cover"
              src={item.images?.[0] || assets.upload_area}
              alt={item.name}
            />

            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>

            <button
              disabled={deletingId === item._id}
              onClick={() => removeProduct(item._id)}
              className="text-red-600 hover:text-red-800 text-center disabled:opacity-50"
            >
              {deletingId === item._id ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
