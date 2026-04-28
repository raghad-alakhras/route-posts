  export function savePost(postId) {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/bookmark`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
  }