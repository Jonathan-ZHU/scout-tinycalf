var okcoin = require("okcoinapi-tinycalf");



const API_KEY = "ec7e8719-d39f-468c-b473-6abd8bf8c0d2";
const SECRET_KEY = "3F5A4B381253184BB3EE65E8FF038018";

var client = new okcoin({apiKey:API_KEY,apiKeySecret:SECRET_KEY});


client.tickerApi({symbol:'btc_cny'},function(err,ret){
  console.log(ret);
});
