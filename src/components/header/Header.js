import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem("username")
  const handleLogout = ()=>{
    localStorage.removeItem("token");
       navigate("/login")
  }
  return (
    <>
    <nav className="bg-neutral text-neutral-content fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
    <div className='flex space-x-8'>
    <Link to={"/"} className="flex items-center space-x-8 rtl:space-x-reverse font-bold text-xl">
      Home
  </Link>
  <Link to={"/list"} className="flex items-center space-x-3 rtl:space-x-reverse  text-lg">
      Employee List
  </Link>
    </div>
  
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <h1 className='m-3'>{username}</h1>
      <button type="button" onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Logout
        </button>
      
  </div>
  
  </div>
</nav>
</>
  )
}

export default Header