const express=require("express")
const {blogPage, addBlog, allBlog, updateBlog, deleteBlog, blogDetaile, blogs, singleBlog, Like, comment, Search} = require("../controllers/blog-controle")
const information = require("../middleware/detailes")


const blog=express()

blog.get('/create',blogPage)
blog.post('/create',information,addBlog)
blog.get('/blogs',allBlog)
blog.get('/',blogs)
blog.patch('/edit/:id',updateBlog)
blog.delete('/delete/:id',deleteBlog)
blog.get('/singleBlog/:id',singleBlog)
blog.patch('/like/:id',Like)
blog.patch('/comment/:id',comment)
blog.get(`/search`,Search)

module.exports=blog
