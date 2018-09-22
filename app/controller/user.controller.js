const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
var User = mongoose.model('User');
const path = require('path');

var genratedToken;
var abcd;
module.exports.registration = (req,res)=>{
  var body=req.body;
  var userName = req.body.username;
  bcrypt.hash(req.body.password, 10, function (err, hash){
if (err) {
return console.log(err);
}else{
req.body.password = hash;
req.body.cofirm = hash;
if(body.password&&body.confirm&&body.username&&body.name&&body.email){
  User
    .find({username: userName}, (err, doc) => {
      if (err) {
        console.log("something bad happened there...!!!");
      } else {
        if (doc.length == 0) {
          var user = new User(req.body)
          user.save((error, doc) => {
            if (error) {
              res.status(405).json({
                "message": "email already Exist...!!!"
              })
            } else {
              var currentDate = new Date();
              doc.updated_at = currentDate;
              if (!this.created_at) {
                doc.created_at = currentDate;
              }

              res
                .status(201)
                .send({"message":"new user registered...!",
                });
            }
          })
        } else {
          console.log("user already there...!!!");
          res.status(405).json({
            "msg": "user already there...!!!",

          })
        }
      }
    })
  }else{
    console.log("something is missing")
    res.send({"msg":"something is missing"})
  }
}})
}

module.exports.validate = (req,res,next)=>{

  var token = genratedToken;
  console.log("controller token =",token);
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, CONFIG.SECRETE, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    next();
  });
}

module.exports.login = (req,res)=>{
User.findOne({ username: req.body.username }, function (err, user) {
   if (err) return res.status(500).send('Error on the server.');
   if (!user) return res.status(404).send('No user found.');
   var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
   if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
   var token = jwt.sign({ id: user._id }, CONFIG.SECRETE, {
     expiresIn: 86400 // expires in 24 hours
   });
   genratedToken=token;
   res.status(200).send({ auth: true, token: token });
 });
}

module.exports.removeOneUser = (req, res) => {
  var userId = req.params.userId;
  User
    .findByIdAndRemove(userId)
    .exec((error, doc) => {
      console.log("user removed...");
      res
        .status(200)
        .json(doc)
    })
}
