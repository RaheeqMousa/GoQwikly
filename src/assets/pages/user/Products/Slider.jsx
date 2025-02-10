import React from 'react'
import Furn from './Furniture.png';
import dolls from './dolls.png';
import elec from './elec.png';
import Carousel from 'react-bootstrap/Carousel';
import style from './Slider.module.css';
export default function Slider() {


    return (
        <Carousel className={`${style.slide}`}>
          <Carousel.Item className={`${style.item}`}>
            <img src={dolls} />
            <Carousel.Caption className={`${style.caption}`}>
              <h3>Softy Dolls</h3>
              <p>Bring joy and creativity to your child's world.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className={`${style.item}`}>
            <img src={Furn} />
            <div>
                <Carousel.Caption className={`${style.caption}`}>
                    <h3>Colorful Furniture</h3>
                    <p>Revitalize your home with vibrant furniture.</p>
                </Carousel.Caption>
            </div>
            
          </Carousel.Item>
        </Carousel>
      );

}