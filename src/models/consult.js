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
    date: '2017-02-28',

    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null
    },
    pageSize: 10
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
        currentPageSize: consult.pageSize
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
      const params = yield select((({ consult }) => (consult.current)))
      params['customerId'] = params._id      
      yield call(editCustomerConsult, params)
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
    }
  }
}