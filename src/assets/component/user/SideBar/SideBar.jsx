import React, { useEffect,useState,useContext } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import style from './SideBar.module.css'
import { BiCollapse } from "react-icons/bi";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../context/UserContext.jsx'

export default function SideBar({ items, parent }) {

    const [isCollapsed,setIsCollapsed]= useState(false);
    const {logout} = useContext(UserContext);

    const toggle=()=>{
        setIsCollapsed(!isCollapsed);
    }

    const navigate=useNavigate();
    const handleLogout= ()=>{
        logout();
        navigate('/auth/login');
        console.log("logged out",localStorage.getItem('userToken'));
    }

    return (
        <>
            <Sidebar collapsed={isCollapsed} className={`${style.Sidebar}`} >
                {isCollapsed?
                    <BsArrowsFullscreen onClick={toggle}/>:
                    <BiCollapse onClick={toggle}/>
                }
                <Menu
                    menuItemStyles={{
                        button: {
                            // the active class will be added automatically by react router
                            // so we can use it to style the active menu item
                            [`&.active`]: {
                                backgroundColor: '#13395e',
                                color: '#b6c8d9',
                            },
                        },
                    }}
                >
                    {
                        items.map((item, index) => {
                            return item.name==="Logout" ?(
                                <MenuItem key={index} >
                                    <div className='d-flex gap-2' onClick={handleLogout}>
                                        <item.icon/>
                                        {item.name}
                                    </div>
                                </MenuItem>):(
                                <MenuItem key={index} component={<Link to={`/${parent}/${item.name}`} />}>               
                                    <div className='d-flex gap-2'>
                                        <item.icon/>
                                        {item.name}
                                    </div>  
                                </MenuItem> )         
                            })
                    }
                </Menu>
            </Sidebar>
        </>

    )
}