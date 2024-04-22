"use client"
import React from 'react';
import { useSession,signIn,signOut } from 'next-auth/react';
import { CustomUser } from '@/app/api/auth/[...nextauth]/route';


function MiniProfile() {

    const {data:session} = useSession()

  return (
    <div className='flex items-center justify-between mt-14 scroll-ml-10'>
     <img src={session?.user?.image || '/packlogo.png' } alt="user img" className=' w-16 h-16 rounded-full border p-[2px]'/>
     <div>
        <h2 className='font-bold'>
         {session?.user && (session.user as CustomUser).username}
        </h2>

        <h3 className='text-sm text-gray-400'>
         Welcome to PackMedia
        </h3>

     </div>
    </div>
  )
}

export default MiniProfile
