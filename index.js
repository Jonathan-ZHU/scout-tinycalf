var express = require("express");
var app = express();
var http = require('http');
var ticker = require("./lib/ticker.js");
// setInterval(function(){
//   console.log(ticker.getAll());
// },3000);
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/getticker',function(req,res){
  res.send(ticker.getAll());
});

app.get('/getkline',function(req,res){
  ticker.getKline(function(err,ret){
    res.send(ret);
  })
});


app.listen(8080);
console.log("Listening on port 8080");
