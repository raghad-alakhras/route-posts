import React from 'react'

export default function TopComment({comment,showAllComment}) {
    const STATIC_IMAGE= 'https://linked-posts-app-pied.vercel.app/assets/user-vTumSY3j.png'

  return (
    <div className='p-3 bg-blue-50/80 rounded-xl border border-gray-300'>
    <p className='text-xs font-bold text-gray-500 mb-1'>Top Comment</p>
    <div className="flex gap-2 my-3">
        <img onError={(e) => e.target.src = STATIC_IMAGE} src={comment.commentCreator.photo} alt="" className='size-8 rounded-full'/>
        <div className="p-2 bg-white rounded-lg w-full">
          <p className='text-gray-800 font-bold text-xs mb-2'>{comment.commentCreator.name}</p>
          <p className='text-gray-600 font-light text-sm'>{comment.content}</p>
          {comment?.image && <img src={comment?.image} alt="" className='w-full h-40  my-1 rounded-lg object-cover' />}
        </div>
    </div>
     <button onClick={showAllComment}  class=" text-xs font-bold text-blue-600 hover:underline transition-all duration-500 cursor-pointer">view all comments</button>
    </div>
  )
}
