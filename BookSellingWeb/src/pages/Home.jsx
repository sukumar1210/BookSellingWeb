import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { URL } from '../config.js';
import Navbar from './components/navbar.jsx';


function Home() {
    const [loggedin, setLogin] = useState(localStorage.getItem("user"))
    const navigate = useNavigate()
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser || loggedInUser == "null") {
            navigate("/login");
        }
        else {
            console.log("Logged in user: ", loggedInUser)
            // axios.post(`${URL}/`, {loggedInUser})
            // .then((res) => {
            //     console.log("in Then")
            //     console.log(res)
            //     return res
            // }).catch((err) => {
            //     console.log("in catch")
            //     console.log(err)
            //     return err
            // })
            navigate("/")
        }
    }, [localStorage.user, loggedin]);
    
    return (
        <>
            <h1>Home</h1>
            <Navbar />
            {/* <p>{result}</p> */}
        </>
    )
}

export default Home