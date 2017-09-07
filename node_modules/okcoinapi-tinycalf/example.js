//var okcoin = require("./OKCoin/Okcoin.js");
var okcoin = require("./index.js");


const API_KEY = "你的API_KEY";
const SECRET_KEY = "你的SECRET_KEY";


var client = new okcoin({apiKey:API_KEY,apiKeySecret:SECRET_KEY});


client.tickerApi({symbol:'btc_cny'},function(err,ret){
  console.log(ret);
});

// client.depthApi({symbol:'btc_cny',size:5},function(err,ret){
//
//   console.log(ret);
// });

// client.tradesApi({symbol:'btc_cny'},function(err,ret){
//   console.log(ret);
// });
//
// client.klineDataApi({symbol:'btc_cny',type:'1day'},function(err,ret){
//   console.log(ret);
// });


// var params = {symbol:'btc_usd',size:5};
// var result = client.depthApi(params);
// console.log(result);

//获取用户信息
// client.userinfoApi({api_key:API_KEY},function(err,ret){
//   console.log(ret);
// });
//$params = array('api_key' => API_KEY);
//$result = $client -> userinfoApi($params);
