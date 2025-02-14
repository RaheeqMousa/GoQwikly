import { createContext, useState,useEffect } from "react";
export const CartContext = createContext();
import axios from 'axios'
import Loader from '../Loader/Loader'

const CartContextProvider = ({children})=>{
    const [cartCount,setCartCount] = useState(0);
    const [cartItems,setCartItems] = useState(null);
    const [Loading, setLoading] = useState(true);

    useEffect( () =>{
        getCart();
    }, [] )

    const getCart = async ()=>{
        try{
        const token =localStorage.getItem("userToken");
        const response = await axios.get("https://ecommerce-node4.onrender.com/cart",
            {
                headers:{
                    'Authorization':`Tariq__${token}`
                }
            });


        setCartCount(response.data.count);
        setCartItems(response.data.products);
        console.log(response.data.products);
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    if (Loading) {
        return <Loader />;
    }

    console.log("Inside cart context ",cartItems);

    return(
        <CartContext.Provider value={{cartCount, setCartCount, cartItems}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;