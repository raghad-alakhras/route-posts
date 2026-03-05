import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema } from '../../schema/ChangePasswordSchema';
import ErrorMessage from '../../components/ErrorMessage'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { authContext } from '../../context/AuthContext';

export default function Settings() {
  const {register,handleSubmit,formState: {errors}} = useForm({
     resolver: zodResolver(changePasswordSchema)})
  const {setLogin} = useContext(authContext)
  const {isPending,data,mutate}= useMutation({mutationFn:changeUserPassword,
    onSuccess: (data)=>{
      localStorage.setItem('token',data?.data?.data?.token)
      setLogin(data?.data?.data?.token);
    }
  })   

  function handleChangePassword({rePassword, ...data}){
     
     mutate(data)
  }

  function changeUserPassword(data){
    return axios.patch(`https://route-posts.routemisr.com/users/change-password`, data, {
      headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }


  return (
    <div className='bg-white shadow-lg shadow-gray-300 rounded-2xl mt-30 w-1/2 mx-auto p-5'>
      <div className="flex items-center gap-3 mb-7">
        <div className="size-15 rounded-full flex items-center justify-center bg-blue-100/40 text-blue-400">
        <i className='fa-solid fa-lock'></i>
        </div>
        <div>
          <p className='font-black text-lg mb-1'>Change Password</p>
          <p className='text-gray-500 text-sm'>Keep your account secure by using a strong password.</p>
        </div>
      </div>
      
                <form onSubmit={handleSubmit(handleChangePassword)}>
                  <div className="mb-6">
                    <div className="relative mt-2">
                      <input
                        type="password"
                        {...register("password")}
                        id="password"
                        className=" bg-gray-100 p-3 px-8 rounded-lg border border-gray-200 w-full text-sm outline-none focus:border-blue-900 focus:bg-white placeholder:text-gray-500 placeholder:text-md"
                        placeholder="Enter current password"
                      />
                      <i className="fa-solid fa-lock text-md text-gray-400 absolute top-1/2 left-2 -translate-y-1/2"></i>
                    </div>
                  </div>
                  {errors.password && <ErrorMessage msg={errors.password?.message} />}
                  <div className="mb-6">
                    <div className="relative mt-2">
                      <input
                        type="password"
                        {...register("newPassword")}
                        id="newPassword"
                        className=" bg-gray-100 p-3 px-8 rounded-lg border border-gray-200 w-full text-sm outline-none focus:border-blue-900 focus:bg-white placeholder:text-gray-500 placeholder:text-md"
                        placeholder="Enter new password"
                      />
                      <i className="fa-solid fa-lock text-md text-gray-400 absolute top-1/2 left-2 -translate-y-1/2"></i>
                    </div>
                  </div>
                  {errors.newPassword && (
                    <ErrorMessage msg={errors.newPassword?.message} />
                  )}
                  <div className="mb-6">
                    <div className="relative mt-2">
                      <input
                        type="password"
                         {...register("rePassword")}
                        id="rePassword"
                        className=" bg-gray-100 p-3 px-8 rounded-lg border border-gray-200 w-full text-sm outline-none focus:border-blue-900 focus:bg-white placeholder:text-gray-500 placeholder:text-md"
                        placeholder="Re-enter new password"
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
                      Update Password
                    </button>
                  )}
                  {/* <ErrorMessage msg={error?.response?.data?.message}/> */}
                </form>
    </div>
  )
}
