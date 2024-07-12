import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginUser, signupUser } from "../features/user/userSlice";
import { setMessage } from "../features/message/messageSlice";

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    criteriaMode: "all",
  });

  const location = useLocation();
  const signUp = location.pathname === "/signUp";
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userError = useSelector((state) => state.user.error);
  const user = useSelector((state) => state.user.user);
  const rediretUrl = useSelector((state) => state.user?.rediretUrl);
  console.log(rediretUrl);
  console.log(user);

  // useEffect(() => {
  //   if (userError) {
  //     setError("root", {
  //       type: "manual",
  //       message: userError,
  //     });
  //   }
  // }, [userError, setError, dispatch]);

  useEffect(() => {
    if (location.pathname === "/login") {
      reset();
    }
  }, [location.pathname, reset]);

  useEffect(() => {
    if (location.pathname === "/signUp") {
      reset();
    }
  }, [location.pathname, reset]);

  const onsubmit = async (data) => {
    console.log(data);
    try {
      if (signUp) {
        console.log("signup is prosessing");
        await dispatch(signupUser(data)).unwrap();
        dispatch(setMessage("User register successfuly"));
        Navigate("/");
      } else {
        const res = await dispatch(loginUser(data)).unwrap();
        dispatch(setMessage("User login successfuly"));
        Navigate("/");
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error.message || "An error occurred",
      });
      dispatch(setMessage(error || "An error occurred"));
    }
  };

  useEffect(() => {
    dispatch(clearError());
  }, [location.pathname, dispatch]);

  // const onsubmit = async (data) => {
  //   console.log(data);
  //   if (signUp) {
  //     try {
  //       const res = await dispatch(signupUser(data)).unwrap();
  //       dispatch(setMessage("User register successfuly"));
  //       Navigate("/");
  //     } catch (err) {}
  //   } else {
  //     try {
  //       const res = await dispatch(loginUser(data)).unwrap();
  //       dispatch(setMessage("User login successfuly"));
  //       Navigate("/");
  //     } catch (err) {
  //       setError("root", { type: "manual", message: err.message });
  //     }
  //   }
  // };

  return (
    <div className="flex justify-center  h-lvh gap-10 bg-gray-100  ">
      <div className="w-2/6 h-2/3 p-8 mt-20">
        <div>
          <h1 className="text-3xl font-semibold py-4">
            {" "}
            {signUp ? "Create Account" : "Welcome back"}{" "}
          </h1>
          <p className="pb-4 text-lg opacity-60">
            {signUp
              ? "Please fill in the details to create your account."
              : "Welcome back ! please enter your details."}{" "}
          </p>
        </div>
        <div>
          {isSubmitting && <p>Loading...</p>}
          <form onSubmit={handleSubmit(onsubmit)}>
            {signUp && (
              <div className="py-2">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "enter valid email address",
                    },
                  })}
                  id="email"
                  className="w-full py-2 border-2 border-slate-400 placeholder:pl-4 rounded-lg"
                />
                {errors.email && (
                  <p className="text-red-700">{errors.email.message}</p>
                )}
              </div>
            )}

            <div className="py-2">
              <label htmlFor="uername">UserName</label>
              <input
                type="text"
                placeholder="Enter Your UserName"
                {...register("username", {
                  required: {
                    value: true,
                    message: "UserName is required",
                  },
                })}
                id="uername"
                className="w-full py-2 border-2 border-slate-400 placeholder:pl-4 rounded-lg"
              />
              {errors.username && (
                <p className="text-red-700">{errors.username.message}</p>
              )}
            </div>
            <div className="py-2">
              <label htmlFor="Password">Password</label>
              <input
                type="text"
                placeholder="Enter Your Password"
                id="Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "please enter the password",
                  },
                })}
                className="w-full  py-2 border-2 border-slate-400  placeholder:pl-4 rounded-lg"
              />
              {errors.password && (
                <p className="text-red-700">{errors.password.message}</p>
              )}
            </div>
            {errors.root && (
              <div>
                <p className="text-red-700 text-lg">{errors.root.message}</p>
              </div>
            )}
            <div className="btns">
              {!signUp && <h2>Forgot Password</h2>}
              <button className="bg-black my-4 text-white w-full py-2 rounded-lg">
                {" "}
                {signUp ? "Sign up" : "Login"}{" "}
              </button>

              <p>
                {signUp
                  ? "Already have an account? "
                  : "Don't have an account ? "}
                <span>
                  {
                    <span className="font-bold">
                      {signUp ? "Login" : "Sign up"}
                    </span>
                  }
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
