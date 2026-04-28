import { Image } from "@heroui/react";
import { timeAgo } from "../../utilities/RelativeTimeFormat";
import AddComment from "../AddComment/AddComment.jsx";
import { useContext, useRef, useState } from "react";
import TopComment from "../TopComment/TopComment";
import CommentItem from "../CommentItem/CommentItem";
import useFetchPostComments from "./apis/getPostComments.js";
import LoadingComments from "../LoadingComments/LoadingComments";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext.jsx";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { savePost } from "./apis/savePost.js";


export default function PostItem({ post }) {
  // ref & editing
  const bodyInput = useRef(null);
  const imgInput = useRef();
  const [imgPreview, setImgPreview] = useState(post?.image);
  const [isAllComments, setAllComments] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // edit model
  function toggleOpenEdit() {
    setOpenEdit(true);
    toggleMenu();
  }
//  img preview actions
  function cancleEdit() {
    setOpenEdit(false);
    bodyInput.current.value = null;
  }

  function handleImgPreview(e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgPreview(url);
    }
  }

  function closeBtn() {
    setImgPreview(null);
    imgInput.current.value = null;

  }

  //edit post handle
  const queryClient = useQueryClient();
  const { mutate, data: editedData } = useMutation({
    mutationFn: editPost,
    onSuccess: (editedData) => {
      setOpenEdit(false);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
      queryClient.invalidateQueries({ queryKey: ["postItem", editedData?.data?.data?.post?.id] });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });

  function handleEditData() {
    const formData = new FormData();
    if (bodyInput.current.value)
      formData.append("body", bodyInput.current.value);
    if (imgInput.current.files[0])
      formData.append("image", imgInput.current.files[0]);
    mutate(formData);
  }

   function editPost(formData) {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${post?.id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
  }


  // delete post
  const { data: deletedData, mutate: deletePostMutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: (deletedData) => {
      console.log('deletedData',deletedData)
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
      queryClient.invalidateQueries({ queryKey: ["postItem", post?.id] });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  function openDelete() {
    setOpenDeleteModal(true);
    toggleMenu();
  }

   function deletePost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${post?.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }
  function handleDel() {
    deletePostMutate();
    setOpenDeleteModal(false);
  }

  // like post
  const { mutate: likePostMutate, data: likePostData } = useMutation({
    mutationFn: likePost,
    onSuccess: (likePostData) => {
      console.log('like',likePostData)
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
      queryClient.invalidateQueries({ queryKey: ["postItem", post?.id] });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });

  function handleLike() {
    likePostMutate();
  }
 function likePost() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${post?.id}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
  }

  // saved post
  const { mutate: savePostMutate, data: savePostData } = useMutation({
    mutationFn: savePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
      queryClient.invalidateQueries({ queryKey: ["postItem", post?.id] });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });


  function handleSavedPosts() {
    toggleMenu();
    savePostMutate(post?.id);
  }

  // post details
  function showAllComments() {
    setAllComments(true);
  }

  const navigate = useNavigate();

  const { userData } = useContext(authContext);
  const {
    user: { photo, name },
    commentsCount,topComment,likesCount, sharesCount,
  } = post;
  const STATIC_IMAGE =
    "https://linked-posts-app-pied.vercel.app/assets/user-vTumSY3j.png";

  const [openMenu, setOpenMenu] = useState(false);
  function toggleMenu() {
    setOpenMenu(!openMenu);
  }

  // get post comments

  const { data, isLoading, isError } = useFetchPostComments(post?.id);

  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-md shadow-gray-300  mb-5">
        {/* user data */}
        <div className="flex items-center justify-between mx-auto">
          <div className="flex gap-3 p-7">
            <Image
              alt={name}
              height={40}
              radius="full"
              src={photo}
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md font-bold hover:underline transition-all duration-500">
                {name}
              </p>
              <div className="flex gap-2 items-center">
                <p className="text-xs font-normal text-gray-700">
                  @{post?.user?.username}
                </p>
                <p className="text-xs text-gray-400">
                  {timeAgo(post?.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* post actions: */}
          <div className="relative">
            <div
              onClick={toggleMenu}
              className=" cursor-pointer size-7 rounded-full hover:bg-gray-100 flex items-center justify-center mr-7"
            >
              <i className="fa-solid fa-ellipsis text-gray-500"></i>
            </div>

            {openMenu && (
              <div className="bg-white p-2 rounded-lg absolute end-3 z-50 top-7 shadow shadow-gray-200 w-[250px]">
                <ul className="*:flex *:items-center *:cursor-pointer *:w-full *:gap-2 *:text-gray-500 *:mb-1 *:text-sm  *:font-medium *:hover:bg-blue-50/70 *:rounded-md *:p-2">
                  <li onClick={handleSavedPosts}>
                    <i className="fa-regular fa-bookmark"></i>
                    <span>Save post</span>
                  </li>
                  {post?.user?._id === userData?._id && (
                    <>
                      <li onClick={toggleOpenEdit}>
                        <i className="fa-regular fa-edit"></i>
                        <span>Edit post</span>
                      </li>

                      <li onClick={openDelete}>
                        <i className="fa-solid fa-trash text-red-500"></i>
                        <span className="text-red-500">Delete post</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* post body */}

        <div className="p-3">
          {!openEdit && (
            <p className="my-2 text-gray-900 leading-relaxed">{post?.body}</p>
          )}
          {/* if edit state */}
          {openEdit && (
            <div>
              <textarea
                className="w-full h-[100px] my-4 resize-none px-4 py-3  pr-12 bg-blue-50/40 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400 focus:bg-white transition-all text-sm placeholder:text-gray-400 placeholder:text-[16px]"
                type="text"
                ref={bodyInput}
                defaultValue={post?.body}
              />
              <input
                type="file"
                id="imageEdit"
                onChange={handleImgPreview}
                className="hidden"
                ref={imgInput}
              />
              <div className="flex items-center justify-end gap-2 my-4 *:text-xs *:rounded-full *:px-4 *:py-2">
                <label htmlFor="imageEdit">
                  <i className="fa-regular fa-image text-green-700 text-lg"></i>
                </label>
                <button
                  onClick={cancleEdit}
                  className="bg-white text-gray-500 border border-gray-300 "
                >
                  cancle
                </button>
                <button
                  onClick={handleEditData}
                  className="bg-blue-500 text-white "
                >
                  save
                </button>
              </div>
            </div>
          )}
          {post?.bookmarked && (
            <div class="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-[#e7f3ff] px-2 mb-2 py-1 text-[11px] font-bold text-[#1877f2]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                class="lucide lucide-bookmark"
                aria-hidden="true"
              >
                <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"></path>
              </svg>
              Saved
            </div>
          )}

          {/* image or image previewer */}
          {post?.image && !openEdit && (
            <img src={post?.image} alt="" className="w-full" />
          )}
          {/* edit img state */}
          {post?.image && openEdit && (
            <div>
              <div className="relative">
                <img src={imgPreview} alt="" className="w-full" />
                <i
                  onClick={closeBtn}
                  className="fa-solid fa-close text-gray-800 absolute top-5 end-5 cursor-pointer"
                ></i>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between my-2  ">
            <div className="flex gap-1 md:gap-2 items-center">
              <div className="size-5 md:size-6 rounded-full flex items-center justify-center bg-blue-500 group">
                <i className="fa-regular fa-thumbs-up text-white font-bold text-[12px]  group-hover:scale-107 transition-all duration-700"></i>
              </div>
              <span className="text-gray-700 text-sm cursor-pointer font-semibold">
                {likesCount}
                <span className="hidden md:inline"> likes</span>
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex gap-1 items-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  class="lucide lucide-repeat2 lucide-repeat-2"
                  aria-hidden="true"
                >
                  <path d="m2 9 3-3 3 3"></path>
                  <path d="M13 18H7a2 2 0 0 1-2-2V6"></path>
                  <path d="m22 15-3 3-3-3"></path>
                  <path d="M11 6h6a2 2 0 0 1 2 2v10"></path>
                </svg>
                <span className="text-gray-600 text-sm font-normal">
                  {sharesCount} shares
                </span>
              </div>
              <span className="text-gray-600 text-sm font-normal">
                {commentsCount} comments
              </span>
              <button
                onClick={() => {
                  navigate(`/post/${post?.id}`);
                }}
                class="hidden md:inline-block rounded-md px-2 py-1 text-xs font-bold text-blue-600 hover:bg-blue-300/30 transition-all duration-500 cursor-pointer"
              >
                View details
              </button>
            </div>
          </div>
        </div>

        {/* icons */}

        <div className="border-t border-gray-200 mb-1 pt-1 flex items-center justify-between text-lg px-2 *:border-none *:outline-none *:text-gray-600 *:py-2 *:text-center *:w-full *:text-sm *:font-semibold *:hover:bg-blue-50 *:rounded-md">
          <button onClick={handleLike}>
            <div
              className={`flex items-center justify-center py-2 gap-2 ${likePostData?.data?.data?.liked && "text-blue-500 bg-blue-50"} `}
            >
              <i className="fa-regular fa-thumbs-up transition-all duration-700 "></i>
              <span className="transition-all duration-700 hidden md:inline-block">
                Like
              </span>
            </div>
          </button>
          <button>
            <div className="flex items-center justify-center gap-2 py-2">
              <i className="fa-regular fa-comment-dots transition-all duration-700 "></i>
              <span className=" transition-all duration-700  hidden md:inline-block">
                Comment
              </span>
            </div>
          </button>
          <button>
            <div className="flex items-center justify-center gap-2 py-2">
              <i className="fa-solid fa-share-nodes transition-all duration-700 "></i>
              <span className=" transition-all duration-700  hidden md:inline-block">
                Share
              </span>
            </div>
          </button>
        </div>

        {/* top comment */}

        {!isAllComments && topComment && (
          <div className="px-3 mb-2 bg-white pb-7 rounded-xl">
            <TopComment comment={topComment} showAllComment={showAllComments} />
          </div>
        )}

        {/* no comments */}

        {commentsCount === 0 && (
          <p className="text-gray-500 text-center my-2 text-sm pb-2">
            No comments yet. Be the first to comment
          </p>
        )}

        {/* all comments */}

        {isAllComments && (
          <div className=" p-5 comments bg-blue-50/50 w-full border-t border-gray-200 p-2">
            {isLoading ? (
              <LoadingComments />
            ) : (
              data?.data?.data?.comments?.map((comment) => (
                <CommentItem comment={comment} key={comment?._id} />
              ))
            )}
            <AddComment id={post?._id} />
          </div>
        )}
      </div>

      {/* delete modal */}
      {openDeleteModal && (
        <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div class="max-w-[520px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl m-4">
          <div class="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <h4 class="text-base font-extrabold text-slate-900">
              Confirm action
            </h4>
            <button
              onClick={() => {
                setOpenDeleteModal(false);
              }}
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                class="lucide lucide-x"
                aria-hidden="true"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <div class="flex items-start gap-3 p-4">
            <div class="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                class="lucide lucide-triangle-alert"
                aria-hidden="true"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
            </div>
            <div>
              <h5 class="text-sm font-extrabold text-slate-900">
                Delete this post?
              </h5>
              <p class="mt-1 text-sm text-slate-600">
                This post will be permanently removed from your profile and
                feed.
              </p>
            </div>
          </div>
          <div class="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
            <button
              onClick={() => {
                setOpenDeleteModal(false);
              }}
              type="button"
              class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              onClick={handleDel}
              type="button"
              class="rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Delete post
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
