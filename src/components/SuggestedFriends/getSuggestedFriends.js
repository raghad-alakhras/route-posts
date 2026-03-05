import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetSuggestedFriends(){
    const {data, isLoading}= useQuery({
        queryKey:['suggestFriend'],
        queryFn:GetSuggestFriends
    })

    function GetSuggestFriends(){
        return axios.get(`https://route-posts.routemisr.com/users/suggestions?limit=10`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }

    return {data, isLoading}
}