import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductCreate from "./components/ProductCreate";
import ProductCardCantainer from "./components/ProductCardCantainer.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import AuthForm from "./components/AuthForm.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import UserProvider from "./components/UserProvider.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Cart from "./components/Cart.jsx";
import Upload from "./components/Upload.jsx";
const domain = import.meta.env.VITE_DOMAIN;
const clientId = import.meta.env.VITE_CLIENTID;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ProductCardCantainer />,
      },
      {
        path: "/add",
        element: <ProductCreate />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/edit/:id",
        element: <ProductCreate />,
      },
      {
        path: "/login",
        element: <AuthForm />,
      },
      {
        path: "/signUp",
        element: <AuthForm />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      { path: "/upload", element: <Upload /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
