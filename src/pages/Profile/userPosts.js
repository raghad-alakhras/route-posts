import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useGetUserPosts(id){
    const {data, isLoading,isError} = useQuery({queryKey:['userData'],
         queryFn:getUserData})
    
    function getUserData(){
    return axios.get(`https://route-posts.routemisr.com/users/${id}/posts`, 
          {headers : {Authorization : `Bearer ${localStorage.getItem('token')}`}})
    } 
    return {data,isLoading,isError}
}