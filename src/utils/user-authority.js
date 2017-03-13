/*
 * 权限管理
 */

// 判断中心
const isCenterGuangzhou = center => center === 'gz';
const isCenterChongqing = center => center === 'cq';
const isCenterChangsha = center => center === 'cs';
const isCenterNanchang = center => center === 'nq';
const isAdmin = center => center === 'admin';


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
const isAdministrator = (center, type) => {
  return isAdmin(center) && isGeneralManager(type);
};

// 广州分中心咨询顾问
const isGuangzhouWorker = (center, type) => {
  return isCenterGuangzhou(center) && isWorker(type);
};

// 广州分中心咨询经理
const isGuangzhouManager = (center, type) => {
  return isCenterGuangzhou(center) && isManager(type);
};

// 重庆分中心咨询顾问
const isChongqingWorker = (center, type) => {
  return isCenterChongqing(center) && isWorker(type);
};

// 重庆分中心咨询经理
const isChongqingManager = (center, type) => {
  return isCenterChongqing(center) && isManager(type);
};

// 长沙分中心咨询顾问
const isChangshaWorker = (center, type) => {
  return isCenterChangsha(center) && isWorker(type);
};

// 长沙分中心咨询经理
const isChangshaManager = (center, type) => {
  return isCenterChangsha(center) && isManager(type);
};

// 南昌分中心咨询顾问
const isNanchangWorker = (center, type) => {
  return isCenterNanchang(center) && isWorker(type);
};

// 南昌分中心咨询经理
const isNanchangManager = (center, type) => {
  return isCenterNanchang(center) && isManager(type);
};


export {
  isCenterGuangzhou,
  isCenterChongqing,
  isCenterChangsha,
  isCenterNanchang,
  isAdmin,

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
};