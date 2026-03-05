import React, { useContext } from 'react'
import PostItem from '../../components/PostItem/PostItem'
import useGetUserPosts from '../Profile/userPosts'
import { authContext } from '../../context/AuthContext'
import LoadingPost from '../Home/LoadingPost'
import CreatePost from '../../components/CreatePost/CreatePost'

export default function MyPosts() {
 const {userData}=useContext(authContext)
 const {data,isLoading,isError}= useGetUserPosts(userData?.id)

 
   return (
       <>
       <CreatePost/>
       {isLoading ?<LoadingPost/> :
        data?.data?.data?.posts?.map(post => <PostItem post={post} key={post._id} isHome={false}/>) } 
        <p className='font-bold mt-1 text-gray-400 text-center text-xs'>You reached the end</p>
 
       </>
   )
}
