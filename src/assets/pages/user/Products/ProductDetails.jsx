import React,{useEffect,useState,useContext} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../../component/user/Loader/Loader'
import DropDown from '../../../component/user/DropDown/DropDown'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from 'react-bootstrap/Carousel';
import styles from './Slider.module.css';
import style from './Products.module.css'
import { FaCartShopping } from 'react-icons/fa6'
import { FaStar } from 'react-icons/fa6'
import { FaStarHalf } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom';
import {CartContext} from '../../../component/user/context/CartContext'


export default function ProductDetails() {

    const {cartCount,setCartCount} = useContext(CartContext);
    const { productId } = useParams();
    
    const [product,setProduct] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [avgRating, setAvgRating] = useState(0);
    const navigate=useNavigate();

    useEffect(() => {
        getProduct();
    }, []);
  
    useEffect(() => {
      getAvgRating();
  }, []);
  
    const getProduct =async () => {
      try{
          const {data}=await axios.get(`https://ecommerce-node4.onrender.com/products/${productId}`);
          setProduct(data.product);
          setAvgRating(data.avgRating);
          console.log(data);
          console.log(data.product +" kkkk");
      }catch(e){
          console.log(e)
      }finally{
          setIsLoading(false);
      }
  };

  const getAvgRating =async () => {
    try{
        const {data}=await axios.get(`https://ecommerce-node4.onrender.com/products/${productId}`);
        setAvgRating(data.avgRating);
    }catch(e){
        console.log(e)
    }finally{
        setIsLoading(false);
    }
};





  if(isLoading) 
      return <Loader />


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


  const addToCart = async ()=>{
    try{
        const token=localStorage.getItem("userToken");
        console.log(token)
        const response=await axios.post(
            "https://ecommerce-node4.onrender.com/cart", // Ensure this is correct
            { productId: productId },
            { headers: { Authorization: `Tariq__${token}` } } // Ensure this prefix is correct
        );
        console.log(response.data);
    if(response.status === 201){
        toast.success("Product added successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setCartCount(cartCount+1);
        navigate('/cart');
    }
    if(response.status === 409){
        toast.error("Product already in cart!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

        
    }catch(e){
        console.log(e)
        if(e.message === "Request failed with status code 409"){
            toast.error("already exist item in cart", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
  }
  
  
  return (
   <>
    <section className={`${style.productDetail}`}>

        <div className={`container flex-wrap ${styles.slider_price}`}>
            <Carousel className={`${styles.productDetailSlider}`}>
                {product.subImages.map((img, index) => (
                    <Carousel.Item key={index}>
                    <img
                        src={img.secure_url}
                        alt={`Product ${index}`}
                        className="d-block w-100"
                    />
                    </Carousel.Item>
                ))}
            </Carousel>

            <div className='w-50'>
                <div >
                   <p className='fs-3'>{product.name}</p> 
                </div>
                <div className='fs-3'>
                    {stars}
                </div>
                <p className='fs-4'>Price: ${product.price}</p>
                <button type="button" class="btn btn-primary" onClick={addToCart}>{<FaCartShopping/>} Add to Cart</button>
            </div>
            
        </div>
        <div className={`container d-flex flex-column gap-3 py-5`}>
            <DropDown items={product.description || "No description available."} type="description" />
            {/* <p className='w-100'>{product.description || "No description available."}</p> */}
            <DropDown items={product.reviews} type="Reviews" />
        </div>
        
    </section>
   </>
  )
  
  
}