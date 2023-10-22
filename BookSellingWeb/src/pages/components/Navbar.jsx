import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from "../../css/navbar.module.css"

function Navbar(props) {
    const Navigate = useNavigate()
  return (
    <div className={style.header}>
      {/* <p>BookSellingWeb</p> */}
      BookSellingWeb
      <nav className={style.nav}>
          <Link className={style.routerLink} to="/">Home</Link>
          <Link className={style.routerLink} to="/Listings">My Listings</Link>
          <button onClick={()=>{
                  localStorage.user=null;
                  Navigate("/");
              }}>Logout</button>
      </nav>
    </div>
  )
}

export default Navbar 
