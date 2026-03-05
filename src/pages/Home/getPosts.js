import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useFetchPosts(){
    
    
    function getPosts(){
      return axios.get(`https://route-posts.routemisr.com/posts`, {headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }})
    }

     const {data,isLoading,isError}= useQuery({queryKey:['posts'], queryFn:getPosts,select: (data)=> data?.data?.data?.posts})
    return {data,isLoading,isError}
    
}