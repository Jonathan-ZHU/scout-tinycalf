var rpc = require("./Rpc.js");

const API_BASE = '/api/v1/';
//const WEB_BASE = 'https://www.okcoin.com/';//OKCoin国际站
const WEB_BASE = 'https://www.okcoin.cn/';//OKCoin中国站

var _rpc;
var _authentication;

Base = function (autho, tokens, apiKeySecret) {
  // First off, check for a legit authentication class type

  // if (autho.length == 2){
    _authentication = autho;
  // } else {
  //   if(tokens !== null) {
  //     //_authentication = new
  //     //....
  //   }else if (autho !== null && typeof autho == "string") {
  //     var apiKey = autho;
  //     _authentication = new simpleautho.SimpleAutho(apiKey);
  //   }else{
  //     //throw err
  //   }
  // }
  _rpc = new rpc.Rpc(_authentication);
};

Base.prototype.get = function (path, params, callback){
  return _rpc.request("get", path, params,function(err,ret){
    if(err) throw err;
    callback(null,ret);
    return;
  });
};

Base.prototype.post = function (path, params, callback){
  return _rpc.request("post", path, params,function(err,ret){
    if(err) throw err;
    callback(null,ret);
    return;
  });
};

Base.prototype.getWebBase = function (){
  return WEB_BASE;
};

exports.Base = Base;
exports.WebBase = WEB_BASE;
exports.ApiBase = API_BASE;
