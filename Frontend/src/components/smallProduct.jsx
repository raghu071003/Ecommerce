import React from 'react'
import { useNavigate } from 'react-router'

const SmallProduct = ({name,price,image,id}) => {
    
    const navigate = useNavigate()
    
  return (
    <div className='flex flex-col border m-3 cursor-pointer hover:border-2 hover:border:black' onClick={() => navigate(`/product/${id}`)}>
        <div className='flex'>
            <div className='flex items-center justify-center'>
                <img src={image} alt="" width={80} height={80} className='p-2 ' />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <p className='font-bold truncate w-40'>{name}</p>
                <p>₹ {price}</p>
            </div>
        </div>
    </div>
  )
}

export default SmallProduct