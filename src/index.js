import dva from 'dva'
import { browserHistory, useRouterHistory, routerRedux } from 'dva/router'
import { createHashHistory } from 'history';
import createLoading from 'dva-loading';
import { message } from 'antd';
import { authority } from './utils'

// 1. Initialize
const app = dva({
  // history: browserHistory,
  history: useRouterHistory(createHashHistory)({ queryKey: false }),  
  onError (error) {
    console.error('dva onError: ', error);
    if (error.status && error.statusText) {
      message.error(`错误码: ${error.status}, 错误信息: ${error.statusText}`, 5);
    } else if (error.message) {
      message.error(`错误信息: ${error.message}`, 5);
    }
  },
  onAction: [
    authority.check()
  ],
});

app.use(createLoading());

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')