const express = require("express");                       //create constant using express 
const mongoose = require("mongoose");                    //create constant using mongoose
const passport = require("passport");                    //Passport is an authentication middleware for Node
                                                         // that authenticates requests.
const session = require("express-session");              //Create a session middleware with the given options.
const methodOverride = require("method-override");       //create constant using methodOverride
const flash = require("express-flash");                  //create constant using flash

const User = require("./models/User");                  //create constant using User
const bcrypt = require("bcryptjs");                     //create constant using bcry
const {
  checkAuthenticated,                                     //using checkAuthenticated middlewares
  checkNotAuthenticated,
} = require("./middlewares/auth");

const app = express();                              
const fs=require('fs');                                  //read file fs
var menu=[];                                             //create array to store these data from read file

app.use(session({ secret: 'somevalue' }));                  //'somevalue'
//add code here to solve deprecated


const initializePassport = require("./passport-config");   
initializePassport(                                         
  passport,
  async (email) => {                                         //check authentication with email asynchronous
    const userFound = await User.findOne({ email });               
    return userFound;
  },
  async (id) => {                                           //check authentication with id asynchronous
    const userFound = await User.findOne({ _id: id });
    return userFound;
  }
);

app.set("view engine", "ejs");                             // using view engine with ejs
app.use(express.urlencoded({ extended: true }));         
app.use(flash());                                          //using flash
app.use(           
  session({                                                //using a session middleware with the given options.
    secret: process.env.SESSION_SECRET,                   
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());                            //using passport initialize    
app.use(passport.session());                               
app.use(methodOverride("_method"));
app.use(express.static("public"));                         //using express static public
app.use(express.json());


app.get("/index", checkAuthenticated, (req, res) => {       //get index and checkAuthenticated, then render index file
  res.render("index", { name: req.user.name });
});

app.get("/register", checkNotAuthenticated, (req, res) => { // get page register and render register file
  res.render("register");
});

app.get("/login", checkNotAuthenticated, (req, res) => { //get login page and render login file
  res.render("login");
});
app.get("/", checkNotAuthenticated, (req, res) => {         //get home page and render home file
  res.render("home");                               
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
app.get("/contact",checkNotAuthenticated,(req,res)=>{       //get contact page and render contact file


 res.render("contact");
 //res.send({menu:menu});

})
app.get("/buildapp",checkNotAuthenticated,(req,res)=>{      //get buildapp page and render buildapp file


  res.render("buildapp");

 
 })
 app.get("/buildapp/menu",checkNotAuthenticated,(req,res)=>{

  res.send({menu:menu});
  
 })
app.post(                                             //method post if authenticated and failure return this login page
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.post("/register", checkNotAuthenticated, async (req, res) => {   //get the register page
  const userFound = await User.findOne({ email: req.body.email });   //using userFound to compare that users are aldready created or not

  if (userFound) {                       //if userFount true
    req.flash("error", " Please register with another user, this email has been used to create account");  //notify this email has been used
    res.redirect("/register");                  //otherwise keep the register page
  } else {
    try {                                                            //using try catch to alert error
      const hashedPassword = await bcrypt.hash(req.body.password, 10);  
      const user = new User({                                   //grab user in name, email and password
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      await user.save();
      res.redirect("/login");                                //go to login page
    } catch (error) {
      console.log(error);
      res.redirect("/register");                            //if error return to register page
    }
  }
});

app.delete("/logout", (req, res) => {                 
  req.logOut();
  res.redirect("/");
});

mongoose
  .connect("mongodb://localhost:27017/auth", {              //using mongoose for database of creating email
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on Port 3000");
    });
  })
})
