import mongoose from "mongoose";

const userSchema=mongoose.Schema(
    {
        Name:{
            type: String,
            required: true
        },
        Email:{
            type: String,
            required: true,
            unique: true
        },
        Password:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model("users",userSchema);
