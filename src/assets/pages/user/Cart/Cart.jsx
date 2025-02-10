import React,{useEffect,useState,useContext} from 'react'
import Loader from '../../../component/user/Loader/Loader'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {Link}  from'react-router-dom';
import style from './Cart.module.css'
import { CiCircleRemove } from "react-icons/ci";
import {CartContext} from '../../../component/user/context/CartContext'

export default function Cart() {

    const {cartCount,setCartCount} = useContext(CartContext);
    const [cart,setCart] = useState([]);
    const [isLoading,setLoading]=useState(true);
    const [error, setError] = useState(null); // Handle errors


    const getCart=async ()=>{
        try{
            const token=localStorage.getItem("userToken")

            console.log("Token:", token);
            const response = await axios.get("https://ecommerce-node4.onrender.com/cart",
                {
                    headers:{
                        'Authorization':`Tariq__${token}`
                    }
                }
            );
            console.log("API Response:", response.data.products);
            setCart(response.data.products);
        }catch(e){
            console.log("error")
            setError("There was an error loading your cart.");
        }finally{
            setLoading(false);
        }
    }

    const deleteProduct=async (id)=>{
        try {
            const token = localStorage.getItem("userToken");
    
            console.log("Token:", token);
    
            const response = await axios.patch(
                `https://ecommerce-node4.onrender.com/cart/removeItem`,
                { productId: id },
                { headers: { Authorization: `Tariq__${token}` } }
            );
            
            
        } catch (e) {
           
            setError("There was an error removing the item. Please try again.");
        }
    }

    const clearCart=async ()=>{
        try {
            const token = localStorage.getItem("userToken");
    
            console.log("Token:", token);
    
            const response = await axios.patch(
                `https://ecommerce-node4.onrender.com/cart/clear`,
                {},
                { headers: { Authorization: `Tariq__${token}` } }
            );
            console.log("clear sucessfully");
            setCart([]);
            setCartCount(0)
            
        } catch (e) {
           
            setError("There was an error with clear cart. Please try again.");
        }
    }

    const increaseQuan = async (id) => {
        try{
            const token = localStorage.getItem('userToken')
            const response = await axios.patch("https://ecommerce-node4.onrender.com/cart/incraseQuantity",
                {productId:id},
                { headers: { Authorization: `Tariq__${token}` } }
            )

        }catch (e) {
            console.log("error in cart",e)
        }
       
    }

    const decreaseQuan = async (id) => {
        try{
            const token = localStorage.getItem('userToken')
            const response = await axios.patch("https://ecommerce-node4.onrender.com/cart/decraseQuantity",
                {productId:id},
                { headers: { Authorization: `Tariq__${token}` } }
            )
            
        }catch (e) {
            console.log("error in cart",e)
        }
    }

    useEffect(()=>{
        getCart();
    },[])

    if(isLoading)
        return <Loader />; // Display loading spinner while waiting for data.


    if (error) {
        return <div>{error}</div>; // Display error message if there's any.
    }

    

    return (
        <section className={style.cart}>
            {/* Render the header row once */}
            {cart.length > 0 ? (
                <>
                    <div className={`${style.cartRow}`}>
                        <p>Image</p>
                        <p>Name</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Remove</p>
                    </div>

                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-danger' onClick={()=>clearCart()}>Empty Cart</button>
                    </div>

                    {/* Render the cart items */}
                    {cart.map((product) => (
                        <div key={product._id} className={`${style.cartRow}`}>
                            <img src={product.details.mainImage.secure_url} alt={product.details.name} />
                            <h5>{product.details.name}</h5>
                            <p>{product.details.price} $</p>
                            <div className='d-flex gap-1'>
                                <button onClick={()=>decreaseQuan(product.productId)}>-</button>  
                                    {product.quantity}
                                <button onClick={()=>increaseQuan(product.productId)}>+</button>
                            </div>
                            <CiCircleRemove color="red" size={50} onClick={()=>deleteProduct(product.productId)} />
                        </div>
                    ))}
                </>
            ) : (
                <div className='d-flex flex-column justify-content-center align-items-center py-5'>
                    <h5>Your cart is currently empty</h5>
                    <Link to='/products'>
                        <button className='py-2 px-3 fs-5'>Return to shop</button>
                    </Link>
                    
                </div>
            )}
        </section>
    );
}
