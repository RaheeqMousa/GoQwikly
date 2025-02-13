import react,{useState,useEffect, useContext} from 'react';
import Loader from '../../../component/user/Loader/Loader.jsx'
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from './Image.jsx'
import style from './Profile.module.css'
import { UserContext } from '../../../component/user/context/UserContext.jsx'

export default function(){

    const {user} = useContext(UserContext);

    return(
        <>
           <section className={`d-flex justify-content-center align-items-center flex-column ${style.Information}`}>
                <Image />
                <h5>{user.userName}</h5>
                <p>{user.email}</p>
           </section>
        </>
    )

}