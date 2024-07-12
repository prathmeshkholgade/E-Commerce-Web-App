import React from "react";

export default function CartItem({ item }) {
  return (
    <div className="flex p-2 w-2/4 bg-gray-200 m-2">
      <div className="p-2">
        <img
          src={item.imageUrl?.url}
          className="w-32 h-32  object-cover"
          alt=""
        />
      </div>
      <div className="py-2">
        <p>{item.name}</p>
        <p>{item.description}</p>
        <p>{item.price}</p>
      </div>
    </div>
  );
}
