const express=require("express");
const connect = require("./config/db");
const cookie=require("cookie-parser")
const user = require("./routes/user-route");
const blog = require("./routes/blog-route");
require("dotenv").config

const app=express()

app.use(express.json())
app.use(cookie())

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send("Welcome to the movie API")
})


app.use(user)
app.use("/blog",blog)

app.listen(8090,()=>{
    console.log("connect to port 8090");
    connect()
})