import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import axios from 'axios'
import Loader from '../../../component/user/Loader/Loader';
import style from './SearchPage.module.css'
export default function SearchPage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { item_name } = useParams();

    useEffect(() => {
        searchProduct();
    }, []);

    console.log("search", item_name);

    const searchProduct = async () => {
        try {
            const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products`);

            const products = data?.products || [];

            const filteredProducts = products.filter((product) =>
                product.name?.toLowerCase().includes(item_name.toLowerCase()));
            setProducts(filteredProducts);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>

            <div className={`container ${style.products} mb-5`} >
                <div className="d-flex justify-content-center align-items-center flex-wrap gap-5">
                    {
                        products.map(
                            (product, index) =>
                                <div key={index} className={`${style.product}`}>
                                    <Link to={`/products/${product._id}`}>
                                        <div className='d-flex align-items-center justify-content-center'>
                                            <img src={product.mainImage.secure_url} className={`${style.cardImg}s`} alt={product.name} />
                                        </div>
                                        <div>
                                            <p>{product.name}</p>
                                        </div>
                                    </Link>
                                </div>
                        )
                    }
                </div >
            </div >
        </>
    )
}