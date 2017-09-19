/*
所有api的实例化对象
*/

var apikeys = require ("../apikeys.js");

//okcoin
var Okcoin = require("okcoinapi-tinycalf");
var okcoin = new Okcoin({
  apiKey:apikeys.okcoin.apikey,
  apiKeySecret:apikeys.okcoin.secret
});
exports.okcoin = okcoin;

//coinbase
var Coinbase = require('coinbase').Client;
var coinbase = new Coinbase({
  'apiKey': apikeys.coinbase.apikey,
  'apiSecret': apikeys.coinbase.secret
});
exports.coinbase = coinbase;

//coincheck
