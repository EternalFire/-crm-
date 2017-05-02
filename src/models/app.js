import {login, queryUserWithId, queryUserWithCenter} from '../services/crm'
import {parse} from 'qs'
import {checkResponse, getCookie, delCookie} from '../utils'

const cookie_userid = 'userid'

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: false,
    isLoginFail: false,
    user: {}, // 登录成功的用户
    users: [], // 用户(顾问)列表
    loginButtonLoading: false,
    menuPopoverVisible: false,
    // siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    siderFold: false,
    // darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    darkTheme: true,
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]'),
    openKey: '',
    userInfoModalVisible: false
  },
  subscriptions: {
    setup ({history, dispatch}) {
      let userid = getCookie(cookie_userid)
      if (userid.length > 0) {
        dispatch({type: 'queryUser', payload: { userid }})
      }

      window.onresize = function () {
        dispatch({type: 'changeNavbar'})
      }
    }
  },
  effects: {
    *login ({ payload }, {call, put}) {
      yield put({type: 'showLoginButtonLoading'})
      const data = yield call(login, parse(payload))
      
      if (checkResponse(data)) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              ...data.data
            }
          }
        });
      } else {
        yield put({
          type: 'loginFail'
        });
      }
    },
    *queryUser ({ payload }, {call, put}) {
      yield put({type: 'showLoading'})

      const data = yield call(queryUserWithId, parse(payload))
      if (checkResponse(data)) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              ...data.data
            }
          }
        });
      }

      yield put({type: 'hideLoading'})      
    },
    *queryUsers ({ payload }, { select, call, put }) {
      const data = yield call(queryUserWithCenter, { ...payload })

      if (checkResponse(data)) {
        yield put({ type: 'setUsers', payload: { users: data.data } })
      }
    },
    *logout ({ payload }, {call, put}) {
      // const data = yield call(logout, parse(payload))
      // if (data.success) {
      //   yield put({
      //     type: 'logoutSuccess'
      //   })
      // }
      delCookie(cookie_userid)

      yield put({
        type: 'logoutSuccess'
      })
    },    
    *switchSider ({ payload }, {put}) {
      yield put({
        type: 'handleSwitchSider'
      })
    },
    *changeTheme ({ payload }, {put}) {
      yield put({
        type: 'handleChangeTheme'
      })
    },
    *changeNavbar ({ payload }, {put}) {
      if (document.body.clientWidth < 769) {
        yield put({type: 'showNavbar'})
      } else {
        yield put({type: 'hideNavbar'})
      }
    },
    *switchMenuPopver ({ payload }, {put}) {
      yield put({
        type: 'handleSwitchMenuPopver'
      })
    },
    *updateUser ({ payload }, { select, call, put }) {
      // todo
      yield put({ type: 'updateUserLocal', payload })
    }
  },
  reducers: {
    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false,
        isLoginFail: false
      }
    },
    logoutSuccess (state) {
      return {
        ...state,
        login: false        
      }
    },
    loginFail (state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false,
        isLoginFail: true
      }
    },
    clearLoginFail (state) {
      return {
        ...state, isLoginFail: false
      }
    },
    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true
      }
    },
    showLoading (state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading (state) {
      return {
        ...state,
        loading: false
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      }
    },
    handleNavOpenKeys (state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    handleClickMenu (state, action) {
      const { openKey } = action.payload
      return {
        ...state,
        openKey
      }
    },
    setUsers (state, action) { return {...state,...action.payload} },
    showUserInfoModal (state, action) { return {...state, userInfoModalVisible: true} },
    hideUserInfoModal (state, action) { return {...state, userInfoModalVisible: false} },
    updateUserLocal (state, action) { return {...state, user: action.payload} }
  }
}
