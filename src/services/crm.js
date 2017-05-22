import { request, authority } from '../utils'

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
export async function alignCustomerFrontDesk(params) {
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
    currentPageSize,
    userFilterID,
    mobileText
  } = params;

  let url = `/itv_customers?center=${center}&startDate=${startDate}&endDate=${endDate}&sortby=createTime&current=${currentPage}&pageSize=${currentPageSize}`;

  if (authority.isWorker(user.type)) {
    url += '&followUserId=' + user._id;
  } else if(userFilterID) {
    url += '&followUserId=' + userFilterID;
  }

  if (fsFilter) url += '&notnull=fsTime';
  if (ybFilter) url += '&notnull=ybTime';
  if (fkFilter) url += '&notnull=fkTime';
  if (zjFilter) url += '&notnull=zjTime';
  if (jbFilter) url += '&notnull=jbTime';

  if (mobileText) {
    url += `&mobile=${mobileText}`
  }

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
export async function queryCenterUserReport(params) {
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

// 网络咨询, begin
export async function queryConsult(params) {
  const {
    // center,
    startDate,
    endDate,
    // fsFilter,
    // ybFilter,
    // fkFilter,
    // zjFilter,
    // jbFilter,
    // user,
    currentPage, 
    currentPageSize,
    nameText,
    mobileText,
    userFilterID
  } = params;

  const memsrc = 'wz';
  let url = `/itv_customers?sortby=-createTime&memsrc=${memsrc}&current=${currentPage}&pageSize=${currentPageSize}`;

  // if (fsFilter) url += '&notnull=fsTime';
  // if (ybFilter) url += '&notnull=ybTime';
  // if (fkFilter) url += '&notnull=fkTime';
  // if (zjFilter) url += '&notnull=zjTime';
  // if (jbFilter) url += '&notnull=jbTime';

  // console.log('url is ', url);
  
  if(startDate) {
    url += `&startDate=${startDate}`;
  }

  if(endDate) {
    url += `&endDate=${endDate}`;
  }

  if (nameText) {
    url += `&name=${nameText}`
  }

  if (mobileText) {
    url += `&mobile=${mobileText}`
  }

  if (userFilterID) {
    url += '&followUserId=' + userFilterID;
  }

  return request(url, {
    method: 'get'
  })
}

export async function queryConsultMessage(params) {
  const {guest_id} = params;

  return request(`/messages?guest_id=${guest_id}`, {
    method: 'get'
  })
}

export async function editCustomerConsult(params) {
  const { customerId } = params;

  return request(`/itv_customers/${customerId}`, {
    method: 'put',
    data: params
  })
}
// 网络咨询, end

// 更新用户
export async function updateUserWithId(user) {
  return request(`/users/${user._id}`, {
    method: 'put',
    data: user
  })
}

// 删除用户
export async function deleteUserWithId(user) {  
  return request(`/users/${user._id}`, {
    method: 'delete',
  })
}
