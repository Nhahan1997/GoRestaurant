const mongoose = require("mongoose");               //create mongoose

const userSchema = new mongoose.Schema({           //using mongoose Schema
  name: {
    type: String,                                   //type string for input name
    required: true,                                 //check true for parameter
  },
  email: {                                                   
    type: String,                                   //type string for input email
    required: true,                                 //check true for parameter
  },
  password: {
    type: String,                                   //type string for in put password
    required: true,                                 //check true for parameter
  },
  

});

const User = mongoose.model("User", userSchema);      //create User 
module.exports = User;                                //export module
