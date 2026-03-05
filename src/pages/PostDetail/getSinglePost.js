import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetSinglePost(id){
    function getSinglePost(){
        return axios.get(`https://route-posts.routemisr.com/posts/${id}`,
            {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
        )
    }
    const {data,isLoading} = useQuery({
        queryKey: ['postItem',id],
        queryFn:getSinglePost
    })
    return {data,isLoading}
}