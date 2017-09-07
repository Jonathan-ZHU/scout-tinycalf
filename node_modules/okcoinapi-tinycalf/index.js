var base = require("./OKCoin/Base.js");

var _autho;
var _base;

Okcoin = function (autho) {
  _autho = autho;
  _base  = new base.Base(autho);
};

//获取OKCoin行情（盘口数据）
Okcoin.prototype.tickerApi = function (params,callback){
  _base.get("/api/v1/ticker.do", params,function(err,ret){
    callback(err,ret);
  });
};

//获取OKCoin市场深度
Okcoin.prototype.depthApi = function (params,callback){
  _base.get("/api/v1/depth.do", params,function(err,ret){
    callback(err,ret);
  });
};

//获取OKCoin历史交易信息
Okcoin.prototype.tradesApi = function (params,callback){
  _base.get("/api/v1/trades.do", params,function(err,ret){
    callback(err,ret);
  });
};

//获取比特币或莱特币的K线数据
Okcoin.prototype.klineDataApi = function (params,callback){
  _base.get("/api/v1/kline.do", params,function(err,ret){
    callback(err,ret);
  });
};

//获取用户信息
Okcoin.prototype.userinfoApi = function (params,callback){
  _base.post("/api/v1/userinfo.do", params,function(err,ret){
    callback(err,ret);
  });
};

//TODO:接入更多接口

module.exports = Okcoin;
