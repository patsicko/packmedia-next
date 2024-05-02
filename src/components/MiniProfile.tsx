"use client"
import React from 'react';
import { useSession,signIn,signOut } from 'next-auth/react';
import { CustomUser } from '@/app/api/auth/[...nextauth]/route';


function MiniProfile() {

    const {data:session} = useSession()

    const handleSignIn = () => {
        signIn();
        
    };

    const handleSignOut = () => {
        signOut({redirect:false});
    };

  return (
    <div className='flex items-center justify-between mt-14 ml-10 w-full'>
     <img src={session?.user?.image || '/packlogo.png' } alt="user img" className=' w-16 h-16 rounded-full border p-[2px]'/>
     <div className='flex-1 ml-4'>
        <h2 className='font-bold'>
         {session?.user && (session.user as CustomUser).username}
        </h2>

        <h3 className='text-sm text-gray-400'>
         Welcome to PackMedia
        </h3>

     </div>

     {session ? (
        <button onClick={handleSignOut} className='text-blue-500 text-sm font-semi-bold'>Signout</button>
     ):(<button onClick={handleSignIn} className='text-blue-500 text-sm font-semi-bold'>Signin</button>)}
    </div>
  )
}

export default MiniProfile
