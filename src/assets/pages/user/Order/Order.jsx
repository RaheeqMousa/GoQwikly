import React, { useContext } from 'react';
import { CartContext } from '../../../component/user/context/CartContext';
import Loader from '../../../component/user/Loader/Loader';
import style from './Cart.module.css'
import OrderForm from './OrderForm';

export default function Order() {
    const { cartItems } = useContext(CartContext);

    console.log("Cart Context Data in Component:", { cartItems });

    return (
        <>

            <div className='d-flex flex-column gap-2 py-5'>

                <div className={`${style.cartRow} mt-5`}>
                    <p>Image</p>
                    <p>Name</p>
                    <p>Price</p>
                    <p>Quantity</p>
                </div>

                {cartItems.map((product) => (
                    <div key={product._id} className={`${style.cartRow} px-4`}>
                        <img src={product.details.mainImage.secure_url} alt={product.details.name} />
                        <h5>{product.details.name}</h5>
                        <p>{product.details.price} $</p>
                        <div className='d-flex gap-1'>
                            {product.quantity}
                        </div>
                    </div>
                ))}
            </div>

            <div className='d-flex justify-content-center'>
                <h3>Total: {cartItems.reduce((acc, curr) => acc + (curr.details.price * curr.quantity), 0)} $</h3>
            </div>
            <div className='d-flex justify-content-center align-items-center '>
                <OrderForm />
            </div>

        </>
    );
}
