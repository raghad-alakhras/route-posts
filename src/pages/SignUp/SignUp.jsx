import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schema/Register.schema";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { authContext } from "../../context/AuthContext";
import AboutRoute from "../../components/AboutRoute/AboutRoute";

export default function SignUp() {
  const {setLogin} = useContext(authContext);
  const navigate = useNavigate();
// collect signup data
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });

// handle api call
  const { data, mutate, isPending } = useMutation({
    mutationFn: submitSignUp,
    onSuccess: (data) => {
      localStorage.setItem("token", data?.data?.data?.token);
      setLogin(data?.data?.data?.token);
      toast.success('user created successfully')
      setTimeout(() => {
        navigate("/");
      }, 1000);
      
    }, 
    onError: (error)=>{
    if(error?.response?.status === 409){
      toast.error('user already exist');
    }}
    }
   
  );


  function handleSignup(formData) {
    mutate(formData);
  }
  function submitSignUp(formData) {
     const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://route-posts.routemisr.com';
    return axios.post(
      `${apiUrl}/users/signup`,
      formData,
    );
  }

  return (
    <>
      <div className="lg:flex min-h-screen lg:justify-between">
        <div className="lg:w-1/2 ">
          <AboutRoute />
        </div>
         {/* signup form */}
        <section className="bg-white w-full sm:w-3/4 lg:w-1/3 rounded-xl order-1 my-7 mx-auto p-6 ">
          <div className="p-1 flex justify-between items-center bg-blue-50/70 rounded-md gap-2">
            <Link
              to="/login"
              className=" py-2 block w-1/2 rounded-md text-gray-600 text-center border-0 font-bold text-sm hover:text-gray-800 transition-all duration-500"
            >
              <button>Login</button>
            </Link>
            <Link
              to="/signup"
              className="bg-white py-2 block w-1/2 rounded-md text-blue-900 text-center border-0 font-bold text-sm"
            >
              <button>Register</button>
            </Link>
          </div>
          <h5 className="mt-2 font-black">Create a new account</h5>
          <p className="text-gray-500 mb-5 font-semibold text-xs mt-1">
            It is quick and easy.
          </p>

          <form onSubmit={handleSubmit(handleSignup)}>
            <div className="mb-6">
              <div className="relative mt-2">
                <input
                  type="text"
                  {...register("name")}
                  id="name"
                  className=" bg-gray-100 p-3 px-8 rounded-lg border border-gray-200 w-full text-sm outline-none focus:border-blue-900 focus:bg-white placeholder:text-gray-500 placeholder:text-md"
                  placeholder="Full name "
                />
                <i className="fa-regular fa-user text-md text-gray-400 absolute top-1/2 left-2 -translate-y-1/2"></i>
              </div>
            </div>
            {errors.name && <ErrorMessage msg={errors.name?.message} />}
            <div className="mb-6">
              <div className="relative mt-2">
                <input
                  type="text"
                  {...register("username")}
                  id="username"
                  className=" bg-gray-100 p-3 px-8 rounded-lg border border-gray-200 w-full text-sm outline-none focus:border-blue-400 placeholder:text-gray-500 placeholder:text-md"
                  placeholder="Username (Optional) "
                />
                <i className="fa-regular fa-user text-md text-gray-400 absolute top-1/2 left-2 -translate-y-1/2"></i>
              </div>
            </div>
            {errors.username && <ErrorMessage msg={errors.username?.message} />}

            <div className="mb-6">
              <div className="relative mt-2">
                <input
                  type="email"
                  {...register("email")}
                  id="email"
                  className=" bg-gray-100 p-3 px-8 rounded-lg border border-gray-200 w-full text-sm outline-none focus:border-blue-900 focus:bg-white placeholder:text-gray-500 placeholder:text-md"
                  placeholder="Email address"
                />
                <i className="fa-solid fa-envelope text-md text-gray-400 absolute top-1/2 left-2 -translate-y-1/2"></i>
              </div>
            </div>
            {errors.email && <ErrorMessage msg={errors.email?.message} />}
            <div className="mb-6">
              <div className="relative mt-2">
                <select
                  {...register("gender")}
                  id="gender"
                  className=" bg-gray-100 p-3 px-8 rounded-lg border border-gray-200 w-full text-sm outline-none focus:border-blue-900 focus:bg-white placeholder:text-gray-500 placeholder:text-md"
                >
                  <option
                    value=""
                    className="px-5 text-gray-900"
                    defaultValue={true}
                  >
                    Select gender
                  </option>
                  <option value="male" className="px-5 text-gray-900">
                    Male
                  </option>
                  <option value="female" className="px-5 text-gray-900">
                    Female
                  </option>
                </select>
                <i className="fa-regular fa-user text-md text-gray-400 absolute top-1/2 left-2 -translate-y-1/2"></i>
              </div>
            </div>
            {errors.gender && <ErrorMessage msg={errors.gender?.message} />}
            <div className="mb-6">
              <div className="relative mt-2">
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  id="dateOfBirth"
                  className=" bg-gray-100 p-3 px-8 rounded-lg border border-gray-200 w-full text-sm outline-none focus:border-blue-900 focus:bg-white placeholder:text-gray-500 placeholder:text-md"
                  placeholder="Confirm your password"
                />
                <i className="fa-regular fa-calendar text-md text-gray-400 absolute top-1/2 left-2 -translate-y-1/2"></i>
              </div>
            </div>
            {errors.dateOfBirth && (
              <ErrorMessage msg={errors.dateOfBirth?.message} />
            )}
            <div className="mb-6">
              <div className="relative mt-2">
                <input
                  type="password"
                  {...register("password")}
                  id="password"
                  className=" bg-gray-100 p-3 px-8 rounded-lg border border-gray-200 w-full text-sm outline-none focus:border-blue-900 focus:bg-white placeholder:text-gray-500 placeholder:text-md"
                  placeholder="Password"
                />
                <i className="fa-solid fa-lock text-md text-gray-400 absolute top-1/2 left-2 -translate-y-1/2"></i>
              </div>
            </div>
            {errors.password && <ErrorMessage msg={errors.password?.message} />}
            <div className="mb-6">
              <div className="relative mt-2">
                <input
                  type="password"
                  {...register("rePassword")}
                  id="rePassword"
                  className=" bg-gray-100 p-3 px-8 rounded-lg border border-gray-200 w-full text-sm outline-none focus:border-blue-900 focus:bg-white placeholder:text-gray-500 placeholder:text-md"
                  placeholder="Confirm password"
                />
                <i className="fa-solid fa-lock text-md text-gray-400 absolute top-1/2 left-2 -translate-y-1/2"></i>
              </div>
            </div>
            {errors.rePassword && (
              <ErrorMessage msg={errors.rePassword?.message} />
            )}

            {isPending ? (
              <button
                type="submit"
                className="text-white font-bold w-full py-3 rounded-2xl my-5 bg-blue-900/50 focus:outline-none"
              >
                please await ... <i className="fa-solid fa-spin fa-spinner text-white text-sm"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="text-white font-bold w-full py-3 rounded-2xl my-5 bg-blue-900 hover:bg-blue-950  focus:outline-none"
              >
                Create New Account
              </button>
            )}
            {/* <ErrorMessage msg={error?.response?.data?.message}/> */}
          </form>
        </section>
      </div>
    </>
  );
}
