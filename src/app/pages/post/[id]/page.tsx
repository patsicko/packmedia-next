import React from 'react'
import Posts from '@/components/singlepost/Posts'
import Comment from '@/components/singlepost/Comments'

const page: React.FC<{ params: { id: string } }> = ({ params: { id } }) => {

  return (
    <main className='grid grid-cols-1 md:grid-cols-3 gap-8 mx-4 lg:ml-[20%] lg:mr-[2%] '>
    <section className='md:col-span-2'>
      <Posts id={id}/>
    </section>

    <section className='w-full border  md:inline-grid md:col-span-1'>
        <div className='w-[100%]'>
       <Comment id={id} />
        </div>
  
    </section>
    </main>
  )
}

export default page
