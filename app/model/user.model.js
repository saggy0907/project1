var mongoose = require('mongoose');

var user = mongoose.Schema({
      id:Number,
      name:String,
      username:String,
      email:String,
      password:String,
      confirm:String,
      profession:String,
  });

mongoose.model('User',user,'proj.users');
