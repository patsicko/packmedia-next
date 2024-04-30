// CommentListModal.tsx

import React from 'react';
import Moment from 'react-moment';
import Post, { PostObject } from './Post';


interface Comment {
    userImage: string;
    username: string;
    comment: string;
}

interface CommentListModalProps {
    post:PostObject,
    comments: any[]; 
    onClose: () => void; 
}

const CommentListModal: React.FC<CommentListModalProps> = ({ post, comments, onClose }) => {

   
   
    return (
        <div className='flex items-center justify-center'>
        <div className='w-[100%] lg:w-[60%]'>
             <div className='flex items-center justify-end mt-4'>
                <button
                    onClick={onClose}
                    className='py-1 px-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 focus:outline-none focus:bg-gray-200'
                >
                    Close
                </button>
            </div>
            
        
        <div className='flex flex-col justify-center lg:flex-row  gap-x-16  '>
           
            <section className='w-[100%] lg:w-[60%] '>
            <Post post={post}/>
            </section>
    
                <div className=' flex flex-col mt-6 w-[100%] lg:w-[40%]'>
                {comments.map((comment, index) => (
                    <div key={index} className=''>
                        <div className='flex  p-2'>
                        <img src={comment.data().userImage} alt="userImage" className='h-7 rounded-full object-cover border p-[2px]' />
                        <span className='font-bold text-gray-700'>{comment.data().username}{' '} </span>
                        </div>
                       
                        <p  className='p-2'>
                       {comment.data().comment}
                        </p>
                        <Moment fromNow  className='text-xs text-gray-400'>
                            {comment.data().timestamp?.toDate()}
                        </Moment>
                    </div>
                ))}
                 
             </div>
            
             
           
        </div>
       
        </div>
        </div>
    );
};

export default CommentListModal;
