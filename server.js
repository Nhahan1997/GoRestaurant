require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const methodOverride = require("method-override");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./middlewares/auth");

const app = express();
const fs=require('fs'); //read file fs
var menu=[];  //create array to store these data from read file

app.use(session({ secret: 'somevalue' }));//'somevalue'
//add code here to solve deprecated


const initializePassport = require("./passport-config");
initializePassport(
  passport,
  async (email) => {
    const userFound = await User.findOne({ email });
    return userFound;
  },
  async (id) => {
    const userFound = await User.findOne({ _id: id });
    return userFound;
  }
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(express.static("public"));


app.get("/index", checkAuthenticated, (req, res) => {
  res.render("index", { name: req.user.name });
});

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register");
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login");
});
app.get("/", checkNotAuthenticated, (req, res) => {
  res.render("home");
});
//using for contact
app.get("/contact/", checkNotAuthenticated, (req, res) => {
  res.render("contact");
});

let k=0;
//readfile json menu and send data
fs.readFile('menu.json','utf8',function(err,data){       //function readfile
  if(err) throw err;                                   //if read file error, get the notice
  let readData=JSON.parse(data);                          //parse data and then store on variable readData
  for(const eachItem of readData){                     //loop to get data
    menu[k]={                       
      id:eachItem.id,                             //get id
      name:eachItem.name,                         //get name of food
      price:eachItem.price,                       //get price of food
      kind:eachItem.kind,                         //get kind of food
  }
  k=k+1;                                                //increament to store data via loop
  console.log(menu)                          // check data in console log
  }   

  //Restful API get
app.get("/buildapp/",checkNotAuthenticated,(req,res)=>{

  //res.send({menu:menu});

  res.render("buildapp");

})

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.post("/register", checkNotAuthenticated, async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });

  if (userFound) {
    req.flash("error", "User with that email already exists");
    res.redirect("/register");
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      await user.save();
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.redirect("/register");
    }
  }
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

mongoose
  .connect("mongodb://localhost:27017/auth", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on Port 3000");
    });
  })
})
