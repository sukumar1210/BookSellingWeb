import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import FetchBooks from './FetchBooks.jsx';
import "../App.css"
import { set } from 'mongoose';
import style from "../css/displayData.module.css"


function Home() {
    const [loggedin, setLogin] = useState(localStorage.getItem("user"))
    const [search, setSearch] = useState('')
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
            <Navbar/>
            <main className={style.main}>

                <div className={style.sidebar}>
                    <form
                        className={style.search}
                        onSubmit={async (e) => {
                            e.preventDefault()
                            console.log("search: ", search);
                            setSearch(e.target[0].value)
                            console.log("here: ", search)
                            
                    }}>
                        <label>
                            <input
                                id="title"
                                type="text"
                                placeholder='Search Book'
                            />
                        </label>
                        <button type='submit'>Search</button>
                    </form>
                    <div className={style.filter}>
                        Filters
                    </div>
                </div>
                <table className={style.displayData} rules='all'>
                    <thead>
                        <tr>
                            <th>Sr. no.</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <FetchBooks user={JSON.parse(localStorage.getItem("user"))} Title={search} />
                    </tbody>
                </table>
            </main>
            {/* <p>{result}</p> */}
        </>
    )
}

export default Home