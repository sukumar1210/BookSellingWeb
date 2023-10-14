import axios from 'axios';
import React, { useEffect, useState } from 'react';

function FetchBooks(props) {
    let count=0;
    const [books, setBooks] = useState([])
    const query = {
        Title: props.Title,
        Author: props.Author,
        Price: props.Price,
        Genre: props.Genre,
    }
    console.log("query: ", query);
    useEffect(()=>{
        axios.get(`/browse/`, {params : query})
        .then((res) => {
            setBooks(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [props.Title])
    return (
    books.map((book, index) => {
        return (
            <tr key={book._id}>
                <td>{index + 1}</td>
                <td>{book.Title}</td>
                <td>{book.Author}</td>
                <td>{book.Genre.map((val, index)=>{
                    return (<span className='Genre' key={index}>{val}</span>)
                })}</td>
                <td>{book.Price}</td>
                <td>
                    <button>Buy</button>
                    <button>Add To Cart</button>
                </td>
            </tr>
        )
    })
  )
}
    // const books = [
    //     {
    //         Title: "The Great Gatsby",
    //         Author: "F. Scott Fitzgerald",
    //         Genre: "Classic",
    //         Price: 10.99,
    //         _id: 1
    //     },
    //     {
    //         Title: "To Kill a Mockingbird",
    //         Author: "Harper Lee",
    //         Genre: "Classic",
    //         Price: 12.99,
    //         _id: 2
    //     },
    //     {
    //         Title: "1984",
    //         Author: "George Orwell",
    //         Genre: "Dystopian",
    //         Price: 9.99,
    //         _id: 3
    //     },
    //     {
    //         Title: "The Catcher in the Rye",
    //         Author: "J.D. Salinger",
    //         Genre: "Coming-of-age",
    //         Price: 8.99,
    //         _id: 4
    //     }
    // ];

export default FetchBooks