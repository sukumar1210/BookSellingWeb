import { useState } from 'react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Signup from './Signup'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
  return (
    <>
        <h3>Login</h3>
        <form
            onSubmit={(e) => {
                console.log({ email, password })
                console.log(e.preventDefault())
                localStorage.setItem('user', JSON.stringify({ email }))
                navigate("/")
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