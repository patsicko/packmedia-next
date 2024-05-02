'use client'
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import Post, { PostObject } from './Post';
import { collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import { app } from '@/firebase';


interface Comment {
    userImage: string;
    username: string;
    comment: string;
}

interface CommentListModalProps {
    id:string
   
}

const CommentListModal: React.FC<CommentListModalProps> = ({ id }) => {
    const [comments,setComments] = useState<any>([])
    const db = getFirestore(app);

    useEffect(()=>{
        onSnapshot(query(collection(db,'posts',id,'comments'),orderBy('timestamp','desc')),(snapshot)=>{
        setComments(snapshot.docs)
        })
      },[db])
    return (
        <div className='flex items-center justify-center w-full'>
        
                <div className='  mt-6 w-[100%] '>
                {comments.map((comment:any, index:any) => (
                    <div key={index} className=''>
                        <div className='flex  p-2'>
                        <img src={comment.data().userImage} alt="userImage" className='h-7 rounded-full object-cover border p-[2px]' />
                        <span className='font-bold text-gray-700'>{comment.data().username}{' '} </span>
                        </div>
                       
                        <p  className='p-2 text-md w-full'>
                       {comment.data().comment}
                        </p>
                        <Moment fromNow  className='text-md font-bold text-gray-400 ml-2'>
                            {comment.data().timestamp?.toDate()}
                        </Moment>
                    </div>
                ))}
                 
             </div>
            
             
           
        </div>
       
        
    );
};

export default CommentListModal;
