const express = require("express");                       //create constant using express 
const mongoose = require("mongoose");                    //create constant using mongoose
const passport = require("passport");                    //Passport is an authentication middleware for Node                                                         // that authenticates requests.
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
var menus=[];                                             //create array to store menus from read file
var reservations=[];                                       //create array to store reservations from read file
var sizes=[];                                              //create array to store sizes
var orders=[];
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
fs.readFile('menu.json','utf8',function(err,data){       //function readfile menu
  if(err) throw err;                                   //if read file error, get the notice
  let readData=JSON.parse(data);                          //parse data and then store on variable readData
  for(const eachItem of readData){                     //loop to get data
    menus[k]={                       
      id:eachItem.id,                             //get id
      name:eachItem.name,                         //get name of food
      price:eachItem.price,                       //get price of food
      kind:eachItem.kind,                         //get kind of food
  }
  k=k+1;                                                //increament to store data via loop
  console.log(menus)                          // check data in console log
  }   
})

  let j=0;
  fs.readFile('reservation.json','utf8',function(err,data1){       //function readfile for reservation
    if(err) throw err;                                   //if read file error, get the notice
    let readData1=JSON.parse(data1);                          //parse data and then store on variable readData
    for(const eachItem of readData1){                         //loop to get data
      reservations[j]={                       
        id:eachItem.id,                                      //get id
        customer:eachItem.customer,                         //get customer of reservation
        seat:eachItem.seat,                                 //get seat booking for customer
        available:eachItem.available,                       //get information of seats is booked or empty
        time:eachItem.time,                                //get time that customer booking
    }
    j=j+1;                                                //increament to store data via loop
    console.log(reservations)                          // check data in console log
    }
  })   
  
  let m=0;
    //read size file

    fs.readFile('size.json','utf8',function(err,data2){       //function readfile for size
      if(err) throw err;                                   //if read file error, get the notice
      let readData2=JSON.parse(data2);                     //parse data and then store on variable readData
      for(const eachItem of readData2){                    //loop to get data
        sizes[m]={                       
          id:eachItem.id,                                 //get id
          size:eachItem.size,                            //get size
          favorite: eachItem.favorite,                    //get favorite 
          featured:eachItem.featured                      //get feature
         
      }
      m=m+1;                                                //increament to store data via loop
      console.log(sizes)                          // check data in console log
      }
    })   
    //read file order.json
    

    let n=0;
    //read size file

    fs.readFile('order.json','utf8',function(err,data3){       //function readfile for order
      if(err) throw err;                                   //if read file error, get the notice
      let readData3=JSON.parse(data3);                          //parse data and then store on variable readData
      for(const eachItem of readData3){                     //loop to get data
        orders[n]={    
          id:eachItem.id,                                  //id for each order
          name: eachItem.name,                             //name for each order 
          food:eachItem.food,                             //food for each order
          quantity:eachItem.quantity,                     //quantity for each order
          size: eachItem.size,                            //size for each order
          add:eachItem.add                                //add for each order
         
      }
      n=n+1;                                                //increament to store data via loop
      console.log(orders)                          // check data in console log
      }
    })   
    //read file order.json
    


  //Restful API get
app.get("/contact",checkNotAuthenticated,(req,res)=>{       //get contact page and render contact file


 res.render("contact");
 //res.send({menu:menu});

})
app.get("/buildapp",checkNotAuthenticated,(req,res)=>{      //get buildapp page and render buildapp file


  res.render("buildapp");

  })
 app.get("/buildapp/menus",checkNotAuthenticated,(req,res)=>{   //send data menus when get the pages

  res.send({menus:menus});
  
 })

 app.get("/buildapp/menus/sizes",checkNotAuthenticated,(req,res)=>{  //send data of size

  res.send({sizes:sizes});                                          //send data sizes into page
  
 })


 //when getting to oder
//send data of order

app.get("/order/orders",checkNotAuthenticated,(req,res)=>{  //send data of order

  res.send({orders:orders});                               
  
 })



//new post here
app.post('/buildapp/menus',function(req,res){
  var textmenuName=req.body.name;     //using body parser to get text data on scripts input and story via assign3text
  var idforMenu=req.body.id;    //using body parse to get user_ID input on scripts file
  //var newPrice=req.body.
  var newprice=req.body.price;
  var newkind=req.body.kind;
  
                   
   menus.push({               //push these data on server
     id:idforMenu,              //push id for menus
     name:textmenuName,          //push name for menus
     price:newprice,              //push price for menus
     kind:newkind,         //push kind for menus
  });
  res.send('successfully created');
})

//put here FOR MENU

app.put('/buildapp/menus/:id',function(req,res){   
  var id=req.params.id;                         //wrap id 
  var newname=req.body.name;      //wrap newname that input and store name
  var newprice=req.body.price;     //wrap newprice that input and store price
  var newkind=req.body.kind;        //wrap newkind that input and store new kind
  var found=false;                          
 
  
 menus.forEach(function(menu,index){   //loop all items
  if(!found&&menu.id==Number(id)){                   
     menu.name=newname;                        //found name and new name
     menu.price=newprice;                      //found price and new price
     menu.kind=newkind;                        //found kind and new kind
  }
})


     res.send('successfully updated data');   //message display when successfully updated
})
//delete here

app.delete('/buildapp/menus/:id',function(req,res){
  var id=req.params.id;                        //wrap id for deleting
  var found=false;
  menus.forEach(function(menu,index){ //loop menu by id
     if(!found&&menu.id==Number(id)){
          menus.splice(index,1);
     }
  })

  res.send('successfully deleted product');
})
//for new website
app.get("/createmenu",checkNotAuthenticated,(req,res)=>{  //build an app for menu

  res.render("createmenu");                               //render website menu using data from menu
  
 })
 app.get("/createmenu/menus",checkNotAuthenticated,(req,res)=>{  

  res.send({menus:menus});                             //sending data of menus while reaching the menus page
  
 })

//new put here
//for reservation 
app.get("/reservation",checkNotAuthenticated,(req,res)=>{      //get reservation page and render reservation pages


  res.render("reservation");

  })
 app.get("/reservation/reservations",checkNotAuthenticated,(req,res)=>{ //get reservations and send data

  res.send({reservations:reservations});                             //data of reservation
  
 })

 //post here for RESERVATION app
 app.post('/reservation/reservations',function(req,res){
  var newCustomer=req.body.customer;                      //using body parser to get customer
  var idforCustomer=req.body.id;                         //using body parse to ID for reservation
  var newSeat=req.body.seat;                             //using body parse to get Seat for reservation
  var newAvailable=req.body.available;                   //using body parse to get available reservation
  var newTime=req.body.time;                             //using body parse to get time for reservation
  
                   
   reservations.push({               
     id:idforCustomer,                                  //post id
     customer:newCustomer,                              //post customer
     seat:newSeat,                                      //post seat
     available:newAvailable,                            //post available
     time:newTime,                                      //screen_name
  });
  res.send('successfully created');
})
//put here for RESERVATION app

app.put('/reservation/reservations/:id',function(req,res){   
  var id=req.params.id;                         //wrap id 
  var newCustomer=req.body.customer;            //wrap customer name that input and store newsCustomer
  var newSeat=req.body.seat;                    //wrap seat 
  var newAvailable=req.body.available;         //wrap available
  var newTime=req.body.time;                    //wrap newTime input for reservation
  var found=false;                          
 
  
 reservations.forEach(function(reservation,index){   //loop all items
  if(!found&&reservation.id==Number(id)){                   
     reservation.customer=newCustomer;                //response for each customer
     reservation.seat=newSeat;                        //response for each seat
     reservation.available=newAvailable;              //response for each available
     reservation.time=newTime;                        //response for each time
  }
})


     res.send('successfully updated data');   //message display when successfully updated
})
//DELETE here for RESERVATION

app.delete('/reservation/reservations/:id',function(req,res){     //delete via id
  var id=req.params.id;                                          //wrap id
  var found=false;
  reservations.forEach(function(reservation,index){              //loop
     if(!found&&reservation.id==Number(id)){                     //check if id is equal
          reservations.splice(index,1);
     }
  })

  res.send('successfully cancel reservation');
})
//for new website of RESERVATION
app.get("/createReservation",checkNotAuthenticated,(req,res)=>{  //build a web page for reservation

  res.render("createReservation");                               //render createReservation page
  
 })
 app.get("/createReservation/reservations",checkNotAuthenticated,(req,res)=>{  //reaching to reservations

  res.send({reservations:reservations});                                //send data of reservation
  
 })

//new ORDER APP here


//FOR ORDER APP
app.get("/order",checkNotAuthenticated,(req,res)=>{      //get buildapp page and render buildapp file


  res.render("order");

  })

  //sent data

  app.get("/order/orders",checkNotAuthenticated,(req,res)=>{     //reaching to order pages

    res.send({orders:orders});                                   //sending data of oder
     
   })
//POST FOR ORDER 
app.post('/order/orders',function(req,res){
  var newid=req.body.id                 //using body parse to wrap id
  var newName=req.body.name;            //using body parse to warp newName
  var newFood=req.body.food;            //using body parser to get text data on scripts input and story via assign3text
  var newQuantity=req.body.quantity;    //using body parse to get user_ID input on scripts file
  var newSize=req.body.size;
  var newAdd=req.body.add;
  
                   
   orders.push({                        //push these data on server
      id:newid,                         //push id on page
     name:newName,                      //push name on page
     food:newFood,                      //push food on page
     quantity:newQuantity,              //push quantity on page
     size:newSize,                      //push size on page
     add:newAdd,                        //screen_name
  });
  res.send('successfully created');
})
//put here for RESERVATION app
//put here FOR MENU

app.put('/order/orders/:id',function(req,res){   
  var id=req.params.id;                         //wrap id 
  var newFood=req.body.food;                    //wrap customer name that input and store newsCustomer
  var newName=req.body.name;                    //wrap seat 
  var newQuantity=req.body.quantity;            //wrap available
  var newSize=req.body.size; 
  var newAdd=req.body.add;
  var found=false;                          
 
  
 orders.forEach(function(order,index){        //loop all items
  if(!found&&order.id==Number(id)){   
    order.name=newName;                       //response for each name
    order.food=newFood;                       //response for each food
     order.quantity=newQuantity;              //response for each quantity
     order.size=newSize;                      //repsonse for each size
     order.add=newAdd;                        //response for each add
     
  }
})
})
//DELETE FOR ORDER
app.delete('/order/orders/:id',function(req,res){
  var id=req.params.id;                        //wrap id for deleting
  var found=false;
  orders.forEach(function(order,index){       //loop
     if(!found&&order.id==Number(id)){         //check if equal for each id
          orders.splice(index,1);  
     }
  })

  res.send('successfully cancel reservation');
})



app.post(                                             //method post if authenticated and failure return this login page
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/index",                          //if success go to index , if not return to login page
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.post("/register", checkNotAuthenticated, async (req, res) => {   //get the register page
  const userFound = await User.findOne({ email: req.body.email });   //using userFound to compare that users are aldready created or not

  if (userFound) {                       //if user Found true
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


