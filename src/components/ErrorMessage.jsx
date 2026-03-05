import React from 'react'

export default function ErrorMessage({msg}) {
  return (
    <p className='text-red-600 text-[14px] mb-3'>{msg}</p>
  )
}
