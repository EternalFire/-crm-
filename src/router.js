import React from 'react'
import {Router} from 'dva/router'
import App from './routes/app'
import {center} from './utils'

const cached = {}
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

export default function ({history, app}) {

  const interviewRoute = center.getCenters().map((e) => {
    return {
      path: `${e}/${e}-interview/*`,
      name: `${e}/${e}-interview/*`,
      getComponent(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/interview'))
          cb(null, require('./routes/interview'))
        })
      }
    }
  })
  
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
        {
          path: 'admin/adminreport',
          name: 'admin/adminreport',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/admin'))
              cb(null, require('./routes/admin'))
            }, 'adminreport')
          }
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
