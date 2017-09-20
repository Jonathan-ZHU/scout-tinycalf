/*
所有交易所api的实例化对象
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


//bitfinexapi
var Bitfinex = require('bitfinexapi-tinycalf');
var opts = { version: 1, transform: false, nonceGenerator: false };
const bitfinex = new Bitfinex(apikeys.bitfinex.apikey, apikeys.bitfinex.apikey, opts);
exports.bitfinex = bitfinex;

//coincheck
var CoinCheck = require('coincheck');
var coincheck = new CoinCheck.CoinCheck(apikeys.coincheck.apikey, apikeys.coincheck.apikey);
exports.coincheck = coincheck;

//bxthai (泰国)
var Bxthai = require('bxthai');
var bxthai = new Bxthai();
exports.bxthai = bxthai;
