import React, { useContext, useState } from "react";
import { signISchema } from "../../schema/Signin.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ErrorMessage from "../../components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import AboutRoute from "../../components/AboutRoute/AboutRoute";

export default function Login() {
  const navigate = useNavigate();
  const { isLogin, setLogin } = useContext(authContext);
  // collecting data
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({
    resolver: zodResolver(signISchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

//handle api call
  const { mutate, data, isPending } = useMutation({
    mutationFn: submitLogin,
    onSuccess: (data) => {
      localStorage.setItem("token", data?.data?.data?.token);
      setLogin(data?.data?.data?.token);
      navigate("/");
    } 
  });
 
  function handleSignin(formData) {
    mutate(formData);
  }

  function submitLogin(formData) {
    return axios.post(
      `https://route-posts.routemisr.com/users/signin`,
      formData,
    );
  }

  return (
    <div className="lg:flex h-screen lg:items-center">
      <div className="lg:w-1/2 ">
        <AboutRoute />
      </div>
      {/* login form */}
      <div className="w-full sm:w-3/4 lg:w-1/3 mx-auto ">
        <section className="bg-white w-full rounded-xl order-1  mx-auto p-6 ">
          <div className="p-1 flex justify-between items-center bg-blue-50/70 rounded-md gap-2">
            <Link
              to="/login"
              className="bg-white py-2 block w-1/2 rounded-md text-blue-900 text-center border-0 font-bold text-sm"
            >
              <button>Login</button>
            </Link>
            <Link
              to="/signup"
              className=" py-2 block w-1/2 rounded-md text-gray-600 text-center border-0 font-bold text-sm hover:text-gray-800 transition-all duration-500"
            >
              <button>Register</button>
            </Link>
          </div>
          <h5 className="mt-2 font-black">Log in to Route Posts</h5>
          <p className="text-gray-500 mb-5 font-semibold text-xs mt-1">
            Log in and continue your social journey.
          </p>
          <form onSubmit={handleSubmit(handleSignin)}>
            <div className="mb-4">
              <div className="relative mt-2">
                {errors.email ? (
                  <input
                    type="email"
                    {...register("email")}
                    id="email"
                    className=" bg-gray-100 p-3 px-8 rounded-lg border border-red-500 w-full text-sm outline-none focus:border-blue-900 focus:bg-white placeholder:text-gray-500 placeholder:text-md"
                    placeholder="email or username"
                  />
                ) : (
                  <input
                    type="email"
                    {...register("email")}
                    id="email"
                    className=" bg-gray-100 p-3 px-8 rounded-lg border border-gray-200 w-full text-sm outline-none focus:border-blue-900 focus:bg-white placeholder:text-gray-500 placeholder:text-md"
                    placeholder="email or username"
                  />
                )}
                <i className="fa-regular fa-user text-md text-gray-400 absolute top-1/2 left-2 -translate-y-1/2"></i>
              </div>
            </div>
            {errors.email && <ErrorMessage msg={errors.email?.message} />}

            <div className="mb-4">
              <div className="relative mt-2">
                {errors.password ? (
                  <input
                    type="password"
                    {...register("password")}
                    id="password"
                    className=" bg-gray-100 p-3 px-8 rounded-lg border border-red-500 w-full text-sm outline-none focus:border-blue-900 focus:bg-white placeholder:text-gray-500 placeholder:text-md"
                    placeholder="password"
                  />
                ) : (
                  <input
                    type="password"
                    {...register("password")}
                    id="password"
                    className=" bg-gray-100 p-3 px-8 rounded-lg border border-gray-200 w-full text-sm outline-none focus:border-blue-900 focus:bg-white placeholder:text-gray-500 placeholder:text-md"
                    placeholder="Create a strong password"
                  />
                )}
                <i className="fa-solid fa-lock text-md text-gray-400 absolute top-1/2 left-2 -translate-y-1/2"></i>
              </div>
            </div>
            {errors.password && <ErrorMessage msg={errors.password?.message} />}

          {isPending ?  <button
                type="submit"
                className="text-white font-bold w-full py-3 rounded-2xl my-5 bg-blue-900/50  focus:outline-none"
              >
                Please wait ... <i className="fa-solid fa-spin fa-spinner text-white text-sm"></i>
              </button> : 
              <button
                type="submit"
                className="text-white font-bold w-full py-3 rounded-2xl my-5 bg-blue-900  focus:outline-none"
              >
                Log In
              </button>}
            <p className="text-blue-950 text-center cursor-pointer">
              Forgot password?
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
