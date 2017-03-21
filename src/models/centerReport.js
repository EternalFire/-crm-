/*
 * 分中心的数据分析
 */
import {queryCenterUserReport, queryCenterMonthlyReport} from '../services/crm'
import {checkResponse} from '../utils'

export default {
  namespace: 'centerReport',
  state: {
    name: null,
    userData: [], // 咨询师报表数据
    monthlyData: [], // 月度报表数据
    date: '2017-02-28',
    userDate: '',
    monthDate: ''
  },
  subscriptions: {

  },
  effects: {
    *queryUserReport({ payload }, { select, call, put }) {
      const { name, date } = yield select(({ centerReport }) => (centerReport))

      if (!name) { return }

      const data = yield call(queryCenterUserReport, { center: name, date })
      if (checkResponse(data)) {
        yield put({ type: 'clearUserReport' })
        yield put({ type: 'queryUserReportSuccess',  payload: { userData: data } })
      }
    },
    *queryMonthlyReport({ payload }, { select, call, put }) {
      const { name, date } = yield select(({ centerReport }) => (centerReport))

      if (!name) { return }

      // todo get year and month from date
      const { year, month } = date

      const data = yield call(queryCenterMonthlyReport, { center: name, year, month })
      if (checkResponse(data)) {
        yield put({ type: 'clearMonthlyReport' })
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
  }
}