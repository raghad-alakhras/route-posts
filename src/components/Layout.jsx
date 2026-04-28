import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'


export default function 
() {
  return (
<>
<div className="overflow-hidden">
  <Navbar/>
  <Outlet/>
</div>

</>
  )
}
