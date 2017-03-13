import { query } from '../services/people'
import { parse } from 'qs'

export default {
  namespace: 'people',
  state: {
    list: [],
    loading: false,
    currentItem: {},
    modalVisible: false,
    isMotion: localStorage.getItem('antdAdminPeopleIsMotion') === 'true', 
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null
    }    
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/people') {
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
      });
    }
  },
  effects: {
    *query ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(query, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',          
          payload: {
            list: data.data
          }
        })        
      }
    }
  },
  reducers: {
    showLoading (state) {
      return { ...state, loading: true }
    },
    querySuccess (state, action) {
      const { list } = action.payload
      return { ...state,
        list,
        loading: false,
      }
    }
  }
}