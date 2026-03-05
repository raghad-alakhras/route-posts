import React from 'react'
import useFeedPosts from './getFeedPosts'
import PostItem from '../../components/PostItem/PostItem'
import LoadingPost from '../Home/LoadingPost'
import CreatePost from '../../components/CreatePost/CreatePost'


export default function Feed() {

  const {data,isLoading,isError} = useFeedPosts()
  
  
  return (
    <div>
      <CreatePost/>
      {isLoading?<LoadingPost/>:
      data?.data?.data?.posts?.map(post => <PostItem post={post} key={post._id} isHome={false}/>)}
    </div>
  )
}
