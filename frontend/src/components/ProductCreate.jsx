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
    formState: { errors, isSubmitting },
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

  const setdata = async (data) => {
    const datas = new FormData();
    datas.append("name", data.name);
    datas.append("description", data.description);
    datas.append("price", data.price);
    if (data.imageUrl[0]) {
      datas.append("imageUrl", data.imageUrl[0]);
    }
    datas.append("category", data.category);
    return datas;
  };

  const onsubmit = async (data) => {
    try {
      if (id) {
        try {
          const productData = await setdata(data);
          const res = await dispatch(
            updatedProduct({ id, product: productData })
          ).unwrap();
          navigate(`/product/${id}`);
          dispatch(setMessage("Product Details Updated"));
        } catch (error) {
          dispatch(setMessage(error || "error in edition"));
        }
      } else {
        let productData = await setdata(data);
        console.log(productData);
        await dispatch(addData(productData)).unwrap();
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
        encType="multipart/form-data"
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
            className={`w-full  p-2 rounded-lg bg-slate-200 ${
              errors.name ? "border-2 border-red-700 " : ""
            }`}
            placeholder="Enter description"
            required
          />
          {errors.description && (
            <p className="text-red-700">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="imgage">Upload Product Image</label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            accept="image/"
            {...register("imageUrl", {
              required: {
                value: id ? false : true,
                message: "Please enter img url",
              },
            })}
            className={`w-full  p-2 rounded-lg bg-slate-200 ${
              errors.name ? "border-2 border-red-700 " : ""
            }`}
            placeholder="Enter imgUrl"
          />
          {errors.imageUrl && (
            <p className="text-red-700">{errors.imageUrl.message}</p>
          )}
        </div>

        {id && product && (
          <div>
            <h2>old image</h2>
            <img src={product.imageUrl?.url} className="w-40 h-40 object-cover" alt="" />
          </div>
        )}

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
            required
          />
          {errors.category && (
            <p className="text-red-700">{errors.category.message}</p>
          )}
        </div>

        <div className="text-center ">
          <button
            className="w-2/3 bg-slate-200 p-2 text-center rounded-lg hover:bg-gray-400"
            disabled={isSubmitting ? true : false}
          >
            {id ? "Edit" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
