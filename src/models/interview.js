/*
 * 社招面试
 *
 */

import {
  queryCustomerFrontDesk, editCustomerFrontDesk, alignCustomerFrontDesk, deleteCustomerFrontDesk
} from '../services/crm'
import {checkResponse, center, today} from '../utils'

export default {
  namespace: 'interview',
  state: {
    name: null, // 分中心名字
    type: null,
    frontData: [],
    current: {},
    followUser: {},

    date: today(),

    editModalVisible: false,
    usersModalVisible: false,  
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
            dispatch({ type: 'app/queryUsers', payload: {center: name} })            
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

        // 分类上午与下午的数据
        let morningNo = 0;
        let afternoonNo = 0;
        let todayObj;
        
        if (date) {
          let arr = date.split('-');
          todayObj = new Date(arr[0], parseInt(arr[1]) - 1, arr[2]);
        } else {
          todayObj = new Date();
        }
        todayObj.setHours(12);
        todayObj.setMinutes(0);
        todayObj.setSeconds(0);
        todayObj.setMilliseconds(0);
        const midday = todayObj.getTime();

        let dataSource = []

        data.data.customers.forEach((d, index) => {
          const {
            _id,
            name,
            mobile,
            major,
            job,
            memsrc,
            createTime,
            followUserName,
            education,
            university,
            jobYears,
          } = d;
          const no = createTime < midday ? ++morningNo : ++afternoonNo;

          dataSource.push({
            _id,
            key: index,
            no,
            follow: followUserName,
            name,
            mobile,
            major,
            job,
            memsrc,
            createTime,
            education,
            university,
            jobYears,
          });
        });

        yield put({ type: 'clearFrontData' })
        yield put({ type: 'queryFrontDeskSuccess', payload: { data: dataSource }})
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
      const frontData = yield select((({ interview }) => (interview.frontData)))

      const data = yield call(alignCustomerFrontDesk, params)
      if (checkResponse(data)) {

        frontData.forEach(e => {
          if (e._id === params._id) {
            e.follow = params.followUserName
          }
        });

        yield put({ type: 'queryFrontDeskSuccess', payload: { data: frontData } })
      }
    },
    *deleteCustomer({ payload }, { select, call, put }) {
      const params = payload.current
      params['customerId'] = params._id      

      const data = yield call(deleteCustomerFrontDesk, params);
      if (checkResponse(data)) {
        yield put({ type: 'queryFrontDesk' })
      }
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
    setDate (state, action) {
      const { date } = action.payload
      return {
        ...state, date
      }
    },
    setFollowUser (state, action) {
      return {
        ...state, ...action.payload
      }
    }
  }
}