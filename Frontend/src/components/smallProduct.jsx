import React from 'react'

const SmallProduct = ({name,price,image}) => {
    
    
  return (
    <div className='flex flex-col border m-3'>
        <div className='flex'>
            <div className='flex items-center justify-center'>
                <img src={image} alt="" width={80} height={100} />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <p className='font-bold'>{name}</p>
                <p>₹ {price}</p>
            </div>
        </div>
    </div>
  )
}

export default SmallProduct