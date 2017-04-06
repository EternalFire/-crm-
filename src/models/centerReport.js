/*
 * 分中心的数据分析
 */
import {queryCenterUserReport, queryCenterMonthlyReport} from '../services/crm'
import {checkResponse, center, today, getYear, getMonth} from '../utils'

export default {
  namespace: 'centerReport',
  state: {
    name: null,
    userData: [], // 咨询师报表数据
    monthlyData: [], // 月度报表数据
    date: '2017 -02-28',
    userDate: '2017-3-1',
    monthDate: '2017-3-1',
    userReportGraphVisible: false,
    monthlyReportGraphVisible: false,
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(location => {
        let {name} = center.parsePath(location.pathname);
        dispatch({ type: 'setCenter', payload: { name } });
        dispatch({ type: 'queryUserReport' });
        dispatch({ type: 'queryMonthlyReport' });
      });
    }
  }, 
  effects: {
    *queryUserReport({ payload }, { select, call, put }) {
      const { name, userDate } = yield select(({ centerReport }) => (centerReport))

      if (!name) { return }

      const data = yield call(queryCenterUserReport, { center: name, date: userDate })
      if (checkResponse(data)) {
        // yield put({ type: 'clearUserReport' })
        yield put({ type: 'queryUserReportSuccess',  payload: { userData: data } })
      }
    },
    *queryMonthlyReport({ payload }, { select, call, put }) {
      const { name, monthDate } = yield select(({ centerReport }) => (centerReport))

      if (!name) { return }

      const year = getYear(monthDate),
        month = getMonth(monthDate)

      const data = yield call(queryCenterMonthlyReport, { center: name, year, month })
      if (checkResponse(data)) {
        // yield put({ type: 'clearMonthlyReport' })
        yield put({ type: 'queryMonthlyReportSuccess',  payload: { userData: data } })
      }
    },
  },
  reducers: {
    queryUserReportSuccess(state, action) {
      const { data } = action.payload;
      return {
        ...state, userData: data
      }
    },
    queryMonthlyReportSuccess(state, action) {
      const { data } = action.payload;
      return {
        ...state, monthlyData: data
      }
    },
    clearUserReport(state, action) {
      return {
        ...state, userData: []
      }
    },
    clearMonthlyReport(state, action) {
      return {
        ...state, monthlyData: []
      }
    },
    setUserReportGraphVisible(state, action) {
      const { visible } = action.payload
      return {
        ...state, userReportGraphVisible: visible
      }
    },
    setMonthlyReportGraphVisible(state, action) {
      const { visible } = action.payload
      return {
        ...state, monthlyReportGraphVisible: visible
      }
    },
    setCenter (state, action) {
      return { ...state, ...action.payload }
    },
    setUserDate (state, action) {
      return { ...state, ...action.payload }
    },
    setMonthDate (state, action) {
      return { ...state, ...action.payload }
    }
  }
}