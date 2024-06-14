import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../features/user/userSlice";
import { clearMsg, setMessage } from "../features/message/messageSlice";

export default function Header() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addtocart = () => {};

  const logouthandle = () => {
    dispatch(logOut());
    dispatch(setMessage("logged out"));
    navigate("/");

    setTimeout(() => {
      dispatch(clearMsg());
    }, 3000);
  };
  return (
    <>
      <div className="flex bg-gray-200 justify-between py-2 flex-wrap">
        <h1 className="p-2 ml-8 text-xl">E-shop</h1>
        <ul className="flex mr-24 w-96 justify-evenly">
          <NavLink to={"/"}>
            {" "}
            <li className="p-2 text-lg ">Home</li>
          </NavLink>
          <NavLink to={"cart"}>
            <li className="p-2 text-lg" onClick={addtocart}>
              Cart
            </li>
          </NavLink>
          {user && (
            <NavLink to={"/add"}>
              {" "}
              <li className="p-2 text-lg">Create</li>
            </NavLink>
          )}

          {user ? (
            <li
              className="p-2 text-lg hover:bg-gray-400 rounded-lg"
              onClick={logouthandle}
            >
              Logout
            </li>
          ) : (
            <>
              <NavLink to={"/login"}>
                <li className="p-2 text-lg">Login</li>
              </NavLink>
              <NavLink to={"/signUp"}>
                <li className="p-2 text-lg">SignUp</li>
              </NavLink>{" "}
            </>
          )}
        </ul>
      </div>
    </>
  );
}
