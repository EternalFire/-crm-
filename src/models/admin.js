import {querySuReport} from '../services/crm'
import {checkResponse} from '../utils'

export default {
  namespace: 'admin',
  state: {
    sureportData: [],
    date: '2017-2-28'
  },
  subscriptions: {
    setup ({dispatch}) {
      dispatch({type: 'query'})
    }
  },
  effects: {
    *query({ payload }, { select, call, put }) {
      const date = yield select(({ admin }) => admin.date);
      const data = yield call(querySuReport, { ...payload, date })
      if (checkResponse(data)) {        
        yield put({
          type: 'querySuccess',
          payload: {
            sureportData: data.data
          }
        })
      }
    }
  },
  reducers: {
    querySuccess (state, action) {
      const { sureportData } = action.payload
      return { ...state,
        sureportData
      }
    }
  }
}