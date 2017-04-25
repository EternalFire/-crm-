/*
 * 总部
 */
import {querySuReport, queryUserWithCenter} from '../services/crm'
import {checkResponse, today, center} from '../utils'

export default {
  namespace: 'admin',
  state: {
    sureportData: [], 
    allUsers: [], 
    currentUser: {}, // 当前选择的用户
    date: today(), //'2017-2-28'
    userModalVisible: false, // 控制用户权限弹窗
    userInitModalVisible: false, // 控制用户新增弹窗
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(location => {        
        let {name, type} = center.parsePath(location.pathname);

        if (center.isAdmin(name)) {
          if (center.isReport(type)) {
            dispatch({type: 'query'})
          }

          if (center.isUser(type)) {
            dispatch({type: 'queryAllUsers'})
          }
        }
      });
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

        yield put({ type: 'querySuccess', payload: { sureportData: tdata } });
      }
    },
    *queryAllUsers({ payload }, { select, call, put }) {
      const allUsers = yield select(({ admin }) => admin.allUsers);
      if (allUsers.length == 0) {
        
        {
          const data = yield call(queryUserWithCenter, { center: center.guangzhou })
          if (checkResponse(data)) {
            yield put({ type: 'addUsersLocal', payload: data.data })
          }
        }
        
        {
          const data = yield call(queryUserWithCenter, { center: center.chongqing })
          if (checkResponse(data)) {
            yield put({ type: 'addUsersLocal', payload: data.data })
          }
        }

        {
          const data = yield call(queryUserWithCenter, { center: center.changsha })
          if (checkResponse(data)) {
            yield put({ type: 'addUsersLocal', payload: data.data })
          }
        }
        
        {
          const data = yield call(queryUserWithCenter, { center: center.nanchang })
          if (checkResponse(data)) {
            yield put({ type: 'addUsersLocal', payload: data.data })
          }
        }

        {
          const data = yield call(queryUserWithCenter, { center: center.admin })
          if (checkResponse(data)) {
            yield put({ type: 'addUsersLocal', payload: data.data })
          }
        }
      } else {
        // need not query
      }
    },
    *updateUser({ payload }, { select, call, put }) {
      // todo
      
      yield put({ type: 'updateUserLocal', payload })
      yield put({ type: 'sortUsers' })
    },
    *deleteUser({ payload }, { select, call, put }) {    
      // todo
      
      yield put({ type: 'deleteUserLocal', payload })
    },
    *addUser({ payload }, { select, call, put }) {
      // todo
      
      yield put({ type: 'addUsersLocal', payload: [payload] });
      yield put({ type: 'sortUsers' })
    }
  },
  reducers: {
    querySuccess (state, action) {
      const { sureportData } = action.payload
      return { ...state, sureportData }
    },
    setDate (state, action) {
      return { ...state, ...action.payload }
    }, 
    addUsersLocal (state, action) {
      return { ...state, allUsers: [ ...state.allUsers, ...action.payload ] }
    },
    updateUserLocal (state, action) {
      let user = action.payload

      return { ...state, allUsers: [ 
        ...state.allUsers.map(e => {
          if (e._id !== user._id) {
            return e;
          } else {
            return user;
          }
        })
      ]}
    },
    deleteUserLocal (state, action) {
      let user = action.payload
      return { ...state, allUsers: state.allUsers.filter(e => (e._id !== user._id)) }
    }, 
    sortUsers (state, action) {
      let newData = [];      
      center.allCenters().forEach(e => {
        let array = state.allUsers.filter(element => element.center === e);
        array = array.sort((a, b) => {
          return a.type - b.type;
        });
        newData = [...newData, ...array]
      });
      return { ...state, allUsers: newData }
    },
    showUserModal (state, action) { return { ...state, userModalVisible: true }; }, 
    hideUserModal (state, action) { return { ...state, userModalVisible: false }; }, 
    setCurrentUser (state, action) { return { ...state, currentUser: action.payload }; }, 
    showUserInitModal (state, action) { return { ...state, userInitModalVisible: true }; }, 
    hideUserInitModal (state, action) { return { ...state, userInitModalVisible: false }; }, 
  }
}