import React from 'react'

const page: React.FC<{ params: { id: string } }> = ({ params: { id } }) => {
  return (
    <div>
      {id}
    </div>
  )
}

export default page
