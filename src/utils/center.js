/*
 * 各中心
 *
 */

const guangzhou = 'gz';
const chongqing = 'cq';
const changsha = 'cs';
const nanchang = 'nq';
const admin = 'admin';

const getCenterName = (center) => {
  let result;
  switch(center) {
    case guangzhou:
      result = '广州分中心';
      break;
    case chongqing:
      result = '重庆分中心';
      break;
    case changsha:
      result = '长沙分中心';
      break;
    case nanchang:
      result = '南昌分中心';
      break;
    case admin:
      result = '善班总部';
      break;
    default:
      result = '待定';
  }
  return result;
};

const getCenters = () => {
  return [guangzhou, chongqing, changsha, nanchang];
};

// 报表类型
const day = 'day';
const month = 'month';
const all = 'all';
const type = { day, month, all };

// 社招面试类型
const qr = 'qr';
const align = 'align';
const interviewType = { qr, align };

const parseMenuKey = (openKey) => {
  if (typeof openKey === 'string' && openKey.length > 0 )
  {
    let keyValue = openKey.split('-');
    if (keyValue.length > 1) {
      return { name: keyValue[0], type: keyValue[1] };
    }
  }
  return false;
};
const parsePath = (pathname) => {
  if (typeof pathname === 'string' && pathname.length > 0) {
    let array = pathname.split('/');
    let last = array[array.length - 1];
    return parseMenuKey(last);
  }
  return false;
}

// 咨询中心
const isMng = (name, type) => {  
  let result1 = [guangzhou, chongqing, changsha, nanchang, admin].some(e => e === name);
  let result2 = [day, month, all].some(e => e === type);
  return result1 && result2;
}

// 社招面试
const isInterview = (name) => {
  return getCenters().some(e => e === name);
}

export {
  guangzhou,
  chongqing,
  changsha,
  nanchang,
  admin,
  getCenterName,
  getCenters,
  type,
  interviewType,
  parseMenuKey,
  parsePath,
  isMng,
  isInterview
}