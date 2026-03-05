import React from 'react'

export default function FriendCard(friend) {
   
    
  return (
    <div className='p-3 bg-gray-50 border border-gray-300 rounded-xl mb-3'>
     <div className="flex items-center mb-2 justify-between">
        <div className="flex items-center gap-1">
            <img src={friend?.friend?.photo} alt="" className="size-12 rounded-full" />
            <div>
                <p className='font-bold mb-1 text-[13px]'>{friend?.friend?.name}</p>
                {friend?.friend?.username &&<p className='text-gray-600 font-light text-xs'>@{friend?.friend?.username}</p>}
            </div>
        </div>
        <button className='flex items-center gap-1 text-xs text-blue-500 rounded-full p-2 bg-blue-100/50 font-semibold cursor-pointer hover:bg-blue-200/50'>
            <i className='fa-solid fa-user-plus'></i>
            <span>Follow</span>
        </button>
     </div>
     <div className="flex items-center gap-2">
        <span className='w-fit bg-blue-50 text-[10px] px-2 text-gray-500 p-1 rounded-full'>{friend?.friend?.followersCount}followers</span>
     { friend?.friend?.mutualFollowersCount && <span className='w-fit bg-blue-100 text-[10px] px-2 text-blue-500 p-1 rounded-full'>{friend?.friend?.mutualFollowersCount} mutual</span>
     }
     </div>
     
    </div>
  )
}
