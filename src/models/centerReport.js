/*
 * 分中心的数据分析
 */
import {queryCenterUserReport, queryCenterMonthlyReport} from '../services/crm'
import {checkResponse, center, authority, today, getYear, getMonth} from '../utils'
import { routerRedux } from 'dva/router';

export default {
  namespace: 'centerReport',
  state: {
    name: null,
    userData: [], // 咨询师报表数据
    monthlyData: [], // 月度报表数据
    userDate: today(), //'2017-3-1',
    monthDate: today(), //'2017-4',
    userReportGraphVisible: false,
    monthlyReportGraphVisible: false,
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(location => {
        let {name, type} = center.parsePath(location.pathname);

        if (center.isReport(type)) {          
          dispatch({ type: 'setCenter', payload: { name } });
          dispatch({ type: 'queryUserReport' });
          dispatch({ type: 'queryMonthlyReport' });
        }
      });
    }
  }, 
  effects: {
    *queryUserReport({ payload }, { select, call, put }) {
      const { name, userDate } = yield select(({ centerReport }) => (centerReport))
      const { user } = yield select(({ app }) => (app));

      if (!name) { 
        return 
      }

      if (!authority.checkCenter(name, 'currentType', user)) {
        yield put(routerRedux.push({ pathname: '/' }));
        return
      }

      const data = yield call(queryCenterUserReport, { center: name, date: userDate })
      
      yield put({ type: 'queryUserReportSuccess',  payload: { data } })
    },
    *queryMonthlyReport({ payload }, { select, call, put }) {
      const { name, monthDate } = yield select(({ centerReport }) => (centerReport))
      const { user } = yield select(({ app }) => (app));

      if (!name) { 
        return 
      }

      if (!authority.checkCenter(name, 'currentType', user)) {
        yield put(routerRedux.push({ pathname: '/' }));
        return
      }      

      const year = getYear(monthDate),
        month = getMonth(monthDate)

      let data = yield call(queryCenterMonthlyReport, { center: name, year, month })

      let szData = { titileName: '简历上门' };
      let wzData = { titileName: '市场上门' };
      let ybData = { titileName: '预报量' };
      let zjData = { titileName: '转缴量' };
      let fkData = { titileName: '放款量' };
      let ybRate = { titileName: '预报率(%)' };
      let zjRate = { titileName: '转缴率(%)' };
      let fkRate = { titileName: '放款率(%)' };

      if (data && data.length === 0 || !data) {
        data = Array.from({length: 31}).map((e, i) => {
          return {
            date: i + 1 + '',
            sz: 0,
            wz: 0,
            yb: 0,
            zj: 0,
            fk: 0,
            _id: i
          };
        });
      }

      data.map(d => {
        const no = d.date.substring(d.date.length - 2);

        szData[`date${no}`] = d.sz;
        wzData[`date${no}`] = d.wz;
        ybData[`date${no}`] = d.yb;
        zjData[`date${no}`] = d.zj;
        fkData[`date${no}`] = d.fk;
        ybRate[`date${no}`] = `${(d.sz + d.wz != 0) ? (d.yb / (d.sz + d.wz) * 100).toFixed(1) * 1 : 0}`;
        zjRate[`date${no}`] = `${(d.yb != 0) ? (d.zj / d.yb * 100).toFixed(1) * 1 : 0}`;
        fkRate[`date${no}`] = `${(d.sz + d.wz != 0) ? (d.fk / (d.sz + d.wz) * 100).toFixed(1) * 1 : 0}`;
      });

      data = [szData, wzData, ybData, zjData, fkData, ybRate, zjRate, fkRate].map((d, i) => {
        d._id = i;
        return d;
      });

      yield put({ type: 'queryMonthlyReportSuccess',  payload: { data } })
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