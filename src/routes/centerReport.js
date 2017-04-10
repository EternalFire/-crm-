/*
 * 分中心数据分析
 */
import React from 'react'
import { connect } from 'dva'
import {Modal} from 'antd'
import UserReport from '../components/report/userReport'
import MonthlyReport from '../components/report/monthlyReport'
import UserReportTool from '../components/report/userReportTool'
import MonthlyReportTool from '../components/report/monthlyReportTool'
import UserReportGraph from '../components/report/UserReportGraph'
import MonthlyReportGraph from '../components/report/MonthlyReportGraph'

function CenterReport({ dispatch, centerReport, loading }) {
  const {userData, monthlyData, userReportGraphVisible, monthlyReportGraphVisible } = centerReport

  const userModalProps = {
    visible: userReportGraphVisible,
    width: 800,
    onOk() {
      dispatch({ type: 'centerReport/setUserReportGraphVisible', payload: { visible: false } });
    },
    onCancel() {
      dispatch({ type: 'centerReport/setUserReportGraphVisible', payload: { visible: false } });
    }
  }
  const monthlyModalProps = {
    visible: monthlyReportGraphVisible,
    width: 800,
    onOk() {
      dispatch({ type: 'centerReport/setMonthlyReportGraphVisible', payload: { visible: false } });
    },
    onCancel() {
      dispatch({ type: 'centerReport/setMonthlyReportGraphVisible', payload: { visible: false } });
    },
  }

  const userReportGraphProps = {
    data: userData
  }
  const monthlyReportGraphProps = {
    data: monthlyData
  }

  const userReportProps = {
    dataSource: userData,
    pagination: false,
    loading
  }

  const monthlyReportProps = {
    dataSource: monthlyData,
    pagination: false,
    loading
  }

  const userReportToolProps = {
    title: '中心咨询师分析表',
    handleShowGraph: () => {
      dispatch({ type: 'centerReport/setUserReportGraphVisible', payload: { visible: true } });
    },
    handlePrev: (dateStr) => {
      dispatch({ type: 'centerReport/setUserDate', payload: { userDate: dateStr } });
      dispatch({ type: 'centerReport/queryUserReport' });
    },
    handleNext: (dateStr) => {
      dispatch({ type: 'centerReport/setUserDate', payload: { userDate: dateStr } });
      dispatch({ type: 'centerReport/queryUserReport' });
    }
  }

  const monthlyReportToolProps = {
    title: '月度数据汇总',
    handleShowGraph: () => {
      dispatch({ type: 'centerReport/setMonthlyReportGraphVisible', payload: { visible: true } });
    },
    handlePrev: (dateStr) => {
      dispatch({ type: 'centerReport/setMonthDate', payload: { monthDate: dateStr } });
      dispatch({ type: 'centerReport/queryMonthlyReport' });
    }, 
    handleNext: (dateStr) => {
      dispatch({ type: 'centerReport/setMonthDate', payload: { monthDate: dateStr } });
      dispatch({ type: 'centerReport/queryMonthlyReport' });
    }
  }

  return (
    <div>
      <div>
        <UserReportTool {...userReportToolProps} />
        <UserReport {...userReportProps} />
      </div>
      
      <div>
        <MonthlyReportTool {...monthlyReportToolProps} />        
        <MonthlyReport {...monthlyReportProps} />
      </div>

      <Modal {...userModalProps}>
        <UserReportGraph {...userReportGraphProps} />
      </Modal>

      <Modal {...monthlyModalProps}>
        <MonthlyReportGraph {...monthlyReportGraphProps} />
      </Modal>
    </div>
  )
};

export default connect(({centerReport, loading}) => ({
  centerReport,
  loading: loading.global
}))(CenterReport)