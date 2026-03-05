import React from "react";
import { Link, useParams } from "react-router-dom";
import PostItem from "../../components/PostItem/PostItem";
import useGetSinglePost from "./getSinglePost";
import LoadPostItem from "./LoadPostItem";

export default function PostDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetSinglePost(id);
  console.log();

  return (
    <div>
      <Link to="/">
       <button className="inline-flex items-center gap-2 mb-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-arrow-left"
          aria-hidden="true"
        >
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
        Back
      </button></Link>
      {isLoading ? <LoadPostItem/>: <PostItem post={data?.data?.data?.post} isHome={false}/>}  
    </div>
  );
}
