const User = require("../models/user.schema");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  let { username, email, password, role } = req.body;

  let user = await User.findOne({ email });
  if (user) {
  } else {
    await User.create({
      username,
      email,
      password,
      role,
    });
  }
  res.cookie("role", user.role);
  res.cookie("id", user.id).send(`Account created successfully ${username}`);
};

const registerPage = (req, res) => {
  res.render("signup");
};

const loginPage = (req, res) => {
  // if(req.cookies.token) return res.send("You are alredy logged")
  res.render("login");
};

const Login = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    res.send("Invalid Credentials.");
  } else if (user.email !== email || user.password !== password) {
    res.send("Invalid Credentials.");
  } else {
    res.cookie("role", user.role);
    res
      .cookie("id", user.id, { httpOnly: true })
      .send(`Welcome User ${user.username}`);
  }
};

const deleteUser = async (req, res) => {
  let user = await User.findByIdAndDelete(req.params.id);

  if (!user) return res.send("User Not Found");

  res.send(`user deleted [${user.username}]`);
};


module.exports = { Register, registerPage, loginPage, Login, deleteUser };
