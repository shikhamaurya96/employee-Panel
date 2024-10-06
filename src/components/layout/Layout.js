import React from 'react'
import Header from '../header/Header'

import { Outlet,Navigate } from 'react-router-dom'

const Layout = () => {
   const token = localStorage.getItem("token") 
    return (
        (token)?<><Header/><Outlet/></>:<Navigate to={"/login"}/>
    )
  
}

export default Layout