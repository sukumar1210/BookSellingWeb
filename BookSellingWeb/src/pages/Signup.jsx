import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import style from "../css/creds.module.css"

function Signup() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const navigate = useNavigate()
  return (
    <div className={style.page}>
        <div className={style.container}>

            <h3>Signup</h3>
            <form
                onSubmit={(e) => {
                    console.log({ email, name, password , confPassword})
                    e.preventDefault()
                    if (password !== confPassword){
                        console.log("Passwords don't match")
                        
                    } else {
                        axios.post(`/signup`, { email, name, password })
                        .then((res) => {
                            console.log(res)
                            navigate("/")
                        })
                        .catch((err) => {
                            console.log(err)
                        }) 
                        // localStorage.setItem('user', JSON.stringify({ email }))
                    }
                }}>
                <label>    
                    <input
                        id = 'email'
                        type='email'
                        placeholder='Email address'
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    ></input>
                </label>
                <br />
                <label>
                    <input 
                        id='name'
                        type="text" 
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
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
                <label>
                    <input 
                        id='conf-password'
                        type="password" 
                        placeholder="Confirm Password"
                        onChange={(e) => setConfPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Signup</button>
            </form>
            <span>
                <span>Already have an Account yet? </span>
                <Link to="/login" className={style.routerLink}>Login</Link>
            </span>
        </div>
    </div>
  )
}

export default Signup