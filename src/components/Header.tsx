"use client"
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { signIn,useSession,signOut } from 'next-auth/react' 
import Modal from "react-modal"
import { IoAddCircleOutline } from "react-icons/io5";
import { HiCamera } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '@/firebase'
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import { CustomUser } from '@/app/api/auth/[...nextauth]/route'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'


import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


function Header() {
  const route =useRouter()
  const [isQuillLoaded, setIsQuillLoaded] = useState(false);

  useEffect(() => {
    setIsQuillLoaded(true); 
  }, []);

  const {data:session} = useSession()

  console.log("session of loged user", session?.user?.image)


  const [isOpen, setIsOpen]=useState(false)
  const [selectedFile,setSelectedFile]= useState<File|null>(null)
  const [imageFileUrl,setImageFileUrl] = useState<any>(null);
  const [imageFileUploading,setImageFileUploading] = useState(false);
  const [postUploading, setPostUploading] = useState(false);
  const [caption,setCaption] = useState('');
  const [isVideo,setIsVideo] = useState(false);
  const [uploadProgress,setUploadProgress]=useState(0);
  const [largeFile,setLargeFile]=useState('')

  
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const filePickerRef = useRef<HTMLInputElement>(null);

  const db = getFirestore(app)

  const addImageToPost=(e: ChangeEvent<HTMLInputElement>)=>{
  const file = e.target.files?.[0]

  if(file){ 
    setLargeFile('')
    if (file.size > MAX_FILE_SIZE) {
      setLargeFile('File size exceeds the maximum allowed size!! 😞');
      return;
    }
    setSelectedFile(file);
    setImageFileUrl(URL.createObjectURL(file))
    const isVideo = /\.(mp4|webm|ogg)$/i.test(file.name);
      setIsVideo(isVideo);   
  }
  }

  useEffect(()=>{
    if(selectedFile){
      uploadImageToStorage()
    }
  },[selectedFile])

  async function uploadImageToStorage() {

    setImageFileUploading(true);

    const storage= getStorage(app) ;
    const fileName = new Date().getTime()+'-'+selectedFile?.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,selectedFile as Blob);
   
    uploadTask.on(
      'state_changed',
      (snapshoot)=>{
      const progress = 
    (snapshoot.bytesTransferred/snapshoot.totalBytes)*100;
    setUploadProgress(progress)
     console.log('upload is '+progress + '% done')
      },
      (error)=>{
        console.log(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },

      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL)=>{
          setImageFileUrl(downloadURL);
          setImageFileUploading(false)
        });
      }

    ); 
    
  }


 const handleSubmit=async ()=>{
 setPostUploading(true);

await addDoc(collection(db,'posts'),{
  username:(session?.user as CustomUser).username,
  caption,
  profileImg:session?.user?.image,
  image:imageFileUrl,
  timestamp: serverTimestamp()


});
setPostUploading(false);
setIsOpen(false);
 route.push('/');
 route.refresh()

  }
    
  return (  
    <div className='shadow-sm   border-b sticky top-0 bg-white z-30 p-3'>
     
     <div className='flex justify-between items-center max-w-6xl mx-auto'>
        <Link href='/'> 
        <Image
        src='/packmedia.png' 
        width={98}
        height={98}
        alt='pack logo'
        priority
        className='rounded-md mx-4 '
        />
         </Link>

         <input type="text" placeholder='search' className='bg-gray-50 border border-gray-200 rounded text-sm  py-2 px-4 max-w-[210px]' />
     {session ? (
      <div className='flex gap-2 items-center'>
      <IoAddCircleOutline onClick={(e)=>setIsOpen(true)} className='text-4xl cursor-pointer transform hover:scale-125 transition duration-300 hover:text-red-600' />
      {
      session.user && session.user.image?(<div className='flex justify-center items-center gap-3'>
        
        <img src={session.user.image} alt="profile image" width={40} height={40} className='rounded-full cursor-pointer' /> <button type="button" onClick={()=>signOut()}>Logout</button>
        </div>
      ):<Image src='/avatar.png' height={10} width={10} alt="avatar"/>
     }</div>
     ):
     <button onClick={()=>signIn()} className='text-sm font-semibold text-blue-500'>Log In</button>
     
     }
         
     </div>
     {
      isOpen && (
        

        <Modal isOpen={isOpen} onRequestClose={()=>{setSelectedFile(null);setIsOpen(false)}} ariaHideApp={false} className='w-[60%] p-6 absolute top-16 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md   '
        >
           {largeFile && <div className='w-1/4 h-12 border border-3 text-red-600 text-md p-4 flex items-center justify-center'>{largeFile}</div>}
          {selectedFile && (<div className='p-8 rounded-full bg-slate-800 text-white text-md  w-full sm:w-1/4 h-10 flex items-center justify-center'>{` ${Math.round(uploadProgress)}% done`}</div>)}
          <div className='flex flex-col justify-center items-center h-[100%' >
            {selectedFile?(

              <div>
              {isVideo ? (
            <video controls className='object-cover w-full' style={{ maxWidth: '100%', maxHeight: '390px' }}>
              <source src={imageFileUrl} type='video/mp4' className={`w-full max-h-[390px]  cursor-pointer ${imageFileUploading ? 'animate-pulse bg-slate-400':''}`} onClick={()=>setSelectedFile(null)} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={imageFileUrl} alt="selected file" className={`w-full max-h-[390px]  cursor-pointer ${imageFileUploading ? 'animate-pulse':''}`} onClick={()=>setSelectedFile(null)} />
          )}
                  
              </div>
              
            ):(
              <HiCamera onClick={()=>filePickerRef?.current?.click()} className='text-5xl text-gray-400 cursor-pointer'/>
            )}

         


           <input type="file" hidden ref={filePickerRef} name="" id="" accept='image/*, video/*' onChange={addImageToPost} />
          </div>
          {/* <textarea 
              onChange={(e)=>setCaption(e?.target?.value)} 
              maxLength={1500} 
              placeholder='Please enter your caption' 
              className='m-4 border-none text-center w-full focus:ring-0 outline-none resize-none'
              rows={5}
            />
        */}

          <ReactQuill
            value={caption}
            onChange={(value) => setCaption(value)}
            placeholder='Please enter your caption, including text explanations and code snippets'
            theme='snow'
            modules={{
              toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['code-block']
              ],
            }}
            className='w-full h-40 overflow-auto border text-center focus:ring-0 outline-none resize-none'
          />
           
           <button onClick={handleSubmit} disabled={!caption.trim() || postUploading || imageFileUploading} className='w-full bg-red-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100'>
            {imageFileUploading ? 'Uploading...' : 'Upload post'}
          </button>

         <AiOutlineClose className='cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300' onClick={()=>{ setSelectedFile(null);setIsOpen(false)}}/>
        </Modal>
      )
     }
    </div>
  )
}

export default Header
