/*
 * 咨询中心
 */
import {queryConsult, queryConsultMessage, editCustomerConsult} from '../services/crm'
import {checkResponse, center} from '../utils'

export default {
  namespace: 'consult', 
  state: {
    data: [],
    current: {},
    currentMessage: [],
    // date: '2017-02-28',

    pagination: {
      // showSizeChanger: true,
      // showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize: 20,
      total: null
    },

    editModalVisible: false,
    messageModalVisible: false
  }, 
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(location => {
        dispatch({ type: 'query' })
      });
    }
  }, 
  effects: {
    *query({ payload }, { select, call, put }) {
      const params = yield select(({ consult }) => ({
        currentPage: consult.pagination.current,
        currentPageSize: consult.pagination.pageSize
      }));

      const data = yield call(queryConsult, params)

      if (checkResponse(data)) {
        yield put({ 
          type: 'querySuccess', 
          payload: { 
            data: data.data.customers,
            pagination: {
              total: data.data.total
            }
          } 
        });
      }
    }, 
    *update({ payload }, { select, call, put }) {
      const params = payload.current;
      params['customerId'] = params._id      
      
      const data = yield call(editCustomerConsult, params)
      
      if (checkResponse(data)) {
        yield put({ type: 'updateLocalData', payload: { params } });
      }
    },
    *queryMessage({ payload }, { select, call, put }) {
      const params = { guest_id: payload.guest_id };

      let data = yield call(queryConsultMessage, params);
      if (typeof(data) == 'string') {
        data = JSON.parse(data);
      }

      if (checkResponse(data)) {
        yield put({ type: 'queryMessageSuccess', payload: { currentMessage: data.data } });
      }
    },
    *updateLocalData({ payload }, { select, call, put }) {
      const consultData = yield select((({ consult }) => (consult.data)))
      const { params } = payload;

      let newData = [];
      newData = consultData.map((e, i) => {
        if (e._id === params._id) {
          return {...params};
        }
        return e;
      });

      yield put({ type: 'updateLocalDataSuccess', payload: { data: newData } });
    }
  }, 
  reducers: {
    querySuccess(state, action) {
      const {data, pagination} = action.payload
      return {
        ...state, 
        data, 
        pagination: {
          ...state.pagination,
          ...pagination
        }
      }
    },
    queryMessageSuccess (state, action) {
      return { ...state, ...action.payload }
    }, 
    updateLocalDataSuccess (state, action) {
      return { ...state, ...action.payload }
    },
    showEditModal (state, action) {
      return {
        ...state, editModalVisible: true
      }
    },
    hideEditModal (state, action) {
      return {
        ...state, editModalVisible: false
      }
    },
    showMessageModal (state, action) {
      return {
        ...state, messageModalVisible: true
      }
    },
    hideMessageModal (state, action) {
      return {
        ...state, messageModalVisible: false
      }
    },    
    setPagination (state, action) {
      return { ...state, ...action.payload }
    },
    setCurrent (state, action) {
      return { ...state, ...action.payload }
    },
  }
}