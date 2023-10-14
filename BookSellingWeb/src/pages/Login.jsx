import { useState } from 'react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import Signup from './Signup'
import axios from 'axios';
import style from "../css/creds.module.css"
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
  return (
    // < className='container'>
    <div className={style.page}>
        <div className={style.container}>
            <h3>Login</h3>
            <form
                onSubmit={async (e) => {
                    // console.log({ email, password })
                    console.log( e.preventDefault())
                    await axios.post(`/login`, {email, password}).then((res)=>{
                        if (res.data.valid){
                            localStorage.setItem('user', JSON.stringify({ _id: res.data._id, email}))
                            // localStorage.user={ _id: res.data._id, email}
                            navigate("/")
                        }
                        else{
                            console.log(res.data.message)
                        }
                    }).catch((err)=>{
                        console.log("Internal Server error")
                        console.log(err)
                    })
                }}>
                <label>    
                    <input
                        id='email'
                        type='email'
                        placeholder='Email address'
                        autoComplete="on"
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    ></input>
                </label>
                <br />
                <label>
                    <input 
                        id='password'
                        type="password" 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            <span>
                <span>Don't have an Account yet? </span>
                <Link to="/signup" className={style.routerLink}>Signup</Link>
            </span>
        </div>
    </div>
  )
}

export default Login