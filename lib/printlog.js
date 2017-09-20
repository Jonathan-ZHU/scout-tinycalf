/*
打印输出及log模块
*/
var colors = require('colors');
var fs = require('fs');
var path = require('path');

//把root做成configure文件
var root = "/home/jonathan/Desktop/scout/";

//定义各类输出标题颜色
var ERR = 'ERR!'.white.bgRed.bold;
var INFO = 'INFO'.white.bgBlue.bold;
var WARN = 'WARN'.white.bgYellow.bold;
// 红#c678dd 蓝#56b6c2 绿#98c379 黄#d19a66

//定义时间信息格式  如 2017-09-20 10:15:33
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

//获取当前时间
var time = function(color = true){
  var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
  var time = "[" + time + "]";
  if(color){
    return time.cyan
  }else {
    return time
  };
}

//获取日期字符串
var date = function(){
  var date = new Date().Format("yyyyMMdd");
  return date;
}

//写入日志文件
var addtofile = function(logstr){
  var filepath = root + "./logs/" + date() + ".log";
  fs.exists(filepath, function(exists){
    if(!exists){
      fs.writeFile(filepath,logstr);
    }else{
      fs.appendFile(filepath,logstr,null,function(){});
    }
  });
}

exports.log = function(str){
  var colorstring = time() + " " + str;
  var logstring = time(false) + " " + str + "\n";
  console.log(colorstring);
  addtofile(logstring);
}

exports.err = function(str){
  var colorstring = time() + " " + ERR + " " + str;
  var logstring = time(false) + " " + "ERR!" + " " + str + "\n";
  console.log(colorstring);
  addtofile(logstring);
}

exports.info = function(str){
  var colorstring = time() + " " + INFO + " " + str;
  var logstring = time(false) + " " + "INFO" + " " + str + "\n";
  console.log(colorstring);
  addtofile(logstring);
}

exports.warn = function(str){
  var colorstring = time() + " " + WARN + " " + str;
  var logstring = time(false) + " " + "WARN" + " " + str + "\n";
  console.log(colorstring);
  addtofile(logstring);
}
