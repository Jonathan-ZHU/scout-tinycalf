/*jshint esversion: 6 */

/*
获取所有交易所
CNY-BTC
CNY-LTC
CNY-ETH
售价信息
*/
var clients = require("./clients.js");
var CNY_BTC = {};
var CNY_LTC = {};
var CNY_ETH = {};

//获取汇率
var rate = require("./rate.js");
rate.startSync();//汇率同步模式


//统一保留两位小数
var fix = function(num){
  num *= 1;
  return parseFloat(num.toFixed(2));
}


//------------------------------OKCOIN------------------------------
var okcoin = clients.okcoin;

//update okcoin CNY_BTC
var updateOkcoinCNYBTC = function (err,ret) {
  if (err) {
    console.log(err);
    return;
  }
  if(ret!=undefined) {
    var num = ret.ticker.sell * rate.getRate();
    num = fix(num);
    CNY_BTC.okcoin = num;
  }
  okcoin.tickerApi({symbol:'btc_usd'},updateOkcoinCNYBTC);
};
updateOkcoinCNYBTC(null,null);

//update okcoin CNY_LTC
var updateOkcoinCNYLTC = function (err,ret) {
  if (err) {
    console.log(err);
    return;
  }
  if(ret!=undefined) {
    var num = ret.ticker.sell * rate.getRate();
    num = fix(num);
    CNY_LTC.okcoin = num;
  }
  okcoin.tickerApi({symbol:'ltc_usd'},updateOkcoinCNYLTC);
}
updateOkcoinCNYLTC(null,null);

//update okcoin CNY_ETH
var updateOkcoinCNYETH = function (err,ret) {
  if (err) {
    console.log(err);
    return;
  }
  if(ret!=undefined) {
    var num = ret.ticker.sell * rate.getRate();
    num = fix(num);
    CNY_ETH.okcoin = num;
  }
  okcoin.tickerApi({symbol:'eth_usd'},updateOkcoinCNYETH);
}
updateOkcoinCNYETH(null,null);



//------------------------------COINBASE------------------------------
var coinbase = clients.coinbase;

//update coinbase CNY_BTC
var joinCoinbaseCNYBTC = function (err,ret) {
  if (err)  {
    console.log(err);
    return;
  }
  if(ret!=undefined) {
    var num = ret.data.amount;
    num = fix(num);
    CNY_BTC.coinbase = num;
  }
  coinbase.getSellPrice({'currencyPair': 'BTC-CNY'},joinCoinbaseCNYBTC);
}
joinCoinbaseCNYBTC(null,null);


//update coinbase CNY_LTC
var joinCoinbaseCNYLTC = function (err,ret) {
  if (err)  {
    console.log(err);
    return;
  }
  if(ret!=undefined) {
    var num = ret.data.amount;
    num = fix(num);
    CNY_LTC.coinbase = num;
  }
  coinbase.getSellPrice({'currencyPair': 'LTC-CNY'},joinCoinbaseCNYLTC);
}
joinCoinbaseCNYLTC(null,null);

//update coinbase CNY_BTC
var joinCoinbaseCNYETH = function (err,ret) {
  if (err)  {
    console.log(err);
    return;
  }
  if(ret!=undefined) {
    var num = ret.data.amount;
    num = fix(num);
    CNY_ETH.coinbase = num;
  }
  coinbase.getSellPrice({'currencyPair': 'ETH-CNY'},joinCoinbaseCNYETH);
}
joinCoinbaseCNYETH(null,null);



//test

setInterval(function(){
  console.log(CNY_BTC);
  console.log(CNY_LTC);
  console.log(CNY_ETH);
},3000);

//api
exports.getAllbyBTC = () => { return CNY_BTC };
exports.getAllbyLTC = () => { return CNY_BTC };
exports.getAllbyETH = () => { return CNY_BTC };
