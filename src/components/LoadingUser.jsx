import React from 'react'
import { Skeleton, Stack, Box } from "@mui/material";
export default function LoadingUser() {
  return (
   <>
   
   
       <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-5">
            <div class="h-20 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            <div class="px-5 pb-5 -mt-8">
               <Skeleton variant="circular" width={60} height={60} spacing={7}/>
                 <Stack spacing={0} mt={3}>
               <Skeleton variant="text" width={80} height={20} />
               <Skeleton variant="text" width={40} height={20} />
             </Stack>
                    </div>
                    </div>
         
          
   </>
  )
}
