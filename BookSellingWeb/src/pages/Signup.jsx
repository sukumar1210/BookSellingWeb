import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {URL} from "../config.js"
import axios from 'axios'

function Signup() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
  return (
    <>
        <h3>Signup</h3>
        <form
            onSubmit={(e) => {
                console.log({ email, name, password })
                e.preventDefault()
                axios.post(`${URL}/signup`, { email, name, password })
                .then((res) => {
                    console.log(res)
                    navigate("/")
                })
                .catch((err) => {
                    console.log(err)
                }) 
                // localStorage.setItem('user', JSON.stringify({ email }))
            }}>
            <label>Email</label>
            <input
                type='email'
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
            ></input>
            <br />
            <label>Name</label>
            <input 
                type="text" 
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label>Password</label>
            <input 
                type="password" 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Signup</button>
        </form>
        <span>Already have an Account yet? </span>
        <Link to="/login">Login</Link>
    </>
  )
}

export default Signup