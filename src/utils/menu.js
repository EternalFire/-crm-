import {
  guangzhou,
  chongqing,
  changsha,
  nanchang,
  admin,
  getCenterName,
  parseMenuKey,
  isMng,
  isGuangzhou,
  isChongqing,
  isChangsha,
  isNanchang,
  isAdmin,
} from './center';

import * as Authority from './userAuthority'

/*
  XX中心
    社招面试
      签到
      分配简历
    咨询中心
      今日
      本月
      信息总量
    数据分析
*/
function generateCenterMenu(center, name) {
  let menu = {
    key: center,
    name: name,
    icon: 'appstore',
    child: [
      {
        key: center + '-interview',
        name: '社招面试',
        icon: 'team',
        child: [
          {
            key: center + '-qr',
            name: '签到二维码'
          },
          {
            key: center + '-align',
            name: '分配简历'
          }
        ]
      }, 
      {
        key: center + '-center',
        name: '咨询中心',
        icon: 'customer-service',
        child: [
          {
            key: center + '-day',
            name: '今日'
          },
          {
            key: center + '-month',
            name: '本月'
          },
          {
            key: center + '-all',
            name: '信息总量'
          }
        ]
      },
      {
        key: center + '-report',
        name: '数据分析',
        icon: 'line-chart'
      }
    ]
  }

  // 广州分中心的网络咨询菜单
  if (center === guangzhou) {
    menu.child.splice(2, 0, {
      key: center + '-consult',
      name: '网络咨询',
      icon: 'cloud'
    })
  }

  return menu;
}

function generateAdminMenu() {
  return {
    key: admin,
    name: getCenterName(admin),
    icon: 'appstore',
    child: [
      {
        key: admin + '-report', 
        name: '数据分析', 
        icon: 'line-chart'
      },
      {
        key: admin + '-user',
        name: '用户权限',
        icon: 'user'
      }
    ]
  };
}

// const menus = [
//   generateCenterMenu(guangzhou, getCenterName(guangzhou)),
//   generateCenterMenu(chongqing, getCenterName(chongqing)),
//   generateCenterMenu(changsha,  getCenterName(changsha)),
//   generateCenterMenu(nanchang,  getCenterName(nanchang)),
//   generateAdminMenu()
// ];

function walkMenus(nodes) {
  let kv = {};

  let _walk = (array) => {
    array.forEach(element => {
      if (element.child && Array.isArray) {
        element.child.forEach(e => {
          kv[e.key] = [element.key];
          _walk(element.child);
        })
      }
    })
  };

  if (nodes) {    
    _walk(nodes);
  }

  return kv;
}

// const ancestorKeys = walkMenus(menus);

// 菜单按权限显示
function generateMenus(user) {
  let isAdmin_ = Authority.isAdministrator(user.center, user.type);
  let menus = []

  if (isAdmin_ || isGuangzhou(user.center)) {
    menus.push(generateCenterMenu(guangzhou, getCenterName(guangzhou)));
  }

  if (isAdmin_ || isChongqing(user.center)) {
    menus.push(generateCenterMenu(chongqing, getCenterName(chongqing)));
  }

  if (isAdmin_ || isChangsha(user.center)) {
    menus.push(generateCenterMenu(changsha,  getCenterName(changsha)));
  }

  if (isAdmin_ || isNanchang(user.center)) {
    menus.push(generateCenterMenu(nanchang,  getCenterName(nanchang)));
  }

  if (isAdmin_) {
    menus.push(generateAdminMenu());
  }
  return menus;
};

function generateAncestorKeys(nodes) {
  return walkMenus(nodes);
};

export { generateMenus, generateAncestorKeys }
