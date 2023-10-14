import express from 'express';
import mongoose from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
import {PORT, DB_URL, JWT_Key} from './config.js';
import { Book } from './models/bookModel.js';
import cors from 'cors';
import { User } from './models/userModel.js';

const app=express();

mongoose.connect(DB_URL).then(
    ()=>{
        console.log("Connected to DB");
        app.listen(PORT,()=>{
            console.log(`Server running on port ${PORT}`);
        })
    }
).catch(
    (err)=>{
        console.log("Error connecting to DB");
        console.log(err);
    }
)


app.use(cors());

app.use(express.json()); 

app.get('/', (req,res)=>{
    console.log(req.body);
    console.log('request received get here');
    const data = {
        name: 'John',
        age: 23
    }
    return res.status(269).send(data);
})

app.get("/browse", async (req, res) => {
    const query = req.query;
    const DBQuery = {};
    if (query.Title) DBQuery.Title = {
        $regex: query.Title,
        $options: "i"
    }
    if (query.Author) DBQuery.Author = query.Author;
    if (query.Genre) DBQuery.Genre = query.Genre;
    if (query.Price) DBQuery.Price = query.Price;
    if (query.User) DBQuery.User = query.User;
    console.log("query: ", DBQuery);
    await Book.find(DBQuery).then((books) => {
        return res.status(200).send(books);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    })
})

// Dummy Route for learning Purposes
app.post('/', (req,res)=>{
    console.log('request received post');
    console.log(req.body);
    return res.status(269).send(req.body);

})

// Signup Route
app.post("/signup", (req,res) => {
    console.log("req.body: ", req.body);
    const password = jsonwebtoken.sign(req.body.password, JWT_Key)
    console.log(jsonwebtoken.verify(password, JWT_Key));
    const user = User.create({
        Name: req.body.name,
        Email: req.body.email,
        Password: password
    }).then((user) => {
        console.log(user);
        return res.status(201).send(user);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    })
});

app.post("/login", (req,res) => {
    console.log("req.body: ", req.body);
    if (
        !req.body.email ||
        !req.body.password
    ) {
        return res.status(400).send("Bad Request");
    } else {

        const user = User.findOne({
            Email: req.body.email
        }).then((user) => {
            if (user == null) {
                return res.send({
                    valid: false,
                    message: "User not found"
                });
            } else {
                
                console.log(user.Password);
                const password = user.Password;
                const payload = jsonwebtoken.verify(password, JWT_Key);
                if(req.body.password == payload){
                    console.log("Payload: ", payload);
                    return res.status(201).send({
                        valid: true,
                        _id: user._id,
                    });
                } else {
                    return res.send({
                        valid: false,
                        message: "Password Invalid"
                    });
                }
            }
        }).catch((err) => {
            console.log(err);
            return res.status(500).send("Database Error");
        })
    }
    });


// ----------------------------------------------------------------

app.post("/books", async (req,res) => {
    try{
        if(
            !req.body.Title ||
            !req.body.Author ||
            !req.body.Genre ||
            !req.body.Price 
            // !req.body.User
        ){
            return res.status(400).send("Bad Request");
        }
        const book = await Book.create(
            {
                Title: req.body.Title,
                Author: req.body.Author,
                Genre: req.body.Genre,
                Price: req.body.Price
                // User: req.body.User
            }
        )
        return res.status(201).send(book);
    } catch (err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});