import React, { useContext, useEffect} from 'react'
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

export default function MyNavbar() {

  const {cartCount,setCartCount} = useContext(CartContext);

  useEffect(() =>{
    setCartCount(0);
  },[])

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
            <Nav.Link to={'/cart'} as={Link}>
              <FaCartShopping style={{ color: 'black', fontSize: '1.25rem' }} />{cartCount}
            </Nav.Link>
            <Nav.Link to={'/profile'} as={Link}>
              <FaUser style={{ color: 'black', fontSize: '1.25rem' }} />
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
