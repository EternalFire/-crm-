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
const type = { day, month, all, parseMenuKey };


export {
  guangzhou,
  chongqing,
  changsha,
  nanchang,
  admin,
  getCenterName,
  getCenters,
  type
}