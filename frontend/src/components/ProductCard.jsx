import React from "react";
import { NavLink } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <NavLink to={`/product/${product._id}`}>
      <div className="w-64 p-4 bg-slate-100 hover:bg-gray-200 ">
        <img
          src={product.imageUrl?.url}
          alt=""
          className="w-full h-60 object-cover"
        />
        <div className="flex justify-between w-full  p-2">
          <p className="p-2">
            {product.name} , {product.price}
          </p>
          <span className="p-2  text-2xl rounded-full">+</span>
        </div>
      </div>
    </NavLink>
  );
}
