import React, { useState } from 'react';
import style from './OrderForm.module.css';
import Loader from '../../../component/user/Loader/Loader';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function OrderForm() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error,setError]=useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const placeOrder = async (data) => {
    setIsLoading(true);

    try {
      const res = await axios.post('https://ecommerce-node4.onrender.com/order',{
        couponName: data.couponName? data.couponName.trim():'',
        address: data.address? data.address.trim():'',
        phone: data.phone? data.phone.trim():''
    },{
        headers: {
          Authorization: `Tariq__${localStorage.getItem('userToken')}`,
        },
  
    });

      console.log(res);
      if (res.status === 200) {
        console.log("success");
        navigate('/profile/OrderDetails');
      }
    } catch (e) {
      console.log("error ",e.response.data);
      setError("Invalid coupon");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={`d-flex justify-content-center align-items-center border border-3 rounded mb-3 ${style.back}`}>
        <form className={`${style.OrderForm} d-flex flex-column gap-4`} onSubmit={handleSubmit(placeOrder)}>
          <div className='d-flex align-items-center justify-content-center'>
            <h3>Place Order</h3>
          </div>
          {error && <div className='text-danger fw-bold'>{error}</div>}

          <div className='d-flex justify-content-center align-items-start flex-column gap-5'>
            {/* coupon name */}
            <div className='d-flex gap-3'>
              
              <input type="text" id="coupon" className='fs-5' placeholder='Enter your coupon'
                {...register("couponName")}
              />
            </div>
            {errors.couponName && <div className='text-danger'>{errors.couponName.message}</div>}

            {/* address */}
            <div className='d-flex gap-3'>
              
              <input type="text" id="address" className='fs-5' placeholder='Enter your Addres'
                {...register("address", { required: "Address is required" })}
              />
            </div>
            {errors.address && <div className='text-danger'>{errors.address.message}</div>}

            {/* phone number */}
            <div className='d-flex gap-3'>
             
              <input type="text" id="phone" className='fs-5' placeholder='Enter your phone'
                {...register("phone", { required: "Phone is required",
                    pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits"
                  }})}
              />
            </div>
            {errors.phone && <div className='text-danger'>{errors.phone.message}</div>}

            {/* Submit Button */}
            <div className='d-flex align-items-center justify-content-center w-100'>
              <button type='submit' className='btn btn-dark rounded py-2 px-4'>Place order</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
