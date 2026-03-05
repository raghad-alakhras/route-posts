import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useSavedPosts(){
    const {data,isLoading} = useQuery({
        queryKey:['savedPosts'],
        queryFn:getSavedPosts
    })
    function getSavedPosts(){
        return axios.get(`https://route-posts.routemisr.com/users/bookmarks`, {
            headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}
        })
    }
   return {data,isLoading}
}