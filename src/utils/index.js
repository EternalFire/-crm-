import config from './config'
import * as MenuConfig from './menu'
import request from './request'
import classnames from 'classnames'
import {color} from './theme'
import * as center from './center'
import * as authority from './userAuthority'
import moment from 'moment';

const designHeight = 795;
const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';
const timeFormat = 'YYYY-MM-DD HH:mm';

// 表单填写字数限制
const maxRemarkLen = 1500;
const maxRemarkMessage = `备注已超过${maxRemarkLen}字`;

// 一般字数限制
const maxNormalLen = 50;
const maxNormalMessage = `已超过${maxNormalLen}字`;

// 筛选图标的颜色
const activeFilterColor = '#108ee9';
const inactiveFilterColor = '#aaa';

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

// server response
function checkResponse(params) {
  const { errCode } = params;

  if (errCode) {
    if (errCode === 'ok') {
      return true;
    }
  }

  return false;
};

// cookie
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

function timestampToString(timeText) {
  return moment.unix(timeText / 1000).format(timeFormat)
}

function today() {
  return moment().format(dateFormat)
}

function tomorrow() {
  return moment().add(1, 'days').format(dateFormat)
}

function startOfMonth() {
  return moment().set('date', 1).format(dateFormat);
}

function endOfMonth() {
  return moment().add(1, 'month').set('date', 0).format(dateFormat)
}

function getYear(dateText) {
  return moment(dateText).year();
}

function getMonth(dateText) {
  return moment(dateText).month() + 1;
}

/**
 * [时间如果是过去或者现在, 则调用回调; 用于DatePicker的onChange属性]
 * @param  {[type]}   date       [description]
 * @param  {[type]}   dateString [description]
 * @param  {Function} cb         [description]
 * @return {[type]}              [description]
 */
function checkDate(date, dateString, cb) {
  if (dateString.length > 0 && date.unix() <= moment().unix()) {
    cb();
  }
}

function getTableScrollY(y) {
  return y / designHeight * document.body.clientHeight;
}

export {
  designHeight,
  dateFormat,
  monthFormat,
  config,
  MenuConfig,
  request,
  color,
  classnames, 
  checkResponse,
  getCookie,
  delCookie,
  timestampToString,
  center,
  authority,
  today,
  tomorrow,
  startOfMonth,
  endOfMonth,
  getYear,
  getMonth,
  checkDate,
  getTableScrollY,

  maxRemarkLen,
  maxRemarkMessage,
  maxNormalLen,
  maxNormalMessage,

  activeFilterColor,
  inactiveFilterColor
}