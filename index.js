const conn = require('./app/model/db.conn');
// const cors = require('cors');
const express = require('express');
const CONFIG = require('./app/config/config');
const bodyParser = require('body-parser');
const PATH = require('path');
// var routes = require('./routes');
var user= require('./routes/user');
const cool = require('cool-ascii-faces')

// var javaRoute= require('./routes/javaRoute');
var app = express();
// const firebase=require('firebase')
//
// firebase.initializeApp({
//   "apiKey": "AIzaSyA71knpvuvfSpeQPcKIf5u9SDjkVPMq5xk",
//   "databaseURL": "https://my-project-1518069219955.firebaseio.com",
//   "storageBucket": "my-project-1518069219955.appspot.com",
//   "authDomain": "my-project-1518069219955.firebaseapp.com",
//   "messagingSenderId": "512113971991",
//   "projectId": "my-project-1518069219955"
// });


app.set('port', CONFIG.PORT);
console.log("before start");
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
 app.get('/cool', (req, res) => res.send(cool()));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-access-token, Content-Type,token, Accept,*");
  next();
});
app.use(express.static(__dirname + '/public'));
//
// app.use('/tutorials',routes);
// app.use('/javascript',javaRoute);
app.use('/user',user);
app.listen(app.get('port'), () => {
  console.log("port is " + app.get('port'));
});
