import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate()
    let a=0
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) return navigate("/login");
        else {
            console.log(a++)
            console.log("user", loggedInUser)
        }
        // navigate("/login")
    }, []);
    return (
        <h1>Home</h1>
    )
}

export default Home