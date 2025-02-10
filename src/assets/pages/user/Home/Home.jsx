import React from 'react'
import MyNavbar from '../../../component/user/Navbar/MyNavbar'
import style from './Home.module.css'
import { BsCoin } from "react-icons/bs";
import { RiRefund2Fill } from "react-icons/ri";
import { MdOutlineLocalShipping } from "react-icons/md";
import about from './about.png';

export default function Home() {
  return (
    <>
  
        <div className={`${style.aboutPage}`}>

          <div className='d-flex justify-content-center align-items-center'>
            <div className={`d-flex justify-content-center align-items-center gap-3 py-5 container flex-column ${style.ourStory}`} >
              <h2>Our Story</h2>
              <p>we believe in simplifying everyday life by bringing together products that truly matter.<br></br> Founded with the vision of creating a one-stop shop for quality and convenience, we carefully curate everything from skincare essentials that nurture your well-being, to toys that spark joy and creativity, to electronics that enhance your lifestyle, and home & kitchen solutions that make your space a haven. Every item we offer is chosen with love, ensuring it meets the highest standards of functionality, style, and value. At the heart of our story is you—our customer—and our commitment to making shopping effortless, enjoyable, and inspiring.<br></br><br></br> Welcome to a better way to shop.</p>
            </div>
          </div>
          
          <div className={`d-flex justify-content-between align-items-center container py-5 ${style.features}`} >
            <div className='d-flex flex-row gap-2'>
              <BsCoin /> 
              <p>Secure Payment</p>
            </div>
            <div className='d-flex flex-row gap-2'>
              <RiRefund2Fill />
              <p>Easy returns</p>
            </div>
            <div className='d-flex flex-row gap-2'>
              <MdOutlineLocalShipping />
              <p>Free Shipping</p>
            </div>
          </div>

          <div className={`d-flex gap-5 container ${style.about}`}>
            <img src={about} alt='plants image'/>
            <div className='d-flex flex-column gap-5 py-3'>
              <h3>Customer Experiences</h3>
              <p>Our relationship with you is built on trust and transparency. We take pride in our personalized customer service and strive to exceed your expectations with every interaction. Whether you're looking for advice on choosing the right style or need assistance with an order, our dedicated customer support team is here to help.</p>
              <p>Don't just take our word for it—hear what our customers have to say! We've received glowing reviews from individuals who love our sunglasses for their comfort, durability, and trendy designs. Your feedback inspires us to continuously improve and innovate.</p>
            </div>

          </div>

        </div>        
    </>
    
  )
}
