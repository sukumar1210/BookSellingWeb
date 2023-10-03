import mongoose from "mongoose";

const bookschema = mongoose.Schema(
    {
        Title: {
            type: String,
            required: true
        },
        Author: {
            type: String,
            required: true
        },
        Genre: {
            type: [String],
            required: true
        },
        Price: {
            type: Number,
            required: true
        },
        Sold:{
            type: Boolean,
            required: true,
            default: false
        },
        // User: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: "User"
        // }
    },
    {
        timestamps: true
    }
)
    
export const Book = mongoose.model("books", bookschema);