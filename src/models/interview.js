/*
 * 社招面试
 *
 */

import {queryCustomerFrontDesk} from '../services/crm'
import {checkResponse, center} from '../utils'

export default {
  namespace: 'interview',
  state: {
    name: null, // 分中心名字
    type: null,
    frontData: [],
    current: {},

    date: '2017-02-28'
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(location => {
        
        let {name, type} = center.parsePath(location.pathname)
        console.log('interview => ', name, type);
        
        if (center.isInterview(name)) {          
          dispatch({ type: 'setCenter', payload: { name } })
        }

        if (type === center.interviewType.qr || type === center.interviewType.align) {
          dispatch({ type: 'setType', payload: { type } })
        }

      });
    }
  },
  effects: {
    *queryFrontDesk({ payload }, { select, call, put }) {
      const { name, date } = yield select(({ interview }) => ( interview ));

      if (!name) { 
        return 
      }

      const data = yield call(queryCustomerFrontDesk, { date, name })
      if (checkResponse(data)) {
        yield put({ type: 'clearFrontData' })
        yield put({ type: 'queryFrontDeskSuccess', payload: { data: data.data.customers }})
      } else {
        // 
      }
    },
  },
  reducers: {
    queryFrontDeskSuccess (state, action) {
      const { data } = action.payload
      return {
        ...state,
        frontData: data
      }
    },
    clearFrontData (state, action) {
      return {
        ...state, frontData: []
      }
    },
    setCenter (state, action) {
      const { name } = action.payload
      return {
        ...state, name
      }
    },
    setType (state, action) {
      const { type } = action.payload
      return {
        ...state, type
      }
    }
  }  
}