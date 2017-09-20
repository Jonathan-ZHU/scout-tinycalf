/*jshint esversion: 6 */
var events = require('events');

var prt = require("./printlog.js");
/*
获取所有交易所
CNY-BTC
CNY-LTC
CNY-ETH
售价信息
*/
var clients = require("./clients.js");

//TABLE获取数据以后是这样的：
/*
TABLE = {
    btc:{
      okcoin：22000,
      coinbase：21000,
      ...
    },
    ltc:{
      okcoin：480,
      coinbase：460,
      ...
    },
    ...
};
*/
var TABLE = {
    btc:{},
    ltc:{},
    eth:{}
};
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
var updateOkcoin = new events.EventEmitter();
//lt => legal tender 法币名称 ： cny / usd
//dt => digital tender 数字货币名称 ： btc / ltc / eth
updateOkcoin.on('start', function( dt ) {
  var symbol = null;
  switch(dt) {
    case "btc": symbol = "btc_usd";break;
    case "ltc": symbol = "ltc_usd";break;
    case "eth": symbol = "eth_usd";break;
    default:prt.err("digital tender wrong input");
  }
  okcoin.tickerApi({symbol:symbol},function(err, ret){
    if (err) {
      prt.err(err);
      return;
    }
    if(ret!=undefined) {
      var num = ret.ticker.sell * rate.getRate();
      num = fix(num);
      TABLE[dt].okcoin = num;
    }
    //完成后在次出发循环执行
    updateOkcoin.emit('start', dt );
  });
});

updateOkcoin.emit('start', 'btc' );
updateOkcoin.emit('start', 'ltc' );
updateOkcoin.emit('start', 'eth' );


//------------------------------COINBASE------------------------------
var coinbase = clients.coinbase;
var updateCoinbase = new events.EventEmitter();
updateCoinbase.on('start', function( dt ) {
  var symbol = null;
  switch(dt) {
    case "btc": symbol = "BTC-CNY";break;
    case "ltc": symbol = "LTC-CNY";break;
    case "eth": symbol = "ETH-CNY";break;
    default:prt.err("digital tender wrong input");
  }
  coinbase.getSellPrice({'currencyPair': symbol},function(err, ret){
    if (err)  {
      prt.err(err);
      return;
    }
    if(ret!=undefined) {
      var num = ret.data.amount;
      num = fix(num);
      TABLE[dt].coinbase = num;
    }
    //完成后在次出发循环执行
    updateCoinbase.emit('start', dt );
  });
});
updateCoinbase.emit('start', 'btc' );
updateCoinbase.emit('start', 'ltc' );
updateCoinbase.emit('start', 'eth' );


//------------------------------BITFINEX----------------------------------------
var bitfinex = clients.bitfinex;
var updateBitfinex = new events.EventEmitter();
updateBitfinex.on('start', function( dt ) {
  var symbol = null;
  switch(dt) {
    case "btc": symbol = "btcusd";break;
    case "ltc": symbol = "ltcusd";break;
    case "eth": symbol = "ethusd";break;
    default:prt.err("digital tender wrong input");
  }
  bitfinex.ticker(symbol,function(err, ret){
    if (err)  {
      prt.err(err);
      return;
    }
    if(ret!=undefined) {
      var num = ret.last_price * rate.getRate();
      num = fix(num);
      TABLE[dt].bitfinex = num;
    }
    //完成后在次出发循环执行
    updateBitfinex.emit('start', dt );
  });
});
updateBitfinex.emit('start', 'btc' );
updateBitfinex.emit('start', 'ltc' );
updateBitfinex.emit('start', 'eth' );

//------------------------------------------------------------------------------


//test

setInterval(function(){
  console.log(TABLE);
},3000);

//api
exports.getAllbyBTC = () => { return CNY_BTC };
exports.getAllbyLTC = () => { return CNY_BTC };
exports.getAllbyETH = () => { return CNY_BTC };
