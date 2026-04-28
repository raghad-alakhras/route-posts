import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetSuggestedFriends(){
     const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://route-posts.routemisr.com';
    const {data, isLoading}= useQuery({
        queryKey:['suggestFriend'],
        queryFn:GetSuggestFriends
    })

    function GetSuggestFriends(){
        return axios.get(`${apiUrl}/users/suggestions?limit=10`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }

    return {data, isLoading}
}