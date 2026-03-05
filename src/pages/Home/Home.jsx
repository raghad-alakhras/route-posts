import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Aside from '../../components/Aside/Aside'
import PostItem from '../../components/PostItem/PostItem'

import { useQuery } from '@tanstack/react-query'
import LoadingPost from './LoadingPost'
import useFetchPosts from './getPosts'
import CreatePost from '../../components/CreatePost/CreatePost'


export default function Home() {
const{data,isLoading,isError}= useFetchPosts()



  return (
    <>
     <CreatePost/>
     {isLoading? [0,2].map(index => <LoadingPost key={index}/>) :
        data?.map(post => <PostItem post={post} isProfile={false} key={post._id}/>)
      }
    </>
    
  )
}

