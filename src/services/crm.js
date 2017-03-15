import { request } from '../utils'
import * as Authority from '../utils/user-authority'

// 登录
// params: values(表单数据)
export async function login(params) {
  return request(`/login`, {
    method: 'post',
    data: params
  })
}

// 查询用户
export async function queryUserWithId(params) {
  const { userid } = params
  return request(`/users/${userid}`, {
    method: 'get'
  })
}

// 删除 itv_customers 的数据
export async function deleteCustomerFrontDesk(params) {
  const { customerId } = params;
  return request(`/itv_customers/${customerId}`, {
    method: 'delete'
  })
}

// 查询上门面试
export async function queryCustomerFrontDesk(params) {
  const { date, center } = params
  return request(`/itv_customers?memsrc=~wz&center=${center}&date=${date}&sortby=createTime&current=1&pageSize=99`, {
    method: 'get'
  })
}

// 请求咨询师
export async function queryUserWithCenter(params) {
  const { center } = params
  return request(`/users?center=${center}`, {
    method: 'get'
  })
}

// 分配简历
// params: target
export async function follow(params) {
  return request(`/follow`, {
    method: 'post',
    data: params
  })
}

// 编辑 itv_customers
// params: target
export async function editCustomerFrontDesk(params) {
  const { customerId } = params;

  return request(`/itv_customers/${customerId}`, {
    method: 'put',
    data: params
  })
}

// 查询 咨询中心
export async function queryMng(params) {
  const {
    center,
    startDate,
    endDate,
    fsFilter,
    ybFilter,
    fkFilter,
    zjFilter,
    jbFilter,
    user,
    currentPage, 
    currentPageSize
  } = params;
  // const { currentPage, currentPageSize } = this.state;
  let url = `/itv_customers?center=${center}&startDate=${startDate}&endDate=${endDate}&sortby=createTime&current=${currentPage}&pageSize=${currentPageSize}`;

  if (Authority.isWorker(user.type)) {
    url += '&followUserId=' + user._id;
  }

  if (fsFilter) url += '&notnull=fsTime';
  if (ybFilter) url += '&notnull=ybTime';
  if (fkFilter) url += '&notnull=fkTime';
  if (zjFilter) url += '&notnull=zjTime';
  if (jbFilter) url += '&notnull=jbTime';

  // console.log('url is ', url);
  
  return request(url, {
    method: 'get'
  })
}

// 编辑 itv_customers, 咨询中心
// params: target
export async function editCustomerMng(params) {
  const { customerId } = params;

  return request(`/itv_customers/${customerId}`, {
    method: 'put',
    data: params
  })
}

// 中心咨询师报表数据
export async function queryCenterReport(params) {
  const { date, center } = params;

  return request(`/centerreport?center=${center}&date=${date}`, {
    method: 'get'
  })
}

// 月度数据汇总报表数据
export async function queryCenterMonthlyReport(params) {
  const { year, month, center } = params

  return request(`/centermonthlyreport?center=${center}&year=${year}&month=${month}`, {
    method: 'get'
  })
}

// 善班总部数据分析
export async function querySuReport(params) {
  const { date } = params

  return request(`/sureport?date=${date}`, {
    method: 'get'
  })
}