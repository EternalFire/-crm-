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

export {
  guangzhou,
  chongqing,
  changsha,
  nanchang,
  admin,
  getCenterName
}
