const Blog = require("../models/Blog.schema");
const User = require("../models/user.schema");
const Fuse = require("fuse.js");


const blogPage = async (req, res) => {
  let { id, role } = req.cookies;

  if (role == "admin") {
    res.render("blog");
  } else {
    res.send("You are not authorized to access this page.");
  }
};

const addBlog = async (req, res) => {
  let { id } = req.cookies;
  let user = await User.findById(id);

  let { title, content, category, image } = req.body;
  let blog = await Blog.create({
    title,
    content,
    category,
    image,
    author: user.username,
  });
  res.cookie("blogId", blog.id).send(`blog created by ${user.username}`);
};

const allBlog = async (req, res) => {
  let { category } = req.query;
  if (category) {
    let blog = await Blog.find({ category });
    res.send(blog);
  } else {
    let blog = await Blog.find();
    res.send(blog);
  }
};

const blogs=async(req,res)=>{
    res.render("blogpage")
}

const updateBlog = async (req, res) => {
  let {id}=req.cookies
  let user=await User.findById(id)

  if (user.role == "admin") {
    const blogId = req.params.id;
    let { title, content, category, image } = req.body;
    let updateBLog = await Blog.findByIdAndUpdate(blogId, { title,content,category,image });
    updateBLog=await updateBLog.save();

    let blog = await Blog.find();
    res.status(200).send(blog);
  } else {
    res.status(400).send("only admin can update blog");
  }
};

const deleteBlog=async(req,res)=>{
  let {role}=req.cookies
  if(role=="admin"){
    let blog=await Blog.findByIdAndDelete(req.params.id)
    res.send(blog)
  }
}

const singleBlog=async(req,res)=>{
  let singleBlog=await Blog.findById(req.params.id)
  res.render('singleBlogPage',{singleBlog})
}

const Like=async(req,res)=>{
  let {id}=req.cookies
  let user=await User.findById(id)

  let blog=await Blog.findById(req.params.id)
  blog.likedBy.push({username:user.username})
  await blog.save()
  res.send(blog)
}

const comment=async(req,res)=>{
  let {id}=req.cookies
  let user=await User.findById(id)

  let blog=await Blog.findById(req.params.id)
  blog.comments.push({text:req.body.text,username:user.username})
  await blog.save()
  res.send(blog)
}

const Search=async(req,res)=>{
  let query = req.query.blogs;
  const blogs = await Blog.find();

  const options = {
    keys: ["author", "category", "title"],
  };
  const fuse = new Fuse(blogs, options);
  const result = fuse.search(query);
  res.send(result)
}

module.exports = { blogPage, addBlog, allBlog, updateBlog,deleteBlog,blogs,singleBlog,Like,comment,Search };
