import React,{useEffect,useState} from 'react'
import Category from '../Category/Category'
import Slider from './Slider'
import axios from 'axios'
import DiscountLine from '../../../component/user/DiscountLine/DiscountLine'
import Loader from '../../../component/user/Loader/Loader'
import style from './Products.module.css'
import { Link } from'react-router-dom';

export default function Products() {

  const [products,setProducts] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  
  const getProducts =async () => {
    try{
        const {data}=await axios.get(`https://ecommerce-node4.onrender.com/products?limit=10`);
        setProducts(data.products);
    }catch(e){
        console.log(e)
    }finally{
        setIsLoading(false);
    }
};

useEffect(() => {
    getProducts();
}, []);

if(isLoading) 
    return <Loader />

  return (
   <>
    <section >
        <Slider />
        <DiscountLine />
        <Category />
        <div className={`container ${style.products} mb-5`}>
          <div  className="d-flex justify-content-center align-items-center flex-wrap gap-5">
              {
                products.map(
                  (product,index) => 
                    <div key={index} className={`${style.product}`}>
                      <Link to={`/products/${product._id}`}>
                        <div className={`d-flex align-items-center justify-content-center flex-column`}>
                          <img src={product.mainImage.secure_url} className={`${style.cardImg} `} alt={product.name} />
                        </div>
                        <div className='w-100 overflow-auto'>
                          <p >{product.name}</p>
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