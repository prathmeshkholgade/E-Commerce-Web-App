import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartItems } from "../features/product/productDataSlice";
import CartItem from "./CartItem";

export default function Cart() {
  const cartData = useSelector((state) => state?.Products?.cartItems?.cart);
  console.log(cartData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartItems());
  }, []);

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <h1>your items</h1>
        {cartData &&
          cartData.map((item) => (
            <CartItem key={item._id} item={item.product} />
          ))}
      </div>
    </>
  );
  
}
