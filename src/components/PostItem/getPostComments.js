import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetchPostComments(id){
const { data,isLoading,isError } = useQuery({
    queryKey: ["comments", id],
    queryFn: getPostComments,
  });

  function getPostComments() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }
  return {data,isLoading,isError}

}