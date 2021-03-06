import dva from 'dva'
import { browserHistory, useRouterHistory } from 'dva/router'
import { createHashHistory } from 'history';
import createLoading from 'dva-loading';
import { message } from 'antd';


// 1. Initialize
const app = dva({
  // history: browserHistory,
  history: useRouterHistory(createHashHistory)({ queryKey: false }),  
  onError (error) {
    console.error('dva onError: ', error);
    message.error(`错误码: ${error.status}, 错误信息: ${error.statusText}`, 4);
  }
})

app.use(createLoading());

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')