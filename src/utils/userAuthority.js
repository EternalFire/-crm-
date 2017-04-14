/*
 * 权限管理
 */
import {isGuangzhou,isChongqing,isChangsha,isNanchang,isAdmin} from './center'

// 职位
// 咨询顾问
const isWorker = type => type === 0;

// 咨询经理
const isManager = type => type === 1;

// 分中心前台
const isFront = type => type === 10;

// 网咨客服
const isNetCustomerService = type => type === 20;

// 总经理
const isGeneralManager = type => type === 99;

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

  checkCenter
};