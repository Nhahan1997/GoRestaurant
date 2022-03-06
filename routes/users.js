const express = require('express');
const router = express.Router();
const userControll = require('../models/user.js');


router.post('/', (req, res, next) =>{
  let personInfo = req.body;
  if(!personInfo.password){
    res.send();
  } else {
    User.findOne({}, (err, data) => {
      let person = new User({
        firstname: personInfo.firstname,
        lastname: personInfo.lastname,
        email: personInfo.email,
        password: personInfo.password
      });
      person.save().then(result =>{
        console.log(result);
      }).sort('lastname firstname');  //sort user name
    });
  }
});

module.exports = router;
