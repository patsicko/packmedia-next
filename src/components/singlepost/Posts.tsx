"use client"
import { app } from '@/firebase';
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

type PostType = {
    id: string;
}

type PropsType = {
    Id: string;
}

const Page: React.FC<PropsType> = ({ Id }) => {
    const [data, setData] = useState<PostType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getFirestore(app);
                const q = query(collection(db,'posts'), orderBy('timestamp','desc'), where('id', '==', Id));
                const querySnapshot = await getDocs(q);

                let postData: PostType[] = [];

                querySnapshot.forEach((doc) => {
                    postData.push({id: doc.id, ...doc.data()});
                });

                setData(postData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [Id]);

    return (
        <div>
          <h2>{Id}</h2>
       

            {data.map((post: PostType) => (
                <div key={post.id}>
                    {post.id}
                </div>
            ))}
        </div>
    )
}

export default Page;
