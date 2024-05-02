
import { app } from '@/firebase';
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import React from 'react'


type propsType = {
    Id:string;
}
const page: React.FC<propsType> = async ({ Id }) => {

const db = getFirestore(app);
const q = query(collection(db,'posts'),orderBy('timestamp','desc'), where('id', '==', Id));

const querySnapshoot =  await getDocs(q);

let data:any = [];

querySnapshoot.forEach((doc)=>{
    
    data.push({id:doc.id, ...doc.data()});
      
})

  return (
    <div>
      {data.length&&(
data.map((post)=>(
  <div key={post.id} >
    {post.id} 

</div>
))
      )}
    

   
    </div>
  )
}

export default page

