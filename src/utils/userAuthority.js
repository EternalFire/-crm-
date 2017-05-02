/*
 * 权限管理
 */
import {isGuangzhou,isChongqing,isChangsha,isNanchang,isAdmin} from './center'
import { routerRedux } from 'dva/router';
import { message } from 'antd';

// 职位
const worker = 0;
const manager = 1;
const front = 10;
const net = 20;
const generalManager = 99;

// 咨询顾问
const isWorker = type => type === worker;

// 咨询经理
const isManager = type => type === manager;

// 分中心前台
const isFront = type => type === front;

// 网咨客服
const isNetCustomerService = type => type === net;

// 总经理
const isGeneralManager = type => type === generalManager;

// 管理员
const isAdministrator = (center, type) => isAdmin(center) && isGeneralManager(type);

// 广州分中心咨询顾问
const isGuangzhouWorker = (center, type) => isGuangzhou(center) && isWorker(type);

// 广州分中心咨询经理
const isGuangzhouManager = (center, type) => isGuangzhou(center) && isManager(type);

// 重庆分中心咨询顾问
const isChongqingWorker = (center, type) => isChongqing(center) && isWorker(type);

// 重庆分中心咨询经理
const isChongqingManager = (center, type) => isChongqing(center) && isManager(type);

// 长沙分中心咨询顾问
const isChangshaWorker = (center, type) => isChangsha(center) && isWorker(type);

// 长沙分中心咨询经理
const isChangshaManager = (center, type) => isChangsha(center) && isManager(type);

// 南昌分中心咨询顾问
const isNanchangWorker = (center, type) => isNanchang(center) && isWorker(type);

// 南昌分中心咨询经理
const isNanchangManager = (center, type) => isNanchang(center) && isManager(type);

// 检测用户所属中心
function checkCenter(name, type, user) {
  return name && type && 
    user && 
    (user.center === name || isAdmin(user.center))
  ;
}

function getTypeName(type) {
  if (isWorker(type))             return '咨询顾问';
  if (isManager(type))            return '咨询经理';
  if (isFront(type))              return '前台';
  if (isNetCustomerService(type)) return '网络咨询客服';
  if (isGeneralManager(type))     return '总经理';
  return '';
}

function getTypes() {
  return [worker, manager, front, net, generalManager];
}

const rules = [
  {
    actionType: '',
    checkFunc: true
  }
];
function check() {
  return ({getState, dispatch}) => next => action => {  
    let prevState = getState();
    const { user } = prevState.app;

    // // 例子
    // if (action.type === 'centerReport/queryUserReport') {
    //   // 跳至首页
    //   dispatch(routerRedux.push({ pathname: '/' }));

    //   // 中断后续的action
    //   let e = new Error('X');
    //   message.error(`权限不足`);
    //   throw e;
    // }

    let returnedValue = next(action);
    let nextState = getState();

    return returnedValue;
  }
}

export {
  isWorker,
  isManager,
  isFront,
  isNetCustomerService,
  isGeneralManager,

  isAdministrator,
  
  isGuangzhouWorker,
  isGuangzhouManager,

  isChongqingWorker,
  isChongqingManager,

  isChangshaWorker,
  isChangshaManager,

  isNanchangWorker,
  isNanchangManager,

  checkCenter,
  getTypeName,
  getTypes,
  check
};