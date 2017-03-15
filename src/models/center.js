/*
 * 各咨询中心
 */
import {queryMng} from '../services/crm'
import {checkResponse, center} from '../utils'

export default {
  namespace: 'center',
  state: {
    name: center.guangzhou,
    type: center.type.day,
    dayData: [],
    monthData: [],
    allData: [],
    current: {},
    // user: {},

    // 查询条件
    startDate: '2017-2-28',
    endDate: '2017-2-28',
    fsFilter: null,
    ybFilter: null,
    fkFilter: null,
    zjFilter: null,
    jbFilter: null,

    // antd Table 分页
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null
    }

  },
  subscriptions: {
    setup ({dispatch}) {
      dispatch({type: 'query'})
    }
  },
  effects: {
    *query({ payload }, { select, call, put }) {
      const user = yield select(({ app: { user } }) => {
        console.log('=-=-=-=-=', user)
        return user;
      });
      console.log('center => query', user);
    }
  },
  reducers: {
    queryDaySuccess (state, action) {
      const { data } = action.payload;
      return {
        ...state, dayData: data
      }
    }
    // setUser (state, action) {
    //   const { user } = action.payload;
    //   return {
    //     ...state, user
    //   }
    // }
  }
}