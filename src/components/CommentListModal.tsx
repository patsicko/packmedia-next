// CommentListModal.tsx

import React from 'react';
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
        <div className='flex flex-col md:flex-row gap-x-6 justify-center  '>
           
            <section className=''>
            <Post post={post}/>
            </section>

            <div className=''>
               
    
                <div className='mt-8 '>
                {comments.map((comment, index) => (
                    <div key={index} className=''>
                        <div className='flex items-center justify-center p-2'>
                        <img src={comment.data().userImage} alt="userImage" className='h-7 rounded-full object-cover border p-[2px]' />
                        <span className='font-bold text-gray-700'>{comment.data().username}{' '} </span>
                        </div>
                       
                        <p  className='p-2'>
                       {comment.data().comment}
                        </p>
                    </div>
                ))}
                 
               </div>
               
             
             </div>
            
             {/* <div className=' flex-col w-[380px]'>
                <MiniProfile/>
                </div> */}
              <div className=' w-10 top-0 right-0 m-4'>
                <button
                    onClick={onClose}
                    className='py-1 px-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 focus:outline-none focus:bg-gray-200'
                >
                    Close
                </button>
            </div>
           
        </div>
    );
};

export default CommentListModal;
