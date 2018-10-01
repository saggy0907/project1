var mongoose = require('mongoose');

var user = mongoose.Schema({
      id:Number,
      name:String,
      username:String,
      email:String,
      password:String,
      confirm:String,
      profession:String,
      role:[String],
      role1:String,
      role2:String,
      role3:String,
      role4:String,
      role5:String
  });

mongoose.model('User',user,'proj.users');
