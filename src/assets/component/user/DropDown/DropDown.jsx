import Dropdown from 'react-bootstrap/Dropdown';
import React,{useState} from 'react'
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import Comment from "../../../pages/user/ProductComments/Comment"

export default function DropDown({items,type}) {
    const [isOpen,setIsOpen] = useState(false);

    const toggleDropDown = () =>{
        setIsOpen(!isOpen);
    }

    console.log({items})

  return (
   <>
    <div>
      <button onClick={toggleDropDown}  className='btn btn-success px-5 py-2 fs-5'>
        {isOpen ? (
          <TiArrowSortedUp size={24} />
        ) : (
          <TiArrowSortedDown size={24} />
        )} {type}
      </button>

      {isOpen && (
        type === "description" ? (
            <div className='py-3'>
                <p>{items}</p>
            </div>
            
        ) : (
            items.length > 0 ? (
            <div className='d-flex flex-column gap-4 py-3'>
                {
                    items.map(comment => (
                        <div className='d-flex flex-column justify-content-center align-items-start '>
                            <Comment item={comment} />
                        </div>
                    ))
                }
            </div>
            ) : (
                <div>
                    <p>No comments yet.</p>
                </div>
            )
        )
    )}

    </div>
   </>
  )

}