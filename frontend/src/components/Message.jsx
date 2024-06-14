import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMsg } from "../features/message/messageSlice";

export default function Message() {
  const msg = useSelector((state) => state.flashMessage.message);
  const dispatch = useDispatch();
  const handleClearMsg = () => {
    dispatch(clearMsg());
  };

  return (
    <>
      {msg && (
        <div className="flex justify-center items-center mt-4">
          <div
            className={`flex justify-between items-center rounded-lg w-1/3 ${
              msg === "Product is Deleted"
                ? "bg-red-400 text-white"
                : "bg-green-300"
            }`}
          >
            <div>
              <p className="text-lg py-2 pl-10   tracking-normal">{msg}</p>
            </div>
            <div className="px-4" onClick={handleClearMsg}>
              <p className="text-2xl hover:text-3xl hover:opacity-80">
                {" "}
                <i className="fa-solid fa-circle-xmark"></i>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
