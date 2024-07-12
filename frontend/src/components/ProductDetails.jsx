import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  addtocart,
  deleteProduct,
  fetchSingleProduct,
} from "../features/product/productDataSlice";
import { clearMsg, setMessage } from "../features/message/messageSlice";
import { fetchUser } from "../features/user/userSlice";

export default function ProductDetails() {
  const user = useSelector((state) => state.user.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.Products.product);
  const error = useSelector((state) => state.Products.error);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id, dispatch]);

  const handleCart = async (id) => {
    try {
      const res = await dispatch(addtocart({ id })).unwrap();
      dispatch(fetchUser());
      dispatch(setMessage(res.message));
      console.log(res);
    } catch (error) {
      dispatch(setMessage(error || "some error occured"));
      if (error === "you must be logged in") {
        navigate("/login");
      }
    } finally {
      setTimeout(() => {
        dispatch(clearMsg());
      }, 3000);
    }
  };
  const handleProductDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(setMessage("Product is Deleted"));
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(setMessage(error || "You are not the owner of this product"));
    } finally {
      setTimeout(() => {
        dispatch(clearMsg());
      }, 3000);
    }
  };
  return (
    <>
      {product ? (
        <div className="  mt-4 flex justify-center ">
          <div className="w-2/3 flex flex-wrap">
            <div className="p-4">
              <img
                src={product.imageUrl?.url}
                alt=""
                className="w-96 h-96 object-cover"
              />
            </div>
            <div className="p-4 mt-4 w-[34rem]">
              <p>
                owned by{" "}
                <span className="font-bold">{product.owner.username}</span>{" "}
              </p>
              <p className="text-lg font-semibold py-2">{product.name}</p>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <div className="mt-5">
                <button
                  className="bg-green-400 px-2 py-1 rounded-lg"
                  onClick={() => handleCart(product._id)}
                >
                  AddToCart
                </button>
              </div>
              {user && user._id === product.owner._id && (
                <div className="btns mt-10">
                  <button
                    onClick={() => handleProductDelete(product._id)}
                    className="bg-red-500 px-2 py-1 rounded-lg mr-4"
                  >
                    Delete
                  </button>
                  <NavLink to={`/edit/${product._id}`}>
                    {" "}
                    <button className=" px-2 py-1 rounded-lg bg-green-400 mr-4">
                      Edit
                    </button>{" "}
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <> {error ? <h1>No Product Found As such</h1> : <p>loading</p>} </>
      )}
    </>
  );
}
