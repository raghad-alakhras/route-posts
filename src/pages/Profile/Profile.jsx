import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, NavLink } from 'react-router-dom'
import PostItem from '../../components/PostItem/PostItem'
import useGetUserPosts from './userPosts'
import { authContext } from '../../context/AuthContext'
import LoadingPost from '../Home/LoadingPost'
import CreatePost from '../../components/CreatePost/CreatePost'
import useSavedPosts from '../SavedPosts/getSavedPosts'


export default function Profile() {
  const {userData}=useContext(authContext)
   const {data,isLoading,isError}= useGetUserPosts(userData?._id)
   const  {data:savedPosts,isLoading:loadSavedPosts} = useSavedPosts()
   const [btnStyle, setBtnStyle]= useState('posts')
   

  

  return (
      <div className='mt-23 container mx-auto'>
        {/* user data section */}
        <section className="w-full relative h-[90vh] bg-white rounded-3xl mb-10 shadow shadow-gray-300">
          <div class="h-1/2 rounded-t-3xl bg-linear-to-r from-gray-800 to-gray-500 "> </div>
           <div className="p-4 rounded-3xl absolute top-2/6 w-9/10 left-1/2 -translate-x-1/2 bg-white/80 ">
          <div className="lg:flex items-center justify-between">
            <div className="flex gap-4">
              <img src={userData?.photo} alt="" className="size-30 rounded-full p-1 bg-white shadow shadow-gray-50" />
              <div className='mt-2'>
                <h3 className='font-black'>{userData?.name}</h3>
                <p className='text-gray-400 text-lg'>@{userData?.username}</p>
              </div>
            </div>
            <div className="flex *:w-1/3 gap-2 mt-4 lg:mt-0 ">
              <div className="p-3 px-10 bg-white text-center border border-gray-200 rounded-3xl">
                <span className='text-gray-600 text-sm font-bold'>Followers</span>
                <p className='text-xl font-extrabold'>{userData?.followersCount}</p>
              </div>
              <div className="p-3 px-10 bg-white text-center border border-gray-200 rounded-3xl">
                <span className='text-gray-600 text-sm font-bold'>Following</span>
                <p className='text-xl font-extrabold'>{userData?.followingCount}</p>
              </div>
              <div className="p-3 px-10 bg-white text-center border border-gray-200 rounded-3xl">
                <span className='text-gray-600 text-sm font-bold'>Bookmarks</span>
                <p className='text-xl font-extrabold'>{userData?.bookmarksCount}</p>
              </div>
            </div>
          </div>
          <div className="lg:flex  gap-5 my-5 ">
            <div className="p-2 px-4 bg-blue-50/50 border border-gray-300 rounded-2xl lg:w-3/4">
           <p className='font-bold text-gray-700 text-sm  my-3'>About</p>
           <div className="flex gap-2 items-center  text-gray-600 mb-2 text-sm">
            <i className='fa-regular fa-envelope'></i>
            <span>{userData?.email}</span>
           </div>
           <div className="flex gap-2 items-center text-gray-600 mb-8 text-sm">
            <i className='fa-regular fa-user'></i>
            <span>Active on Route Posts</span>
           </div>
          </div>
         <div className='lg:w-1/4 flex gap-2 lg:block'>
           <div className="p-2 px-5 bg-blue-50 border border-gray-300 rounded-2xl">
            <p className='text-blue-950 font-bold text-sm my-2'>My Posts</p>
            <p className='font-black text-xl mb-3'>{data?.data?.data?.posts.length}</p>
          </div>
           <div className="p-2 px-5 bg-blue-50 border border-gray-300 rounded-2xl lg:mt-2">
            <p className='text-blue-950 font-bold text-sm my-2'>Saved posts</p>
            <p className='font-black text-xl mb-3'>{savedPosts?.data?.data?.bookmarks.length}</p>
          </div>
         </div>
          </div>
        </div>
        </section>
        {/* posts section */}

        <div className="bg-white my-6 p-4 rounded-2xl shadow-md shadow-gray-300">
          <div className="flex items-center gap-5 bg-blue-50/50 rounded-xl p-3 w-fit">
             <button onClick={()=>{setBtnStyle('posts')}} className={`flex items-center gap-2 p-2 font-bold text-sm ${btnStyle === 'posts' ? `text-blue-500 bg-white shadow-sm shadow-gray-200 rounded-lg`:'text-gray-600'}`}>
              <i className='fa-regular fa-newspaper'></i>
              <span>My Posts</span>
             </button>
             <button onClick={()=>{setBtnStyle('saved')}} className={`flex items-center gap-2 p-2 font-bold text-sm ${btnStyle === 'saved' ? `text-blue-500 bg-white shadow-sm shadow-gray-200 rounded-lg`:'text-gray-600'}`}>
              <i className='fa-regular fa-bookmark'></i>
              <span>Saved</span>
             </button>
          </div>

        </div>
       
      
     <div id="my-posts">
       {btnStyle==="posts" ? isLoading ?<LoadingPost/> :
       data?.data?.data?.posts?.map(post => <PostItem post={post} key={post._id} isHome={false}/>) :
        isLoading ?<LoadingPost/> :
       savedPosts?.data?.data?.bookmarks?.map(post => <PostItem post={post} key={post._id} isHome={false}/>) } 
     </div>
  
       <p className='font-bold mt-1 text-gray-400 text-center text-xs'>You reached the end</p>

      </div>
  )
}
