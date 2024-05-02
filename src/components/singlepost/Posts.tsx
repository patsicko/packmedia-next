"use client"
import { app } from '@/firebase';
import { collection, getDocs, getFirestore, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Post, { PostObject } from './Post';

type PostType = {
id:string,
image?:string,
caption?:string,
username?:string,
timestamp?:Timestamp,
profileImg?:string,
}

type PropsType = {
    id: string;
}

const Page: React.FC<PropsType> = ({ id }) => {
    const [data, setData] = useState<PostType[]>([]);
    const [loading,setLoading] = useState(true)
    const db = getFirestore(app);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
                    const postData: PostType[] = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data() 
                    }));

                    const singlePost= postData.filter(post=>post.id===id);
                    console.log("single post",singlePost)
                    setData(singlePost);
                    setLoading(false)
                });
                return unsubscribe; 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [id]);
    


    return (
        <div>
            {loading ?(<div>Loading...</div>):(
                data.length === 0 ?(
                    <div>{data.length}</div>
                     ):(
                       data.map((post: PostType) => (
                         <div key={post.id}>
                            <Post id={id} post={post as PostObject}/>
                            
                         </div>
                     ))
                     )
            ) }

          
        </div>
    )
}

export default Page;
