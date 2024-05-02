'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { CustomUser } from '@/app/api/auth/[...nextauth]/route';
import { app } from '@/firebase';
import ReactModal from 'react-modal';
import CommentListModal from './CommentListModal';
import { PostObject } from './Post';
import Link from 'next/link'



function CommentSection({post,id}:{post:PostObject,id:any}) {
    const {data:session}= useSession();
    const [comment,setComment] = useState('');
    const [comments,setComments] = useState<any>([])
    const db = getFirestore(app);
    const [showModal, setShowModal] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        const commentPost = comment
        e.preventDefault();

        await addDoc(collection(db,'posts',id,'comments'),{
            comment:commentPost,
            username:(session?.user as CustomUser).username,
            userImage:session?.user?.image,
            timestamp:serverTimestamp(),
        });
        setComment('')
      }
  useEffect(()=>{
    onSnapshot(query(collection(db,'posts',id,'comments'),orderBy('timestamp','desc')),(snapshot)=>{
    setComments(snapshot.docs)
    })
  },[db])

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className='ml-4'>
    {/* {
        comments.length > 0 ? (
            <div>
            <button onClick={openModal} className='bg-white border-none outline-none p-2'>
                View {comments.length === 1 ? '1 comment' : `all ${comments.length} comments`}
            </button>
            <ReactModal isOpen={showModal} onRequestClose={closeModal} ariaHideApp={false}>
                <CommentListModal post={post} comments={comments} onClose={closeModal} />
            </ReactModal>
        </div>
         
        ):(
            
        )
    } */}

<Link href={`/pages/post/${post.id}`}  key={post.id}>
   { comments.length > 0 ? (
      <div>View {comments.length === 1 ? '1 comment' : `all  ${comments.length} comments`}</div>
    ):(
      <div>0 Comment</div>
    )
   }
   </Link>
    

      {
        session && session.user?.image &&(
            <form onSubmit={handleSubmit} className='flex items-center p-4 gap-2 w-[100%]'>
             <img src ={session?.user?.image}
             alt="user image"
             className='h-10 w-10 rounded-full border p-[4px] object-cover'
             />
             <input 
             
             type="text" name="comment" id="comment"  value={comment} onChange={(event)=>setComment(event.target.value)}
             placeholder='add comment...'
             className='border-none flex-1 focus:ring-0 outline-none'
             />
           

             <button
             disabled={!comment.trim()}
              type="submit" className=' text-blue-400 disabled:cursor-not-allowed disabled:text-gray-400 w-[100%]'>Post</button>
              

            </form>
        )
      }
    </div>
  )
}

export default CommentSection
