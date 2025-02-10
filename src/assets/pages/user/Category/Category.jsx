import React,{useState} from 'react'
import { useEffect } from 'react';
import axios from 'axios'
import styles from './Category.module.css'
import Loader from '../../../component/user/Loader/Loader'
import { Link } from'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Category() {

    const [categories,setCategories] =useState([{}]);
    const [isLoading,setIsLoading]= useState(true);

    const getCategories =async () => {
        try{
            const {data}=await axios.get(`https://ecommerce-node4.onrender.com/categories/active`);
            setCategories(data.categories);
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false);
        }
    
    };

    useEffect(() => {
        getCategories();
    }, []);

    if(isLoading) 
        return <Loader />
    
  return (
   <>
        <section className={`${styles.categories} py-5 `}>
            <div className='container'>
            <Swiper
                    spaceBetween={50}
                    slidesPerView={3.3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    >    
                <div className='row'>
                    {
                        categories.map( cat=>
                            <div key={cat._id} className='col-md-3 col-sm-6 col-6'>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <SwiperSlide>
                                        <Link to={`/CategoryProduct/${cat._id}`}>
                                            <img src={cat.image.secure_url} alt="Category" />  
                                        </Link>
                                    </SwiperSlide>
                                </div>
                            </div>
                        )
                    }
                </div>
            
            </Swiper>
            </div>
        </section>
   </>
  )
  
}