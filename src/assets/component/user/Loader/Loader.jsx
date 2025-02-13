import React from 'react';
import style from './Loader.module.css'

export default function Loader() {
  return (
    <>
        <div className={`d-flex justify-content-center align-items-center ${style.load}`}>
            <span className={`${style.loader}`}></span>
        </div>
    </>
  )
}
