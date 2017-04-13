/*
 * 总部
 */
import {querySuReport} from '../services/crm'
import {checkResponse, today} from '../utils'

export default {
  namespace: 'admin',
  state: {
    sureportData: [], 
    date: today() //'2017-2-28'
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
        let dataSource = data.data;
        let tdata = [];
        let allCount = 0;
        let allYb = 0;
        
        tdata = dataSource.map((d, index) => {
          d.key = index;
          allCount += d.count;
          allYb += d.yb;
          return d
        });

        tdata.push({
          center: '总计',
          yb: allYb,
          count: allCount,
          key: tdata.length
        }); 

        yield put({
          type: 'querySuccess',
          payload: {
            sureportData: tdata
          }
        })
      }
    },
  },
  reducers: {
    querySuccess (state, action) {
      const { sureportData } = action.payload
      return { 
        ...state,
        sureportData
      }
    },
    setDate (state, action) {
      return { ...state, ...action.payload }
    }
  }
}