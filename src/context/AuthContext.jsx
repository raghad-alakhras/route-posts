import { createContext, useEffect, useState } from "react"

export const authContext = createContext()

import React from 'react'
import LoadingUser from "../components/LoadingUser"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export default function AuthContextProvider({children}) {
   const [isLogin, setLogin]= useState(null)
   const [userData,setUserData]= useState(null)
    
  

  async function getUserData(){
    const {data}= await axios.get(`https://route-posts.routemisr.com/users/profile-data`, {headers : {Authorization : `Bearer ${localStorage.getItem('token')}`}})
    setUserData(data?.data?.user);
    
    } 
    


   function handleRefresh(){
    if(localStorage.getItem('token')){
        setLogin(localStorage.getItem('token'))
        getUserData()
    }
   }
    useEffect(()=>{
        handleRefresh()
    },[])
  return (
    <authContext.Provider value={{isLogin,setLogin,userData}}> {children}</authContext.Provider>
  )
}
