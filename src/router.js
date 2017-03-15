import React from 'react'
import {Router} from 'dva/router'
import App from './routes/app'

const cached = {}
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

export default function ({history, app}) {
  const routes = [
    {
      path: '/',
      component: App,
      // getIndexRoute (nextState, cb) {
      //   require.ensure([], require => {
      //     registerModel(app, require('./models/dashboard'))
      //     cb(null, {component: require('./routes/dashboard')})
      //   }, 'dashboard')
      // },
      getIndexRoute (nextState, cb) {
        // require.ensure([], require => {
        //   // registerModel(app, require('./models/users'))
        //   // cb(null, {component: require('./routes/users')})
        //   cb(null, { component: <div>crm?</div> })
        // })
        require.ensure([], require => {
          cb(null, {component: require('./routes/homePage')})
        })
      },
      childRoutes: [
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
          path: 'gz/gzcenter/*',
          name: 'gz/gzcenter/*',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/center'))
              cb(null, require('./routes/center'))
            }, 'center')
          }
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard'))
            }, 'dashboard')
          }
        }, {
          path: 'users',
          name: 'users',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/users'))
              cb(null, require('./routes/users'))
            }, 'users')
          }
        }, {
          path: 'people',
          name: 'people',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/people'))
              cb(null, require('./routes/people'))
            }, 'people')
          }
        }, {
          path: 'ui/ico',
          name: 'ui/ico',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/ico'))
            }, 'ui-ico')
          }
        }, {
          path: 'ui/search',
          name: 'ui/search',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/search'))
            }, 'ui-search')
          }
        }, {
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
