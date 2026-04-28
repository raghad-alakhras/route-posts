import { createContext, useEffect, useState } from "react"

export const authContext = createContext()
import axios from "axios"

export default function AuthContextProvider({children}) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://route-posts.routemisr.com';
   const [isLogin, setLogin]= useState(null)
   const [userData,setUserData]= useState(null)
    
  

  async function getUserData(){
   
    const {data}= await axios.get(`${apiUrl}/users/profile-data`, {headers : {Authorization : `Bearer ${localStorage.getItem('token')}`}})
    setUserData(data?.data?.user);   
    } 
    


   function handleRefresh(){
    if(localStorage.getItem('token')){
        setLogin(localStorage.getItem('token'))
    }
   }
    useEffect(()=>{
        handleRefresh()
         getUserData()
    },[isLogin])
  return (
    <authContext.Provider value={{isLogin,setLogin,userData}}> {children}</authContext.Provider>
  )
}
