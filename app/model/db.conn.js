const mongoose = require('mongoose');
const CONFIG = require('../config/config');
// require('./html.model');
require('./user.model')
// require('./css.model')
// require('./javascript.model')

var dburl = 'mongodb://admin:admin123@ds153978.mlab.com:53978/proj';

var option = {
  user : "admin",
  pass : "admin123",

};

mongoose.connect(dburl,{ useNewUrlParser: true });
var db= mongoose.connection;
db.on('error',console.error.bind(console,'connection Error:'));
db.once('open',function() {
 console.log("MongooseConnected");
});

process.on('SIGINT',()=>{
db.close(()=>{
  console.log("mongoose connection disconnected")
  process.exit(0)

});
});

process.once('SIGUSR2',()=>{
  gracefullShutdown('nodemon restart',()=>{
    process.kill(process.pid,'SIGUSR2');
  });
});

function gracefullShutdown(msg,callback) {
  db.close(()=>{
console.log("disconnected :"+msg);
callback();
});
}

module.exports={
  DB:db
}
