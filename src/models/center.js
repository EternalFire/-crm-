/*
 * 分中心的咨询中心
 */
import { queryMng, editCustomerMng } from '../services/crm';
import { checkResponse, center, authority, today, tomorrow, startOfMonth, endOfMonth } from '../utils';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'center',
  state: {
    name: null,
    type: center.type.day, // 按 天/月/总 查询
    dayData: [],
    monthData: [],
    allData: [],
    current: {}, // 选择的数据条目

    // 查询条件
    startDate: today(), 
    endDate: today(), 
    fsFilter: null,
    ybFilter: null,
    fkFilter: null,
    zjFilter: null,
    jbFilter: null,

    mobileFilterVisible: false,
    mobileText: '',

    usersFilters: [],

    // antd Table 分页
    pagination: {
      // showSizeChanger: true,
      // showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize: 20,
      total: null
    },
    modalVisible: false,
    currentMenuKey: ['dayAllMenu'], 
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(location => {
        let {name, type} = center.parsePath(location.pathname);

        if (center.isMng(name, type)) {
          dispatch({ type: 'setCenter', payload: { name, type } })

          let menuKey = '';
          if (type === center.type.day) {
            menuKey = 'dayAllMenu';
            dispatch({ type: 'setStartDate', payload: { startDate: today() } });
            dispatch({ type: 'setEndDate', payload: { endDate: tomorrow() } });
          } else if (type === center.type.month) {
            menuKey = 'monthAllMenu';
            dispatch({ type: 'setStartDate', payload: { startDate: startOfMonth() } });
            dispatch({ type: 'setEndDate', payload: { endDate: endOfMonth() } });
          } else {
            dispatch({ type: 'setStartDate', payload: { startDate: today() } });
            dispatch({ type: 'setStartDate', payload: { endDate: tomorrow() } });
          }

          dispatch({ type: 'setCurrentMenuKey', payload: { currentMenuKey: [menuKey] }});
          dispatch({ type: 'resetPagination' });          
          dispatch({ type: 'query' });

          // 获取咨询师
          dispatch({ type: 'app/queryUsers', payload: { center: name } });
        }
      });
    }
  },
  effects: {
    *query({ payload = {} }, { select, call, put }) {
      const params = yield select(({ 
        app: { user },
        center: { 
          name, startDate, endDate, fsFilter, ybFilter, fkFilter, zjFilter, jbFilter, pagination: { current, pageSize }, mobileText, usersFilters 
        }
      }) => ({ 
        user, center: name, startDate, endDate, fsFilter, ybFilter, fkFilter, zjFilter, jbFilter, currentPage: current, currentPageSize: pageSize, mobileText, usersFilters 
      }));

      const currentType = yield select(({ center }) => ( center.type ));

      if (!authority.checkCenter(params.center, currentType, params.user)) {
        yield put(routerRedux.push({ pathname: '/' }));
        return
      }

      // 咨询师 id 筛选
      let usersFilters = params.usersFilters;
      if (usersFilters && usersFilters.length > 0) {
        params.userFilterID = usersFilters[0];
      }

      const data = yield call(queryMng, params);
      // console.log('data => ', data);
      if (checkResponse(data)) {
        switch(currentType) {
          case center.type.day: 
            // yield put({ type: 'clearDayData' })
            yield put({ type: 'queryDaySuccess', payload: { data: data.data.customers } });
            yield put({ type: 'setTotal', payload: { total: data.data.total }});
            break;
          case center.type.month:
            // yield put({ type: 'clearMonthData' })
            yield put({ type: 'queryMonthSuccess', payload: { data: data.data.customers } });
            yield put({ type: 'setTotal', payload: { total: data.data.total }});
            break;
          case center.type.all:
            // yield put({ type: 'clearAllData' })
            yield put({ type: 'queryAllSuccess', payload: { data: data.data.customers } });
            yield put({ type: 'setTotal', payload: { total: data.data.total }});
            break;
          default:
            console.error(new Error(`currentType = ${currentType}`))
            break;
        }
      } else {
        // 
      }
    },
    // *changeCenter({ payload }, { select, call, put }) {
    //   const { currentName, currentType } = yield select(({ center }) => ( { currentName: center.name, currentType: center.type } ));
    //   const { name, type } = payload;
      
    //   console.log('current => ', currentName, currentType);
    //   console.log('ToChange => ', name, type);
      
    //   yield put({ type: 'setCenter', payload });
    // },
    *updateCustomer({ payload }, { select, call, put }) {
      const params = payload.current;
      params['customerId'] = params._id
      // console.log('check key customerId => ', params)

      const data = yield call(editCustomerMng, params)
      // console.log('updateCustomer => ', data)
      if (checkResponse(data)) {
        yield put({ type: 'updateLocalData', payload: { current: params } })
      }
    },
    *updateLocalData({ payload }, { select, call, put }) {
      const currentType = yield select(({ center }) => ( center.type ));
      const {current} = payload;
      let centerData = [];

      switch(currentType) {
        case center.type.day: 
          centerData = yield select((({ center }) => (center.dayData)))
          break;
        case center.type.month:
          centerData = yield select((({ center }) => (center.monthData)))
          break;
        case center.type.all:
          centerData = yield select((({ center }) => (center.allData)))
          break;
        default:
          console.error(new Error(`currentType = ${currentType}`))
          break;
      }

      let data = [];
      data = centerData.map(e => {
        if (e._id === current._id) {
          return {...current};
        }
        return e;
      });

      switch(currentType) {
        case center.type.day: 
          yield put({ type: 'queryDaySuccess', payload: { data } });
          break;
        case center.type.month:
          yield put({ type: 'queryMonthSuccess', payload: { data } });
          break;
        case center.type.all:
          yield put({ type: 'queryAllSuccess', payload: { data } });
          break;
        default:
          break;
      }
    },
    *clearFilters({ payload }, { select, call, put }) {
      yield put({ type: 'setMobileText', payload: { mobileText: '' } });
      yield put({ type: 'setUsersFilters', payload: { usersFilters: [] } })
    }
  },
  reducers: {
    queryDaySuccess (state, action) {
      const { data } = action.payload;
      return {
        ...state, dayData: data
      }
    },
    queryMonthSuccess (state, action) {
      const { data } = action.payload;
      return {
        ...state, monthData: data
      }
    },
    queryAllSuccess (state, action) {
      const { data } = action.payload;
      return {
        ...state, allData: data
      }
    },    
    setCenter (state, action) {
      const { name, type } = action.payload;
      return {
        ...state, name, type
      }
    },
    clearDayData (state, action) {
      return {
        ...state, dayData: []
      }
    },
    clearMonthData (state, action) {
      return {
        ...state, monthData: []
      }
    },
    clearAllData (state, action) {
      return {
        ...state, allData: []
      }
    },
    setCurrent (state, action) {
      return {
        ...state, ...action.payload
      }
    },
    setModalVisible (state, action) {
      const { visible } = action.payload;
      return {
        ...state,
        modalVisible: visible
      }
    },
    setTotal (state, action) {
      return {
        ...state, pagination: {...state.pagination, ...action.payload}
      }
    },
    setPagination (state, action) {
      return {
        ...state, ...action.payload
      }
    },
    resetPagination (state, action) {
      return {
        ...state, pagination: { ...state.pagination, current: 1 }
      }
    },
    setCurrentMenuKey (state, action) {
      return {
        ...state, ...action.payload
      }
    },
    setStartDate (state, action) {
      return {
        ...state, ...action.payload
      }
    },
    setEndDate (state, action) {
      return {
        ...state, ...action.payload
      }
    },
    setybFilter (state, action) {
      return {
        ...state, ...action.payload
      }
    },
    setjbFilter (state, action) {
      return {
        ...state, ...action.payload
      }      
    },
    setMobileText (state, action) {
      return { ...state, ...action.payload }
    },
    setMobileFilterVisible (state, action) {
      return { ...state, ...action.payload }
    },
    setUsersFilters (state, action) {
      return { ...state, ...action.payload }
    }
  }
}