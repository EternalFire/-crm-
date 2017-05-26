import React from 'react'
import {Router} from 'dva/router'
import App from './routes/app'
import {center} from './utils'

const cached = {}
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    cached[model.namespace] = 1; // 先标记
    app.model(model);
  }
}

export default function ({history, app}) {

  // 社招面试
  const interviewRoute = center.getCenters().map((e) => {
    return {
      path: `${e}/${e}-interview/*`,
      name: `${e}/${e}-interview/*`,
      getComponent(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/interview'))
          cb(null, require('./routes/interview'))
        }, 'interview')
      }
    }
  });
  
  // 咨询中心
  const centerRoute = center.getCenters().map((e) => {
    return {
      path: `${e}/${e}-center/*`,
      name: `${e}/${e}-center/*`,
      getComponent(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/center'))
          cb(null, require('./routes/center'))
        }, 'center')
      }
    }
  });

  // 网络咨询
  const consultRoute = [{
    path: `${center.guangzhou}/${center.guangzhou}-consult`,
    name: `${center.guangzhou}/${center.guangzhou}-consult`,
    getComponent(nextState, cb) {
      require.ensure([], require => {
        registerModel(app, require('./models/consult'))
        cb(null, require('./routes/consult'))
      }, 'consult')
    }    
  }]

  // 数据分析
  const centerReportRoute = center.getCenters().map((e) => {
    return {
      path: `${e}/${e}-report`,
      name: `${e}/${e}-report`,
      getComponent(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/centerReport'))
          cb(null, require('./routes/centerReport'))
        }, 'centerReport')
      }
    }
  });  

  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          cb(null, {component: require('./routes/homePage')})
        })
      },
      childRoutes: [
        ...interviewRoute,
        ...centerRoute,
        ...consultRoute,
        ...centerReportRoute,
        {
          path: 'admin/admin-report',
          name: 'admin/admin-report',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/admin'))
              cb(null, require('./routes/adminReport'))
            }, 'adminReport')
          }
        },
        {
          path: 'admin/admin-user',
          name: 'admin/admin-user',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/admin'))
              cb(null, require('./routes/user'))
            }, 'adminUser')
          }
        }, 
        {
          path: 'about',
          name: 'about',
          getIndexRoute (nextState, cb) {
            require.ensure([], require => {
              cb(null, {component: require('./routes/homePage')})
            })
          },
        },
        {
          path: '*',
          name: 'error',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error'))
            }, 'error')
          }
        }
      ]
    }
  ]

  return <Router history={history} routes={routes} />
}
