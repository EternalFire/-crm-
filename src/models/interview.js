/*
 * 社招面试
 *
 */

import {
  queryCustomerFrontDesk, editCustomerFrontDesk, alignCustomerFrontDesk, deleteCustomerFrontDesk
} from '../services/crm'
import {checkResponse, center} from '../utils'

export default {
  namespace: 'interview',
  state: {
    name: null, // 分中心名字
    type: null,
    frontData: [],
    current: {},

    date: '2017-02-28',

    editModalVisible: false,
    usersModalVisible: false
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(location => {
        
        let {name, type} = center.parsePath(location.pathname)
        
        if (center.isInterview(name)) {
          if (type === center.interviewType.qr || type === center.interviewType.align) {
            dispatch({ type: 'setCenter', payload: { name, type } })
          }
          if (type === center.interviewType.align) {
            dispatch({ type: 'queryFrontDesk' })
          }
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

      const data = yield call(queryCustomerFrontDesk, { date, center: name })
      if (checkResponse(data)) {
        yield put({ type: 'clearFrontData' })
        yield put({ type: 'queryFrontDeskSuccess', payload: { data: data.data.customers }})
      } else {
        // 
      }
    },
    *update({ payload }, { select, call, put }) {
      const params = yield select((({ interview }) => (interview.current)))

      // todo: check key 'customerId' in params
      params['customerId'] = params._id
      console.log('interview check key customerId => ', params['customerId'])

      yield call(editCustomerFrontDesk, params)
    },
    *align({ payload }, { select, call, put }) {
      const params = yield select((({ interview }) => (interview.current)))

      yield call(alignCustomerFrontDesk, params)
    },
    *deleteCustomer({ payload }, { select, call, put }) {
      const params = yield select((({ interview }) => (interview.current)))
      params['customerId'] = params._id      

      yield call(deleteCustomerFrontDesk, params)
    }    
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
      const { name, type } = action.payload
      return {
        ...state, name, type
      }
    },
    setCurrent (state, action) {
      return {
        ...state, ...action.payload
      }
    },
    setEditModalVisible (state, action) {
      const { visible } = action.payload
      return {
        ...state, editModalVisible: visible
      }
    },
    setUsersModalVisible (state, action) {
      const { visible } = action.payload
      return {
        ...state, usersModalVisible: visible
      }
    },
  }
}