const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:String,
    password:String,
    email:String,
    role: {
      type: String,
      enum: ["user", "admin"], 
      default: "user", 
    }
})

const User=mongoose.model("user",userSchema)

module.exports=User