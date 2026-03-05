import { useState } from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home/Home'
import ProtectRoute from './components/ProtectRoute'
import Profile from './pages/Profile/Profile'
import SavedPosts from './pages/SavedPosts/SavedPosts'
import Settings from './pages/Settings/Settings'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PagesLayout from './components/PagesLayout'
import Feed from './pages/Feed/Feed'
import PostDetail from './pages/PostDetail/PostDetail'
import MyPosts from './pages/MyPosts/MyPosts'


function App() {
  const routes = createBrowserRouter([
    {path:'/login', element: <Login/>},    
    {path:'/signup', element: <SignUp/>},
   
    {path: '/', element: <Layout/>, children: [
       {path:'/profile', element:<ProtectRoute><Profile></Profile></ProtectRoute>},
        {path:'/settings', element:<ProtectRoute><Settings></Settings></ProtectRoute>},
      {path:'/', element:<PagesLayout/> , children:[
       {path:'/', element:<ProtectRoute><Home></Home></ProtectRoute>},
     
      {path:'/myposts', element:<ProtectRoute><MyPosts></MyPosts></ProtectRoute>},
      
      {path:'/saved', element:<ProtectRoute><SavedPosts></SavedPosts></ProtectRoute>},
      {path:'/feed', element:<ProtectRoute><Feed></Feed></ProtectRoute>},
      {path:'/post/:id', element:<ProtectRoute><PostDetail></PostDetail></ProtectRoute>},
      ]}, 
    ]}
  ])

  const queryClient = new QueryClient({
    defaultOptions: {
      queries:{
        refetchOnReconnect:false, 
        refetchOnMount:false, 
        refetchOnWindowFocus:false,
      }
    }
  })
  
  
  return (
    <>
   < QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
   <ToastContainer theme= "colored"/> 
    <RouterProvider router={routes}/>
   </QueryClientProvider>
    </>
  )
}

export default App
