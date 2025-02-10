import React from 'react'
import MyNavbar from '../component/user/Navbar/MyNavbar'
import {Outlet} from 'react-router-dom'
import Footer from '../component/user/Footer/Footer'

export default function AuthLayout() {
  return (
    <>
      <MyNavbar />
      <Outlet/>
      <Footer />
    </>
  )
}
