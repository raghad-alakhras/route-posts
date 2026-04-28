import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useFetchPosts(){
     const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://route-posts.routemisr.com';
    
    function getPosts(){
      return axios.get(`${apiUrl}/posts`, {headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }})
    }

     const {data,isLoading,isError}= useQuery({queryKey:['posts'], queryFn:getPosts,select: (data)=> data?.data?.data?.posts})
    return {data,isLoading,isError}
    
}