const information=(req,res,next)=>{
    let {title,content,category,image}=req.body
    console.log(req.data);
    if(!title || !content || !category || !image){
        res.send(`All fields are required`)
    }
    else{
        next()
    }
}

module.exports=information