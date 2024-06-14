import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  addData,
  fetchProductData,
  updatedProduct,
} from "../features/product/productDataSlice";
import {
  Navigate,
  useFormAction,
  useNavigate,
  useParams,
} from "react-router-dom";
import { clearMsg, setMessage } from "../features/message/messageSlice";

export default function ProductCreate() {
  // const msg = useSelector((state) => state.flashMessage.message);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange", // or "all" for validation on all events
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.Products.product);
  const user = useSelector((state) => state.user.user);
  const { id } = useParams();

  useEffect(() => {
    if (id && product) {
      reset(product);
    } else {
      reset({
        name: "",
        description: "",
        imageUrl: "",
        price: "",
        category: "",
      });
    }
  }, [product, id, reset]);

  const onsubmit = async (data) => {
    // console.log(data);
    try {
      if (id) {
        try {
          await dispatch(updatedProduct({ id, product: data })).unwrap();
          navigate(`/product/${id}`);
          dispatch(setMessage("Product Details Updated"));
        } catch (error) {
          dispatch(setMessage(error || "error in edition"));
        }
      } else {
        await dispatch(addData(data)).unwrap();
        await dispatch(fetchProductData()).unwrap();
        navigate("/");
        dispatch(setMessage("New Product Added"));
      }
    } catch (error) {
      console.log("error orrured");
      dispatch(setMessage(error));
    } finally {
      setTimeout(() => {
        dispatch(clearMsg());
      }, 3000);
    }
  };
  return (
    <div className="flex justify-center  items-center p-4 mt-10 ">
      <form
        action=""
        className="w-2/4 "
        onSubmit={handleSubmit(onsubmit)}
        noValidate
        
      >
        <h1 className="p-2 text-lg text-center">{id ? "Edit" : "Create"}</h1>
        <div className="mb-4">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className={`w-full  p-2 rounded-lg border-2 border-gray-400 bg-slate-200 ${
              errors.name ? "border-2 border-red-700 " : ""
            }`}
            placeholder="Enter title"
            // onChange={handleinputChange}
            {...register("name", {
              required: {
                value: true,
                message: "Title is required",
              },
            })}
            required
          />
          {errors.name && <p className="text-red-700">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="Description">Description</label>
          <input
            type="text"
            id="Description"
            {...register("description", {
              required: {
                value: true,
                message: "Description is required",
              },
              minLength: {
                value: 30,
                message: "description is too short",
              },
            })}
            // value={productData.description}
            className={`w-full  p-2 rounded-lg bg-slate-200 ${
              errors.name ? "border-2 border-red-700 " : ""
            }`}
            placeholder="Enter description"
            // onChange={handleinputChange}
            required
          />
          {errors.description && (
            <p className="text-red-700">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="imgage">imgageUrl</label>
          <input
            type="text"
            id="imgage"
            {...register("imageUrl", {
              required: {
                value: true,
                message: "Please enter img url",
              },
            })}
            className={`w-full  p-2 rounded-lg bg-slate-200 ${
              errors.name ? "border-2 border-red-700 " : ""
            }`}
            placeholder="Enter imgUrl"
            // onChange={handleinputChange}
            required
          />
          {errors.imageUrl && (
            <p className="text-red-700">{errors.imageUrl.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            {...register("price", {
              required: {
                value: true,
                message: "Price is required",
              },
              min: {
                value: 1,
                message: "Price can't be less than 1",
              },
            })}
            className={`w-full  p-2 rounded-lg bg-slate-200 ${
              errors.name ? "border-2 border-red-700 " : ""
            }`}
            placeholder="Enter price"
            // onChange={handleinputChange}
            required
          />
          {errors.price && (
            <p className="text-red-700">{errors.price.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="Category">Category</label>
          <input
            type="text"
            id="Category"
            {...register("category", {
              required: {
                value: true,
                message: "Please fill the category",
              },
            })}
            className={`w-full  p-2 rounded-lg bg-slate-200 ${
              errors.name ? "border-2 border-red-700 " : ""
            }`}
            placeholder="Enter category"
            // onChange={handleinputChange}
            required
          />
          {errors.category && (
            <p className="text-red-700">{errors.category.message}</p>
          )}
        </div>

        <div className="text-center ">
          <button className="w-2/3 bg-slate-200 p-2 text-center rounded-lg hover:bg-gray-400">
            {id ? "Edit" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
