
import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { authContext } from '../../context/AuthContext'

export default function Navbar() {
  const {userData}=useContext(authContext)
 const [openMenu,setOpenMenu]= useState(false)
 const navigate = useNavigate()
 function toggleMenu(){
  setOpenMenu(!openMenu)
 }

 function handleLogout(){
  localStorage.removeItem('token')
  navigate('/login')

 }
  
  return (
    <div className='fixed top-0 left-0 right-0 bg-white z-50'>
        <div className="container mx-auto py-3">
            <div className="flex items-center justify-between">
                <p className='font-bold text-[18px]'>Route Posts</p>

                <div className="flex items-center gap-4 rounded-xl bg-blue-50/50 border border-gray-300 py-2 px-4">
            <NavLink className={({isActive})=>` p-1 px-2 text-gray-700 font-semibold hover:text-gray-800 transition-colors duration-500 ${isActive && `text-blue-600 bg-white rounded-lg`}`} to="/feed"><i className='fa-regular fa-home '></i> <span className='text-medium hidden md:inline'>Feed</span></NavLink>
               
            <NavLink className={({isActive})=>` p-1 px-2 text-gray-700 font-semibold hover:text-gray-800 transition-colors duration-500 ${isActive && `text-blue-600 bg-white rounded-lg`}`} to="/profile"><i className='fa-regular fa-user '></i> <span className='text-medium hidden md:inline'>Profile</span></NavLink>
                
            <NavLink className={({isActive})=>` p-1 px-2 text-gray-700 font-semibold hover:text-gray-800 transition-colors duration-500 ${isActive && `text-blue-600 bg-white rounded-lg`}`} to="/"><i className='fa-regular fa-message '></i> <span className='text-medium hidden md:inline'>Notification</span></NavLink>
                </div>
                <div onClick={toggleMenu} className="flex relative items-center gap-2 p-2 bg-blue-50/50 hover:bg-blue-50 rounded-full bg-gray-50 border border-gray-300">
                   <img src={userData?.photo} alt="" className='size-7 rounded-full'/>
                   <p className='font-semibold text-[14px] hidden md:block'>{userData?.name}</p>
                   <i className='fa-solid fa-bars  text-xs text-gray-400'></i>
                </div>
             

            </div>
             { openMenu && <div className='bg-white p-2 rounded-lg absolute end-1/10 top-7/7 w-[250px]'>
                  <ul className='*:flex *:items-center *:w-full *:gap-2 *:text-gray-500 *:mb-1 *:text-sm *:font-medium *:hover:bg-blue-50/70 *:rounded-md *:p-2'>
                    <Link to="/profile">
                      <i className='fa-regular fa-user'></i>
                      <span>Profile</span>
                    </Link>
                    <Link to="/settings">
                      <i className='fa-solid fa-gear'></i>
                      <span>Settings</span>
                    </Link>
                    
                  </ul>
                  <div className='h-[1px] bg-gray-300 my-2'></div>
                  <li onClick={handleLogout} className=' hover:bg-red-500/50 my-3 p-2 rounded-lg'>
                      <span className='text-red-600 font-regular '>Logout</span>
                    </li>
                  
                </div>}
        </div>

    </div>
  )
}
