import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const Navigate = useNavigate()
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/Listings">My Listings</Link>
        <button onClick={()=>{
                localStorage.user=null;
                Navigate("/");
            }}>Logout</button>
    </nav>
  )
}

export default Navbar