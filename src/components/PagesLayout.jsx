import React from 'react'
import { Outlet } from 'react-router-dom'
import Aside from './Aside/Aside'
import SuggestedFriends from './SuggestedFriends/SuggestedFriends'
import Navbar from './Navbar/Navbar'

export default function PagesLayout() {
  return (
       <div className='bg-gray-100 min-h-screen py-10 mt-10 xl:flex justify-between relative'>
          <Navbar/>
         <div className='p-6 xl:w-1/4 w-full flex flex-col gap-4 xl:sticky top-10 h-fit order-1'> 
             <Aside/>
         </div>     
         
        <div className='xl:w-1/4 p-6 w-full xl:sticky top-0 h-fit order-3'>
             <SuggestedFriends/>
        </div>
        <div className="w-full xl:w-1/2 px-6 order-2">
             <Outlet/>
         </div>
   
       </div>
  )
}
