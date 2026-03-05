import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFeedPosts(){
    function getFeedPosts(){
        return axios.get(`https://route-posts.routemisr.com/posts/feed?only=following&limit=10`,
            {headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
        )
    }
    const {data,isLoading,isError}= useQuery({
        queryKey:['feedPosts'],
        queryFn:getFeedPosts
    })

    return {data,isLoading,isError}
}