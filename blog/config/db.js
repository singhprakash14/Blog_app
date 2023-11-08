const mongoose =require("mongoose")

const connect=async()=>{

    await mongoose.connect("mongodb+srv://prakash14:prakash14@cluster0.hvj6tki.mongodb.net/Blog_?retryWrites=true&w=majority")
    console.log("conncet to db");
}

module.exports=connect