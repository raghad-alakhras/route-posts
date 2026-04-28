import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { authContext } from '../../context/AuthContext'

export default function Aside() {
    const {isLogin , setLogin} = useContext(authContext)
    const navigate = useNavigate()


  return (
    <div className='block bg-white rounded-xl h-fit shadow-md shadow-gray-300 p-3'>
        <ul className='xl:flex-col flex flex-row flex-wrap *:w-1/2 xl:*:w-full *:text-gray-800 *:font-bold *:text-sm '>
            <li  className="">
                <NavLink className={({isActive})=>`w-full block rounded-xl p-3 my-2 hover:bg-gray-100 transition-colors duration-500 ${isActive && `text-white bg-gradient-to-r from-blue-950 via-blue-950 to-blue-900 font-bold`}`} to="/feed"><i className='fa-regular fa-newspaper mr-4 font-bold text-lg '></i> <span className='text-medium'>Feed</span></NavLink>
            </li>

            <li  className="">
                <NavLink className={({isActive})=>`w-full flex items-center gap-1.5 rounded-xl p-3 my-2 hover:bg-gray-100 transition-colors duration-500 ${isActive && `text-white bg-gradient-to-r from-blue-950 via-blue-950 to-blue-900 font-bold`}`}  to="/myposts"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-sparkles" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg> <span className='ml-6 text-medium'>My posts</span></NavLink>
            </li>

            <li  className="">
                <NavLink className={({isActive})=>`w-full flex items-center gap-1.5 rounded-xl p-3 my-2 hover:bg-gray-100 transition-colors duration-500 ${isActive && `text-white bg-gradient-to-r from-blue-950 via-blue-950 to-blue-900 font-bold`}`}  to="/"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-earth" aria-hidden="true"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"></path><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"></path><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"></path><circle cx="12" cy="12" r="10"></circle></svg> <span className='text-medium ml-6'>Community</span></NavLink>
            </li>

            <li  className="">
                <NavLink className={({isActive})=>`w-full flex items-center gap-1.5 rounded-xl p-3 my-2 hover:bg-gray-100 transition-colors duration-500 ${isActive && `text-white bg-gradient-to-r from-blue-950 via-blue-950 to-blue-900 font-bold`}`}  to="/saved"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-bookmark" aria-hidden="true"><path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"></path></svg> <span className='text-medium ml-6'>Saved</span></NavLink>
            </li>
            
        </ul>
        

    </div>
  )
}
