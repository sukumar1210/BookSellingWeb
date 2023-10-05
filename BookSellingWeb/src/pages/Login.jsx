import { useState } from 'react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Signup from './Signup'
import axios from 'axios'
import {URL} from "../config.js"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
  return (
    <>
        <h3>Login</h3>
        <form
            onSubmit={(e) => {
                // console.log({ email, password })
                console.log(e.preventDefault())
                axios.post(`${URL}/login`, {email, password}).then((res)=>{
                    if (res.data.valid){
                        localStorage.setItem('user', JSON.stringify({ _id: res.data._id, email}))
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
            <label>Email</label>
            <input
                type='email'
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
            ></input>
            <br />
            <label>Password</label>
            <input 
                type="password" 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
        <span>Don't have an Account yet? </span>
        <Link to="/signup">Signup</Link>
    </>
  )
}

export default Login