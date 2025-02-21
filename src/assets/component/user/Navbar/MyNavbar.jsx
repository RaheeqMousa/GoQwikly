import React, { useContext, useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUser } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import style from './MyNavbar.module.css'
import {CartContext} from '../context/CartContext'
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function MyNavbar() {

  const {cartCount,setCartCount} = useContext(CartContext);
  const [isInputVisible, setIsInputVisible] = useState(false);
  useEffect(() =>{
    setCartCount(0);
  },[])

  const toggleSearch=()=>{
    setIsInputVisible(!isInputVisible);
  }

  const navigate=useNavigate();
  const handleSearch=()=>{
    setIsInputVisible(false);
    navigate(`/search/${event.target.value}`);
  }

  const handleKeyPress=(event)=>{
    if(event.key === 'Enter'){
      handleSearch();
    }
  }

  return (
    <div>
    <Navbar expand="lg" className={`${style.nav}`}  >
        <Container className="d-flex justify-content-between">
        <Navbar.Brand >GoQwikly</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto"> 
            <Nav.Link to={'/home'} as={Link}>Home </Nav.Link>
            <Nav.Link to={'/products'} as={Link}>products </Nav.Link>
            <Nav.Link to={'/contact'} as={Link}>Contact us </Nav.Link>
            </Nav>
        </Navbar.Collapse>


        <div className="d-flex align-items-center gap-3">

            <div className='d-flex align-items-center gap-2'>
              {isInputVisible &&
                <div>
                  <input type="text" placeholder='Search' className={`fs-5 ${style.searchInput}`} onKeyDown={handleKeyPress} />
                </div>          
              }
              <FaSearch className={`${style.navbarIcons}`} onClick={toggleSearch} />
            </div>
            
            <Nav.Link to={'/cart'} as={Link}>
              <FaCartShopping className={`${style.navbarIcons}`}/>{cartCount}
            </Nav.Link>
            <Nav.Link to={'/profile'} as={Link}>
              <FaUser className={`${style.navbarIcons}`} />
            </Nav.Link>
            <Nav.Link to={'/auth/login'} as={Link}>
             login
            </Nav.Link>
            <Nav.Link as={Link} to={'/auth/register'}>
              register
            </Nav.Link>
        </div>

        </Container>
    </Navbar>
  </div>
  )
}
