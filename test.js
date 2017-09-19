/*jshint esversion: 6 */
var okcoin = require("okcoinapi-tinycalf");
var apikeys = require ("./apikeys.js");

var okcoin-cli = new okcoin({apiKey:apikeys.okcoin.apikey,apiKeySecret:apikeys.okcoin.secret});

var keepGetTicker = function (err ,ret) {
  console.log(ret);
  client.tickerApi({symbol:'btc_cny'},keepGetTicker);
};

keepGetTicker(null,null);

console.log(apikeys.okcoin.apikey);
