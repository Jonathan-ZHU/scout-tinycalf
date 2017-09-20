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
    }
    if(ret!=undefined) {
      var num = ret.ticker.sell * rate.getRate();
      num = fix(num);
      TABLE[dt].okcoin = num;
    }
    //完成后在次出发循环执行
    setTimeout(function(){
      updateOkcoin.emit('start', dt );
    },2000);
  });
});
updateOkcoin.emit('start', 'btc' );
updateOkcoin.emit('start', 'ltc' );
updateOkcoin.emit('start', 'eth' );

var klineinfo = null;
exports.getKline = function (callback) {
  okcoin.klineDataApi({symbol:'btc_usd',type:'1hour'},function(err,ret){
    callback(err,ret);
  });
}



//------------------------------COINBASE----------------------------------------
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
    }
    if(ret!=undefined) {
      var num = ret.data.amount;
      num = fix(num);
      TABLE[dt].coinbase = num;
    }
    //完成后在次出发循环执行
    setTimeout(function(){
      updateCoinbase.emit('start', dt );
    },2000);
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
    }
    if(ret!=undefined) {
      var num = ret.lasstatusCodet_price * rate.getRate();
      num = fix(num);
      TABLE[dt].bitfinex = num;
    }
    //完成后在次出发循环执行
    setTimeout(function(){
      updateBitfinex.emit('start', dt );
    },2000);
  });
});
updateBitfinex.emit('start', 'btc' );
updateBitfinex.emit('start', 'ltc' );
updateBitfinex.emit('start', 'eth' );

//-------------------------------COINCHECK--------------------------------------
var coincheck = clients.coincheck;
//定义日元与CNY汇率 TODO:更新成汇率模块
const jpy_cny = 0.0589112358;
var updateCoincheck = new events.EventEmitter();
updateCoincheck.on('start', function( dt ) {
  var pair = null;
  switch(dt) {
    case "btc": pair = "btc_jpy";break;
    case "eth": pair = "eth_jpy";break;
    default:prt.err("digital tender wrong input");
  }
  var params = {
    data:{
      pair: pair
    },
    options: {
      success: function(data, response, params) {
          data = JSON.parse(data);
          if(data.last){
            var num = data.last * jpy_cny;
            TABLE[dt].coincheck = fix(num);
          }
          setTimeout(function(){
            updateCoincheck.emit("start",dt);
          },2000);

      },
      error: function(error, response, params) {
          prt.err(error);
          setTimeout(function(){
            updateCoincheck.emit("start",dt);
          },2000);
      }
    }
  };
  coincheck.ticker.all(params);
});
updateCoincheck.emit('start', 'btc' );
updateCoincheck.emit('start', 'eth' );


//-------------------------------BXTHAI-----------------------------------------
var bxthai = clients.bxthai;
//定义泰珠与CNY汇率 TODO:更新成汇率模块
var thd_cny = 0.198560225;
var updateBxthai = new events.EventEmitter();
updateBxthai.on('start', function() {
  bxthai.ticker(function(err, ret){
    if (err)  {
      prt.err(err);
    }
    if(ret!=undefined) {
      var btc = ret['1'].last_price * thd_cny;
      TABLE.btc.bxthai = fix(btc);
      var ltc = ret['2'].last_price * btc;
      TABLE.ltc.bxthai = fix(ltc);
      var eth = ret['20'].last_price * btc;
      TABLE.eth.bxthai = fix(eth);
    }
    //完成后在次出发循环执行
    setTimeout(function(){
      updateBxthai.emit('start');
    },2000);
  });
});
updateBxthai.emit('start');
//------------------------------------------------------------------------------




//test

setInterval(function(){
  console.log(TABLE);
},3000);

//api
exports.getAll = () => { return TABLE };
