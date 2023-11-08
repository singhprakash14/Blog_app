const express=require("express")
const {Register, registerPage, loginPage, Login, deleteUser} = require("../controllers/user-controle.js")

const user=express()

user.get("/user/signup",registerPage)
user.post("/user/signup",Register)
user.get("/user/login",loginPage)
user.post("/user/login",Login)
user.delete('DELETE/users/:id',deleteUser)



module.exports=user
