import React from 'react'
import {Navigate} from 'react-router-dom'
export default function ProtectedRoute({children}) {

    const userToken=localStorage.getItem("userToken");

    if(userToken){
        console.log("already logged in");
       return <Navigate to='/products'/>
    }

  return children 
}