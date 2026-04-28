import React, { useContext, useRef, useState } from 'react'
import { authContext } from '../../context/AuthContext'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function CreatePost() {
  const {userData}= useContext(authContext)
  const [openEdit, setOpenEdit]= useState(false)

  const [imgPreview, setImgPreview]=useState(null)
  const bodyInput = useRef(null)
  const imgInput = useRef(null)
  const queryClient= useQueryClient()
  const {data, isPending, mutate} = useMutation({mutationFn:createPost,
    onSuccess: ()=>{queryClient.invalidateQueries(['posts'])
                    queryClient.invalidateQueries(['feedPosts'])
                    queryClient.invalidateQueries(['userData'])
                    emptyPost()
    }
  })

// img preview
function handleImgPreview(e){
 const file =e.target.files[0];
 if(file){
  const url = URL.createObjectURL(file)
  setImgPreview(url); 
 }
}

function emptyPost(){
  imgInput.current.value=null
  bodyInput.current.value=null 
  closeBtn()
}

function closeBtn(){
  setImgPreview(null)
  imgInput.current.value=null
}

function collectPostData(){
   const formData = new FormData()
   if(bodyInput.current.value)
    formData.append('body', bodyInput.current.value)
  if(imgInput.current.files[0])
    formData.append('image',imgInput.current.files[0])
  mutate(formData)
}

function createPost(formData){
  return axios.post(`https://route-posts.routemisr.com/posts`,formData, {
    headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
  })
}

  return (
    <>
      <div className='w-full my-5 p-4 rounded-xl shadow-xs shadow-gray-300 bg-white'>
        <div className="flex gap-3">
            <img src={userData?.photo} alt={`${userData?.name} avatar`} className="size-10 rounded-full" />
            <p className='font-bold text-md'>{userData?.name}</p>
        </div>
        {/* body input */}
         <textarea
            placeholder={`What's on your mind , ${userData?.name.split(" ")[0]}?`}
            className="w-full h-[100px] my-4 resize-none px-4 py-3  pr-12 bg-blue-50/40 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400 focus:bg-white transition-all text-sm placeholder:text-gray-400 placeholder:md:text-[16px]"
            type="text"
            ref={bodyInput}
          />
          {/* file input */}
          <input type="file" id="imageInput" onChange={handleImgPreview} className='hidden' ref={imgInput}/>
          {/* img preview */}
           { imgPreview && <div className="relative my-1">
          <img src={imgPreview} alt="" className='w-full object-cover h-50' />
         <div onClick={closeBtn} className="flex size-5 rounded-full items-center justify-center bg-gray-900/70 absolute top-3 end-3 cursor-pointer">
          <i className='fa-solid fa-close text-white text-[12px]'></i>
         </div>
        </div>}

        {/* btns */}
          <div className="flex items-center justify-between pt-2 border-t ">
            <div className="flex gap-3">
              <label htmlFor='imageInput' className="flex items-center text-gray-500 gap-2 p-2 transition-colors duration-500 hover:bg-green-50 rounded-md">
              <i className='fa-regular fa-image text-green-700 text-md '></i>
              <p className='font-semibold text-sm hidden md:block'>Photo/Video</p>
            </label>
            <button className="flex items-center text-gray-500 gap-2 p-2 transition-colors duration-500 hover:bg-green-50 rounded-md">
              <i className='fa-regular fa-smile text-yellow-500 text-md '></i>
              <p className='font-semibold text-sm hidden md:block'>Feelings/Activity</p>
            </button>
            </div>
              
              <button onClick={collectPostData} className="flex items-center text-white gap-2 px-4 py-2  bg-blue-500 transition-colors duration-500 hover:bg-blue-600 rounded-md">
              <p className='font-semibold'>Post</p>
               {isPending ? <i className="fa-solid fa-spinner fa-spinner text-white text-sm"></i> :  <i className="fa-regular fa-paper-plane text-white text-sm"></i>}
              
            </button>
          </div>

    </div>
    </>
   
  )
}
