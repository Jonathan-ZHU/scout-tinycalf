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


// var Bxthai = require("bxthai");
// var bxthai = new Bxthai();
//
// bxthai.ticker(console.log);

// var clients = require("./lib/clients.js");
// var coincheck = clients.coincheck;
//
// var params = {
//   data:{
//     pair: 'btc_jpy',
//   },
//   options: {
//       success: function(data, response, params) {
//           console.log('success', data);
//       },
//       error: function(error, response, params) {
//           console.log('error', error);
//       }
//   }
// };
// coincheck.ticker.all(params);

var ticker = require("./lib/ticker.js");
setInterval(function(){
  console.log(ticker.getAll());
},3000);
