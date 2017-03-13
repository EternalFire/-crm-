// module.exports = [
//   {
//     key: 'dashboard',
//     name: '仪表盘',
//     icon: 'laptop'
//   },
//   {
//     key: 'users',
//     name: '用户管理',
//     icon: 'user'
//   },
//   {
//     key: 'ui',
//     name: 'UI组件',
//     icon: 'camera-o',
//     clickable: false,
//     child: [
//       {
//         key: 'ico',
//         name: 'Ico 图标'
//       },
//       {
//         key: 'search',
//         name: 'Search 搜索'
//       }
//     ]
//   },
//   {
//     key: 'people',
//     name: 'people test',
//     icon: 'user'
//   },
//   {
//     key: 'navigation',
//     name: '测试导航',
//     icon: 'setting',
//     child: [
//       {
//         key: 'navigation1',
//         name: '二级导航1'
//       },
//       {
//         key: 'navigation2',
//         name: '二级导航2',
//         child: [
//           {
//             key: 'navigation21',
//             name: '三级导航1'
//           },
//           {
//             key: 'navigation22',
//             name: '三级导航2'
//           }
//         ]
//       }
//     ]
//   }
// ]

import {
  guangzhou,
  chongqing,
  changsha,
  nanchang,
  admin,
  getCenterName
} from './center';

function generateCenterMenu(center, name) {
  return {
    key: center,
    name: name,
    icon: 'appstore',
    child: [
      {
        key: center + 'itv',
        name: '社招面试',
        icon: 'team',
        child: [
          {
            key: center + 'qr',
            name: '签到二维码'
          },
          {
            key: center + 'align',
            name: '分配简历'
          }
        ]
      }, 
      {
        key: center + 'center',
        name: '咨询中心',
        icon: 'customer-service',
        child: [
          {
            key: center + 'today',
            name: '今日'
          },
          {
            key: center + 'monthmng',
            name: '本月'
          },
          {
            key: center + 'allmng',
            name: '信息总量'
          }
        ]
      },
      {
        key: center + 'report',
        name: '数据分析',
        icon: 'line-chart'
      }
    ]
  }
}

const menus = [
  generateCenterMenu(guangzhou, getCenterName(guangzhou)),
  generateCenterMenu(chongqing, getCenterName(chongqing)),
  generateCenterMenu(changsha,  getCenterName(changsha)),
  generateCenterMenu(nanchang,  getCenterName(nanchang))
];

console.log(menus);

function walkMenus(nodes) {
  let kv = {};

  let _walk = (array) => {
    array.forEach(element => {
      if (element.child) {
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

// console.log('after walk', walkMenus(menus));
const ancestorKeys = walkMenus(menus);

// todo: 菜单按权限显示
export default menus;
export {ancestorKeys}