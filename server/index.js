const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();


dotenv.config({path:'./config.env'});
require("./database/conn");
const port = process.env.PORT;


// Meddelware
const Meddelware = (req,res, next) =>{
    console.log("This is meddelware")
    next()
}


app.get("/", (req,res)=>{
    res.send("This is home");
})
app.get("/about", Meddelware, (req,res)=>{
    res.send("This is about");
})
app.get("/conect", (req,res)=>{
    res.send("This is contsct");
})
app.get("/login", (req,res)=>{
    res.send("This is login");
})
app.get("/register", (req,res)=>{
    res.send("This is register");
})



app.listen(port,()=>{
    console.log(`Conection Succesfuly ${port}`)
})