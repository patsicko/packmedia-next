"use client"
import React,{useEffect, useState} from 'react'
import { useSession } from 'next-auth/react';
import {HiOutlineHeart, HiHeart} from "react-icons/hi"
import { DocumentData, collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { app } from '@/firebase';
import { CustomUser } from '@/app/api/auth/[...nextauth]/route';

function LikeSection({id}:{id:any}) {
    const {data:session} = useSession();
    const [hasLiked,setHasLiked] = useState(false);
    const [likes, setLikes] = useState<DocumentData>([]);

    const db = getFirestore(app);

    useEffect(()=>{
      onSnapshot(collection(db,"posts",id,"likes"),(snapshot)=>{
        setLikes(snapshot.docs)
      })

    },[db])

    useEffect(()=>{
      if(likes.findIndex((like: { id: any; })=>like.id ===(session?.user as CustomUser)?.uid) !== -1){
        setHasLiked(true)
      } else {
        setHasLiked(false)
      } 
    },[likes]) 

    const likePost =async()=>{
      const userUid = (session?.user as CustomUser).uid ;
      const likesRef = collection(db, "posts", id, "likes");
      if(hasLiked){
        await deleteDoc(doc(likesRef,userUid))
      }else{
        await setDoc(doc(likesRef, userUid),{
          username:(session?.user as CustomUser).username
        })
      }

    }

  return (
    <div>
     {session && 
     <div className='flex  border-gray-100 px-4 '>
        <div className='flex items-center gap-2'>
      {

        hasLiked ? (<HiHeart onClick={likePost} className='text-red-500 cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out'/>):(
        <HiOutlineHeart onClick={likePost} className='cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out'/>

        )
      }

      {
        likes.length > 0 && (
          <p className='text-gray-500 g'>
            {likes.length} {likes.length===1 ? 'like':'likes'}
          </p>
        )
      }
        </div>
    </div>}
    </div>
  )
}

export default LikeSection
