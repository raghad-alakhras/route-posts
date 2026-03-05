import React, { useContext } from 'react'
import { authContext } from '../../context/AuthContext'
import useSavedPosts from './getSavedPosts'
import CreatePost from '../../components/CreatePost/CreatePost'
import LoadingPost from '../Home/LoadingPost'
import PostItem from '../../components/PostItem/PostItem'

export default function SavedPosts() {
  const {userData}=useContext(authContext)
  const {data,isLoading}= useSavedPosts()

  
  return (
    <>
     <CreatePost/>
     {isLoading? <LoadingPost/>: 
      data?.data?.data?.bookmarks?.map(bookmark => <PostItem post={bookmark} key={bookmark?._id}/>)
     }
    </>
  )
}
