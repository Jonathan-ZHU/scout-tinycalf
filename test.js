/*jshint esversion: 6 */
// var okcoin = require("okcoinapi-tinycalf");
// var apikeys = require ("./apikeys.js");
//
// var okcoin-cli = new okcoin({apiKey:apikeys.okcoin.apikey,apiKeySecret:apikeys.okcoin.secret});
//
// var keepGetTicker = function (err ,ret) {
//   console.log(ret);
//   client.tickerApi({symbol:'btc_cny'},keepGetTicker);
// };
//
// keepGetTicker(null,null);
//
// console.log(apikeys.okcoin.apikey);

// var rate = require("./lib/rate.js");
// rate.startSync();
//
// setInterval(function(){
//   console.log(rate.getRate());
// },3000)


// var prt = require("./lib/printlog.js");
//
// prt.log("im log");
// prt.err("im err");
// prt.info("im info");
// prt.warn("im warn");


var Bxthai = require("bxthai");
var bxthai = new Bxthai();

bxthai.ticker(console.log);
