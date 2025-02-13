import React from 'react';
import style from './DiscountLine.module.css'; // Import CSS module

export default function DiscountLine() {
  return (
    <div className={`${style.discountBanner}`}>
      <div className={`${style.discountLine}`}>
        <span className={style.line}></span>
        <span className={style.discountText}>50% OFF</span>
        <span className={style.line}></span>
      </div>
    </div>
  );
}
