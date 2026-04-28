
import React, { useContext, useRef, useState } from 'react'
import { timeAgo } from '../../utilities/RelativeTimeFormat'
import LoadingComments from '../LoadingComments/LoadingComments';
import { authContext } from '../../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function CommentItem({comment}) {

  
   const {userData}= useContext(authContext)
   const [openMenu,setOpenMenu]=useState(false)
   const contentInput = useRef(null)
   function toggleMenu(){
    setOpenMenu(!openMenu)
   }
   
  //  edit comment
  const queryClient = useQueryClient()
  const {data:editComData ,isPending, mutate:editCommentMutate}= useMutation({mutationFn:editComment, 
  onSuccess: ()=>{
     queryClient.invalidateQueries({  queryKey: ["comments", comment?.post]})
      queryClient.invalidateQueries({ queryKey: ["postItem", comment?.post] });
     toggleOpenEdit()
  }
})
 const [openEdit , setOpenEdit]= useState(false)
 function toggleOpenEdit(){
  setOpenEdit(!openEdit)
  setOpenMenu(false)
 }
 function editCommentData(){
  const formData = new FormData()
  if(contentInput.current.value)
    formData.append('content',contentInput.current.value)

  editCommentMutate(formData)
 }

 function editComment(formData){
  return axios.put(`https://route-posts.routemisr.com/posts/${comment?.post}/comments/${comment?._id}`, formData, 
    {headers: {Authorization: `Bearer ${localStorage.getItem('token')}` }}
  )
 }
// delete comment
const{data:delData,isPending:delPending, mutate:deleteCommentMutation}= useMutation({mutationFn:deleteComment,
  onSuccess:()=>{
    queryClient.invalidateQueries({queryKey: ['comments',comment?.post]})
     queryClient.invalidateQueries({ queryKey: ["postItem", comment?.post] });
  }
})
function deleteComment(){
  return axios.delete(`https://route-posts.routemisr.com/posts/${comment?.post}/comments/${comment?._id}`, {
    headers:{Authorization : `Bearer ${localStorage.getItem('token')}`}
  })
}
function hadeDelComment(){
  deleteCommentMutation()
}

// handle like comment
const {mutate:likeCommentMutate, data:likedCommdata, isPending:likePending}=useMutation({mutationFn:likeComment, 
  onSuccess: ()=>{
    queryClient.invalidateQueries({queryKey: ['comments',comment?.post]})
    queryClient.invalidateQueries({ queryKey: ["postItem", comment?.post] });
  }
})

function handleLikeComment(){
likeCommentMutate()
}

function likeComment(){
  return axios.put(`https://route-posts.routemisr.com/posts/${comment?.post}/comments/${comment?._id}/like`,{},{
    headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
  })
}


    const STATIC_IMAGE= 'https://linked-posts-app-pied.vercel.app/assets/user-vTumSY3j.png'
  return (
      <div className='flex justify-between'>
        <div className="flex gap-2">
     
        <img onError={(e) => e.target.src = STATIC_IMAGE} src={comment.commentCreator.photo} alt={comment.commentCreator.name} className="size-8 rounded-full" />
        <div className="flex flex-col ">
         <div className="bg-gray-200 rounded-xl p-3 w-fi">
             <p className="text-xs text-stale-900 font-bold">{comment.commentCreator.name}</p>
             <div className="flex items-center gap-1 my-1">
              <p className="text-xs text-gray-700 font-semibold ">@{comment.commentCreator.username}</p>
              <p className="text-xs text-gray-500 font-normal ">{timeAgo(comment.createdAt)}</p>
             </div>
        
              {!openEdit&& <p className="text-sm mt-2 text-gray-700">{comment.content}</p>}
              {openEdit && <div className='flex items-end gap-2'>
                <input ref={contentInput} type="text" className='bg-white w-1/2 rounded-full mt-2 p-1 focus:outline-none px-2 border border-gray-400' defaultValue={comment?.content}/>
                 <button onClick={editCommentData} className={`py-1 px-4 ${isPending?' opacity-50':'opacity-100'} bg-blue-500 text-white rounded-full font-semibold text-sm`}>{isPending?'is saving ...':'Save'}</button>
                 <button onClick={toggleOpenEdit} className='py-1 px-4 bg-white text-gray-500 border border-gray-400 rounded-full font-semibold text-sm'>Cancle</button>
                </div>}
            {comment?.image && <img src={comment?.image} alt="" className='w-full h-50 rounded-lg object-cover' />}
         
         </div>
         
           <div className="flex items-center gap-3 text-xs my-2">
            <span className='text-gray-500'>{timeAgo(comment.createdAt)}</span>
            <button onClick={handleLikeComment} className={`border-none ${likedCommdata?.data?.data?.liked ?'text-blue-500':'text-gray-700'}  font-semibold cursor-pointer outline-none hover:underline transition-all duration-600 ${likePending&&'opacity-70'}`}>like {`(${comment?.likes.length})`}</button>
            <button className="border-none outline-none text-gray-700 font-semibold cursor-pointer hover:underline hover:text-blue-500 transition-all duration-600">Reply</button>
        </div>
        </div>
    
       
      </div>
      {userData?._id === comment?.commentCreator?._id && (
        <div className='relative'>
      <div onClick={toggleMenu} className="size-5 rounded-full flex items-center justify-center text-xs text-gray-800 hover:bg-gray-200/50">
        <i className="fa-solid fa-ellipsis cursor-pointer"></i>
        </div>
      {openMenu && <div className="bg-white rounded-xl shadow absolute top-5 right-5 shadow-gray-300 p-2">
        <ul className='*:text-[14px] *:cursor-pointer *:flex *:items-center *:gap-1 *:px-3 *:py-1 *:rounded-lg'>
          <li onClick={toggleOpenEdit} className='text-gray-500 hover:bg-gray-200/40'>
            <i className='fa-regular fa-edit'></i>
            <span>edit</span>
          </li>
          <li onClick={hadeDelComment} className={`${delPending?'opacity-50': 'opacity-100'} text-red-500 hover:bg-red-200/40 mt-1`}>
            <i className='fa-solid fa-trash'></i>
            <span>delete</span>
          </li>
        </ul>
      </div>}
      </div>)}

     
      </div>
  )
}
