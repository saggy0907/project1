const conn = require('./app/model/db.conn');
// const cors = require('cors');
const express = require('express');
const CONFIG = require('./app/config/config');
const bodyParser = require('body-parser');
const PATH = require('path');
// var routes = require('./routes');
var user= require('./routes/user');

// const http = require("http");
var http = require('http').Server(app);
// const server = http.createServer(function (req, res) {
// 	res.end("Hello!");
// })

// var javaRoute= require('./routes/javaRoute');
var app = express();

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
app.listen(app.get('port')||process.env.PORT, () => {
  console.log("port is " + app.get('port'));
});
