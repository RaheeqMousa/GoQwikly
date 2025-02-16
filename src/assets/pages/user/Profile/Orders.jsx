import react, { useState, useEffect } from 'react';
import DropDown from '../../../component/user/DropDown/DropDown';
import Loader from '../../../component/user/Loader/Loader'
import { CgChevronDoubleLeft } from 'react-icons/cg';
import axios from 'axios'

export default function () {

    const [orders, setOrders] = useState([])
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getOrders();
    }, []);



    const getOrders = async (data) => {

        try {
            const res = await axios.get('https://ecommerce-node4.onrender.com/order',
                {
                    headers: {
                        Authorization: `Tariq__${localStorage.getItem('userToken')}`,
                    },
                });

            console.log("orders detail ",res.data.orders.filter((_, index) => index % 2 !== 0));
            if (res.status === 200) {
                console.log("success");
            }
            setOrders(res.data.orders);
        
        } catch (e) {
            console.log("error ", e.response.data);
        } finally {
            setIsLoading(false);
        }
    };


    if (isLoading ) {
        console.log("loading");
        return <Loader />;
    }
    if (orders.length === 0) {
        // Handle the case when no orders or details are available
        return <p>No orders or details available.</p>;
    }

    
    return (
        <>

            <div className='d-flex justify-content-center align-items-center flex-column'>
                
                    <h2 >Order Details</h2>
                    
               <div className='d-flex align-items-center justify-content-center flex-column gap-2 '>
                    {
                        orders.filter((_, index) => index % 2 === 0).map((order, index) => (
                            <div key={index}>
                                <DropDown type="order" items={order.products} details={orders.at(++index)} />
                                {/* <h3>Order ID: {order.id}</h3>
                                <h3>Total Price: {order.totalPrice}</h3>
                                <h3>Payment Method: {order.paymentMethod}</h3>
                                <h3>Status: {order.status}</h3> */}
                            </div>
                        ))
                    }
               </div>
               
            </div>

        </>
    )
}