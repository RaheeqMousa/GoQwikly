import React from 'react'
import style from './footer.module.css'
import { Link } from'react-router-dom';
import { FaFacebook } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';

export default function Footer() {

  return (
    <div className={` ${style.footer} `}>
        <div className={`container ${style.container} `}>
            <div className="d-flex flex-wrap justify-content-between gap-4">
                <h5>GoQwikly</h5>
                <div className="d-flex flex-wrap justify-content-center gap-4">
                <Link to="/Home">Home</Link>
                <Link to="/Home">products</Link>
                </div>                
            </div>
            <div className="d-flex flex-wrap justify-content-between gap-3">
                <p>Copyright © 2025 raheeqmousa99@gmail.com. All rights reserved</p>
                <a href="#">Privacy Policy</a>
                <div className="d-flex flex-wrap d-grid gap-3 fs-4">
                <a href="https://www.facebook.com/raheeqm.mousa" target="_blank"><FaFacebook color='white'/></a>
                <a href="https://www.facebook.com/raheeqm.mousa" target="_blank"><FaInstagram color='white'/></a>
                <a href="https://www.linkedin.com/in/raheeq-mousa-b960b7291/" target="_blank"><FaLinkedin color='white'/></a>                  
            </div>
        </div>
        </div>
    </div>
  
  )
}
