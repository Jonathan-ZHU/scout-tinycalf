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


//------------------------------OKCOIN------------------------------
var okcoin = clients.okcoin;

//update okcoin CNY_BTC
var updateOkcoinCNYBTC = function (err,ret) {
  if (err) {
    console.log(err);
    return;
  }
  if(ret!=undefined) CNY_BTC.okcoin=ret.ticker.sell;
  okcoin.tickerApi({symbol:'btc_cny'},updateOkcoinCNYBTC);
};
updateOkcoinCNYBTC(null,null);

//update okcoin CNY_LTC
var updateOkcoinCNYLTC = function (err,ret) {
  if (err) {
    console.log(err);
    return;
  }
  if(ret!=undefined) CNY_LTC.okcoin=ret.ticker.sell;
  okcoin.tickerApi({symbol:'btc_ltc'},updateOkcoinCNYLTC);
}
updateOkcoinCNYLTC(null,null);

//update okcoin CNY_ETH
var updateOkcoinCNYETH = function (err,ret) {
  if (err) {
    console.log(err);
    return;
  }
  if(ret!=undefined) CNY_ETH.okcoin=ret.ticker.sell;
  okcoin.tickerApi({symbol:'btc_eth'},updateOkcoinCNYETH);
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
  if(ret!=null) CNY_BTC.coinbase=ret.data.amount;
  coinbase.getSellPrice({'currencyPair': 'BTC-CNY'},joinCoinbaseCNYBTC);
}
joinCoinbaseCNYBTC(null,null);


//update coinbase CNY_LTC
var joinCoinbaseCNYLTC = function (err,ret) {
  if (err)  {
    console.log(err);
    return;
  }
  if(ret!=null) CNY_LTC.coinbase=ret.data.amount;
  coinbase.getSellPrice({'currencyPair': 'LTC-CNY'},joinCoinbaseCNYLTC);
}
joinCoinbaseCNYLTC(null,null);

//update coinbase CNY_BTC
var joinCoinbaseCNYETH = function (err,ret) {
  if (err)  {
    console.log(err);
    return;
  }
  if(ret!=null) CNY_ETH.coinbase=ret.data.amount;
  coinbase.getSellPrice({'currencyPair': 'ETH-CNY'},joinCoinbaseCNYETH);
}
joinCoinbaseCNYETH(null,null);



//test

setInterval(function(){
  console.log(CNY_BTC);
  console.log(CNY_LTC);
  console.log(CNY_ETH);
},3000);
