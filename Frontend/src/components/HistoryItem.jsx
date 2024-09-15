import React from 'react'
import { useNavigate } from 'react-router'

const HistoryItem = ({id,img}) => {
    const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/product/${id}`)} className='blur-sm hover:blur-0 transition-all hover:scale-110'>
        <img src={img} alt="" className='history w-24 cursor-pointer'/>
    </div>
  )
}

export default HistoryItem