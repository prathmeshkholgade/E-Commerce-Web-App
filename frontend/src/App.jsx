import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Body from "./components/Body";
import "./index.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";
import Message from "./components/Message";
import { fetchUser } from "./features/user/userSlice";

function App() {
  return (
    <>
   
        <Header />
        <Message />
        <Outlet />
      {/* </Provider> */}
    </>
  );
}

export default App;
