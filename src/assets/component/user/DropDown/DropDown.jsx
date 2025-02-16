import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react'
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import Comment from "../../../pages/user/ProductComments/Comment"
import CreateComment from "../../../pages/user/ProductComments/CreateComment"
import { useParams } from 'react-router-dom';
import style from './DropDown.module.css'
export default function DropDown({ items, type, details }) {

    const { productId } = useParams();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    }

    console.log({ details })

    return (
        <>
            <div className='d-flex flex-column'>
                {type === "order" ? (
                    <button onClick={toggleDropDown} className='d-flex gap-2 btn btn-success px-5 py-2 fs-5'>
                        {isOpen ? (
                            <TiArrowSortedUp size={24} />
                        ) : (
                            <TiArrowSortedDown size={24} />
                        )} {
                            <div className='d-flex gap-5'>
                                <p>{type}</p>
                                <p>{details.createdAt}</p>
                                <p>{details.status}</p>

                            </div>
                        }
                    </button>) :
                    (
                        <button onClick={toggleDropDown} className='btn btn-success px-5 py-2 fs-5 w-25'>
                            {isOpen ? (
                                <TiArrowSortedUp size={24} />
                            ) : (
                                <TiArrowSortedDown size={24} />
                            )} {type}
                        </button>
                    )

                }

                {isOpen && (
                    type === "description" ? (
                        <div className='py-3'>
                            <p>{items}</p>
                        </div>
                    ) : type === "order" ? (
                        <div className='w-100'>
                            <div className={`mt-2 px-5 ${style.OrderRow}`}>
                                <p className='w-25'>Image</p>
                                <p className='w-25'>Name</p>
                                <p className='w-25'>Price</p>
                                <p className='w-25'>Quantity</p>
                            </div>

                            <div >
                                {items.map((product) => (
                                    <div key={product._id} className={`${style.OrderRow}`}>
                                        <img src={product.productId.mainImage.secure_url} alt={product.productId.name} />
                                        <p >{product.productId.name}</p>
                                        <p>{product.unitPrice} $</p>
                                        <div className='d-flex gap-1'>
                                            {product.quantity}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) :
                        <>
                            {/* Comments Section */}
                            <CreateComment item={productId} />

                            {items && items.length > 0 ? (
                                <div className='d-flex flex-column gap-4 py-3'>
                                    {items.map(comment => (
                                        <div key={comment.id} className='d-flex flex-column justify-content-center align-items-start'>
                                            <Comment item={comment} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    <p>No comments yet.</p>
                                </div>
                            )}
                        </>
                )}


            </div>
        </>
    )

}