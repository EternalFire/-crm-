/*
 * 网络咨询
 */
import {queryConsult, queryConsultMessage, editCustomerConsult, deleteCustomerFrontDesk as deleteCustomer} from '../services/crm'
import {checkResponse, center, authority, today} from '../utils'
import { routerRedux } from 'dva/router';

export default {
  namespace: 'consult', 
  state: {
    name: null,    
    data: [],
    current: {},
    currentMessage: [],
    // date: '2017-02-28',


    editModalVisible: false,
    messageModalVisible: false,

    // 查询条件
    nameText: '',
    nameFilterVisible: false,

    startDate: today(),
    endDate: today(),

    mobileText: '',
    mobileFilterVisible: false,

    usersFilters: [],
    
    pagination: {
      // showSizeChanger: true,
      // showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize: 20,
      total: null
    },
  }, 
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(location => {
        let {name, type} = center.parsePath(location.pathname);
        
        if (center.isConsult(type)) {
          dispatch({ type: 'setCenter', payload: { name } });
          dispatch({ type: 'resetPagination' });
          dispatch({ type: 'setStartDate', payload: { startDate: today() } });
          dispatch({ type: 'setEndDate', payload: { endDate: today() } });
          dispatch({ type: 'query' });

          dispatch({ type: 'app/queryUsers', payload: { center: name } });
        }
      });
    }
  }, 
  effects: {
    *query({ payload }, { select, call, put }) {
      const params = yield select(({ consult }) => ({
        currentPage: consult.pagination.current,
        currentPageSize: consult.pagination.pageSize,
        startDate: consult.startDate,
        endDate: consult.endDate,
        nameText: consult.nameText,
        mobileText: consult.mobileText,
        name: consult.name,
        userFilterID: consult.usersFilters[0]
      }));

      const { user } = yield select(({ app }) => (app));      

      if (!authority.checkCenter(params.name, 'currentType', user)) {
        yield put(routerRedux.push({ pathname: '/' }));
        return
      }
      
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
    }, 
    *clearFilters({ payload }, { select, call, put }) {
      yield put({ type: 'setMobileText', payload: { mobileText: '' } });
      yield put({ type: 'setNameText', payload: { nameText: '' } });
      yield put({ type: 'setUsersFilters', payload: [] })    
    },
    *deleteCustomer({ payload }, { select, call, put }) {
      const params = payload.current
      params['customerId'] = params._id      

      const data = yield call(deleteCustomer, params);
      if (checkResponse(data)) {
        yield put({ type: 'query' })
      }
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
        ...state, 
        messageModalVisible: false, 
        currentMessage: []
      }
    }, 
    setPagination (state, action) {
      return { ...state, ...action.payload }
    }, 
    setCurrent (state, action) {
      return { ...state, ...action.payload }
    }, 
    setNameText (state, action) {
      return { ...state, ...action.payload }
    }, 
    setNameFilterVisible (state, action) {
      return { ...state, ...action.payload }
    }, 
    setStartDate (state, action) {
      return { ...state, ...action.payload }
    }, 
    setEndDate (state, action) {
      return { ...state, ...action.payload }
    }, 
    setMobileText (state, action) {
      return { ...state, ...action.payload }
    }, 
    setMobileFilterVisible (state, action) {
      return { ...state, ...action.payload }
    }, 
    setCenter (state, action) {
      return { ...state, ...action.payload }
    }, 
    resetPagination (state, action) {
      return {
        ...state, pagination: { ...state.pagination, current: 1 }
      }
    }, 
    setUsersFilters (state, action) {
      return { ...state, usersFilters: action.payload }
    }   
  }
}