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
    console.error('app onError -- ', error)
    message.error(e.message, ERROR_MSG_DURATION);    
  }
})

app.use(createLoading());

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
