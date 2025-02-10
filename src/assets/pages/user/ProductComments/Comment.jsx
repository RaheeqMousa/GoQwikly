import React from 'react'
import style from './Comment.module.css'
import { FaStar } from 'react-icons/fa6'
import { FaStarHalf } from 'react-icons/fa6'

export default function Comment({item}) {

    const avgRating = item.rating;

    const generateStars = () => {
          const fullStars = Math.floor(avgRating); 
          const hasHalfStar = avgRating - fullStars; 
      
          const stars = [];
      
          for (let i = 0; i < fullStars; i++) {
              stars.push(<FaStar color='yellow'/>);
          }
  
          if (hasHalfStar!==0) {
              stars.push(<FaStarHalf color='yellow'/>);
          }
          return stars;
    }
    const stars=generateStars();

  return (
   <>
        <div className={`w-75 border rounded px-2 py-3 ${style.commentBox}`}>
          <div >
            <h4>{item.createdBy.userName}</h4>
            <p className='fs-5'>{stars}</p>
            <p className='fs-5'>{item.comment}</p>
          </div>
            
            
        </div>
   </>
  )
}