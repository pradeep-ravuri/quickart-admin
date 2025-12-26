import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!images.some((img) => img)) {
      toast.error("Please upload at least one image");
      return;
    }

    if (sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("price", Number(price));
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller.toString());
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((img, index) => {
        if (img) formData.append(`image${index + 1}`, img);
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: { token }, // ❗ DO NOT set Content-Type manually
        }
      );

      if (response.data.success) {
        toast.success("Product added successfully");
        setName("");
        setDescription("");
        setPrice("");
        setImages([null, null, null, null]);
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-4"
    >
      {/* Images */}
      <div className="grid grid-cols-2 gap-6">
        {images.map((img, index) => (
          <label key={index}>
            <img
              className="w-20 cursor-pointer"
              src={img ? URL.createObjectURL(img) : assets.upload_area}
              alt="Upload"
            />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setImages((prev) => {
                  const copy = [...prev];
                  copy[index] = e.target.files[0];
                  return copy;
                })
              }
            />
          </label>
        ))}
      </div>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        className="w-full max-w-md px-3 py-2 border"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Product Description"
        className="w-full max-w-md px-3 py-2 border"
        required
      />

      <div className="flex gap-4">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Men</option>
          <option>Women</option>
          <option>Kids</option>
        </select>

        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        >
          <option>Topwear</option>
          <option>Bottomwear</option>
          <option>Winterwear</option>
        </select>

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border px-2"
          required
        />
      </div>

      <div className="flex gap-2">
        {["S", "M", "L", "XL", "XXL"].map((size) => (
          <button
            type="button"
            key={size}
            onClick={() => toggleSize(size)}
            className={`px-3 py-1 border ${
              sizes.includes(size) ? "bg-black text-white" : ""
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
        />
        Bestseller
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-6 py-2 mt-3 disabled:opacity-50"
      >
        {loading ? "Adding..." : "ADD PRODUCT"}
      </button>
    </form>
  );
};

export default Add;
