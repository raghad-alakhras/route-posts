import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetchPostComments(id){
   const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://route-posts.routemisr.com';
const { data,isLoading,isError } = useQuery({
    queryKey: ["comments", id],
    queryFn: getPostComments,
  });

  function getPostComments() {
    return axios.get(
      `${apiUrl}/posts/${id}/comments?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }
  return {data,isLoading,isError}

}