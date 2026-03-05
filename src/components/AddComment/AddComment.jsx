import { Card, CardHeader } from '@heroui/card';
import React, { useContext, useRef, useState } from 'react'
import { authContext } from '../../context/AuthContext';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddComment({id}) {
     const STATIC_IMAGE =
    "https://linked-posts-app-pied.vercel.app/assets/user-vTumSY3j.png";

 const {userData} = useContext(authContext)

 const imageInput = useRef(null)
 const contentInput = useRef(null)
 const [imgPreview , setImgPreview]= useState(null)
 const queryClient = useQueryClient()


 const {data,isPending,mutate} = useMutation({mutationFn:addComment, 
  onSuccess : ()=> {
    queryClient.invalidateQueries({queryKey:['comments',id]})
    cancleComment()
  }
 })




 function closePreview(){
  setImgPreview(null)
  imageInput.current.value=null
 }

 function handleImg(e){
  const file = e.target.files[0]
  if(file){
    const url = URL.createObjectURL(file)
    setImgPreview(url)
  }
 }

 function cancleComment(){
  closePreview()
  contentInput.current.value=null
 }
 function collectCommentData(){
  const formData = new FormData()
  if(imageInput.current.files[0])
    formData.append('image', imageInput.current.files[0])
  if(contentInput.current.value)
    formData.append('content',contentInput.current.value)
  
  
  mutate(formData)
 }

 function addComment(formData){
  return axios.post(`https://route-posts.routemisr.com/posts/${id}/comments`,formData, 
    {headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }}
  )
 }



   return (
    <>
   
     <Card className="border-none shadow-none">
      <CardHeader className="add-comment flex gap-3 items-center">
        <img
          onError={(e) => (e.target.src = STATIC_IMAGE)}
          src={userData?.photo}
          alt={userData?.name}
          className="size-10 rounded-full"
        />
        <div className="w-full  ">
          <textarea
            placeholder={`Comment as ${userData?.name}`}
            className="w-full resize-none px-4 py-3 pb-12 pr-12 bg-blue-50/40 rounded-xl border border-gray-200 focus:outline-none focus:bg-white transition-all text-sm placeholder:text-gray-500 placeholder:text-[14px]"
            type="text"
            ref={contentInput}
          />

         <div className="flex items-center justify-between -mt-13 px-3">
           
          <div className='flex items-center gap-2'>
            <input type="file" id="imageInput" className='hidden' onChange={handleImg} ref={imageInput} />
            <label htmlFor="imageInput" className='size-9 text-gray-500 rounded-full hover:bg-green-100/50 hover:text-green-300 cursor-pointer flex items-center justify-center'>
              <i className="fa-regular fa-image text-[16px]"></i>
            </label>

          </div>
          <button onClick={collectCommentData} className={`border-none outline-none p-3 size-10  bg-blue-400 flex items-center justify-center rounded-full  `}>
          {isPending ? <i className="fa-solid fa-spinner fa-spinner text-white text-sm"></i> :  <i className="fa-regular fa-paper-plane text-white text-sm rotate-45"></i>}
          </button>
         </div>
        </div>
      
      </CardHeader>
     </Card>
       {imgPreview && <div className="relative my-1">
          <img src={imgPreview} alt="" className='w-full object-cover h-50' />
         <div onClick={closePreview} className="flex size-5 rounded-full items-center justify-center bg-gray-900/70 absolute top-3 end-3 cursor-pointer">
          <i className='fa-solid fa-close text-white text-[12px]'></i>
         </div>
        </div>}
      </>
  )
}
