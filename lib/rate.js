/*jshint esversion: 6 */

/*
人民币兑美元汇率模块
默认为6.4,开启同步模式后每小时和中央银行校对汇率
用法 1.开启同步 usdcny.startSync();
    2.获取汇率 usdcny.getRate();
*/
const usdcny = require('usdcny');
var USD_CNY = 6.4;


//同步模式
exports.startSync = function(){
  var round = function(){
    usdcny.get(function(res){
        // 去你妈的给我的输出是这样的：
        // 美元对人民币汇率，数据来源于中国银行外汇牌价
        // 现汇买入价: 6.5721
        // 现钞买入价: 6.5182
        // 现汇卖出价: 6.5985
        // 现钞卖出价: 6.5985
        // 中行折算价: 6.5530
        // 时间: 2017-09-19 16:11:36
        // 我他妈怎么解析！！！！
        // 算了，字符串分割吧
        res = res.substring(0, res.indexOf('\n时间'));
        res = res.substring(res.indexOf('中行折算价:\ ')+7,res.length);
        console.log(res);
        USD_CNY = res;
    });
  }
  round();
  setInterval(round,1000*60*60);
}


//获取汇率，最好每次用汇率都执行这个函数，以完全同步最新汇率
exports.getRate = function(){
  return USD_CNY;
}
