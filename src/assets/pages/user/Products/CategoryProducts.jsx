import React,{useEffect,useState} from 'react'
import Category from '../Category/Category'
import Slider from './Slider'
import axios from 'axios'
import DiscountLine from '../../../component/user/DiscountLine/DiscountLine'
import Loader from '../../../component/user/Loader/Loader'
import style from './Products.module.css'
import { useParams } from 'react-router-dom'
import { Link } from'react-router-dom';

export default function CategoryProducts() {

  const {categoryId}=useParams();
  const [isLoading,setIsLoading] = useState(true);
  const [products,setProducts]=useState([]);
  const getProducts = async ()=>{
    try{
      const {data}=await axios.get(`https://ecommerce-node4.onrender.com/products/category/${categoryId}`);
      setProducts(data.products);
    }catch(error){
      console.log(error);
    }finally{
        setIsLoading(false);
    }
  }
  
useEffect(()=>{
    getProducts();
},[])

if(isLoading) 
    return <Loader />
  
  return (
   <>
        <section className={`${style.products} `}>
                <div className='container'>
                  <div  className="d-flex justify-content-center align-items-center flex-wrap gap-5 gap-5">
                      {
                        products.map(
                          (product,index) => 
                            <div key={index} className={`   ${style.product}`}>
                              <Link to={`/products/${product._id}`}>
                                <div className='d-flex align-items-center justify-content-center'>
                                  <img src={product.mainImage.secure_url} className={`${style.cardImg} `} alt={product.name} />
                                </div>
                                <div>
                                  <p>{product.name}</p>
                                </div>
                              </Link>                            
                            </div>
                        )
                      }
                    </div>
                </div>    
            </section>
   </>
  )
}