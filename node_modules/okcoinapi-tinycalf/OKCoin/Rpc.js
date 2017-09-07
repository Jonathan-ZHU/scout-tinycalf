const request = require('request');
const base = require('./Base.js');

const crypto = require('crypto');
var md5 = crypto.createHash('md5');

var _authentication;

Rpc = function (authentication){
  _authentication = authentication;
};

Rpc.prototype.request = function(method, url, params, callback) {
  //GET USER APIKEY
	var auth = _authentication;

  method = method.toLowerCase();

  if (method == 'get') {
      if (params != null) {
        var queryString = "";
        for (var key in params) {
          queryString += key + "=" + params[key] + "&";
        }
				url += "?" + queryString;
			}
      url = base.WebBase + url;
      request.get(
        {
          url:url,
          headers: {
            'User-Agent': 'OKCoinNodejs/v1',
            'contentType':'application/x-www-form-urlencoded'
          },
          encoding:'utf8'
        },
        function(error, response, body){
          if(response.statusCode == 200){
            callback(null,body);
            return;
          }else{
            var err = response.statusCode;
            var msg = response.statusCode;
            callback(err,msg);
          }
        }
      );
	} else if(method == 'post') {
      //OKCoin POST请求加密流程
      //params.sort();
      var sign = "";
      for (var key in params) {
        sign += key + "=" + params[key] + "&";
      }
      sign = sign + "secret_key=" + _authentication['apiKeySecret'];
      md5.update(sign);
      sign = md5.digest('hex');
      sign = sign.toUpperCase();
      params['sign'] = sign;
      url = base.WebBase + url;
      request.post(
        {
          url:url,
          headers: {
            'User-Agent': 'OKCoinNodejs/v1',
            'contentType':'application/x-www-form-urlencoded'
          },
          encoding:'utf8',
          form:params
        },
        function(error, response, body){
          if(response.statusCode == 200){
            callback(null,body);
            return;
          }else{
            var err = response.statusCode;
            var msg = response.statusCode;
            callback(err,msg);
          }
        }
      );
  } else {
    //err
  }
}

exports.Rpc = Rpc;
