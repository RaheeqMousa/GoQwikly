import React,{useState,useEffect} from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import style from './Profile.module.css'
import SideBar from '../../../component/user/SideBar/SideBar'
import { Outlet } from 'react-router-dom';
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaInfoCircle } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

export default function Profile() {

    const items_list = [
        {name:"Information", icon:FaInfoCircle},
        {name:"Orders", icon:MdLocalShipping},
        {name:"Logout", icon:CiLogout}
    ];
    
    return (
        <>
            <div className='d-flex flex-wrap'>
                <SideBar items={items_list} parent={"profile"} />      
                <Outlet  />
            </div>     
        </>
    )
}