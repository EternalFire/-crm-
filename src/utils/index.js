import config from './config'
import menu from './menu'
import { ancestorKeys } from './menu'
import request from './request'
import classnames from 'classnames'
import {color} from './theme'
// require('./mock.js')

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, function () {
    return arguments[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? o[k]
        : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

function checkResponse(params) {
  const { errCode } = params;

  if (errCode) {
    if (errCode === 'ok') {
      return true;
    }
  }

  return false;
};

function getCookie(c_name) {
  try {
    var cookieStr = document.cookie;
    if (cookieStr.length > 0) {
      // console.log('cookie: ', cookieStr);
      var cookieArr = cookieStr.split(';');
      for (var i = 0; i < cookieArr.length; i++) {
        var cook = cookieArr[i];
        var cookArr = cook.split('=');
        if (cookArr[0].replace(' ', '') == c_name) {
          return unescape(cookArr[1].replace(' ', ''));
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
  return "";
}

function delCookie(name) {
  try {    
    var exp = new Date();
    exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
    // var cval = getCookie(name);
    // document.cookie = name + '=' + cval + '; expires=' + exp.toGMTString();
    document.cookie = name + '= ; expires=' + exp.toGMTString();
  } catch(e) {
    console.error(e)
  }
}

module.exports = {
  config,
  menu,
  ancestorKeys,
  request,
  color,
  classnames, 
  checkResponse,
  getCookie,
  delCookie
}
