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

function CenterReport({dispatch, centerReport}) {
  const {userData, monthlyData, userReportGraphVisible, monthlyReportGraphVisible } = centerReport

  const userModalProps = {
    visible: userReportGraphVisible,
    onOk() {
      dispatch({ 
        type: 'centerReport/setUserReportGraphVisible', 
        payload: { visible: false } 
      })
    },
    onCancel() {
      dispatch({ 
        type: 'centerReport/setUserReportGraphVisible', 
        payload: { visible: false } 
      })
    }
  }
  const monthlyModalProps = {
    visible: monthlyReportGraphVisible,
    onOk() {
      dispatch({ 
        type: 'centerReport/setMonthlyReportGraphVisible', 
        payload: { visible: false } 
      })
    },
    onCancel() {
      dispatch({ 
        type: 'centerReport/setMonthlyReportGraphVisible', 
        payload: { visible: false } 
      })
    }
  }

  const userReportGraphProps = {
    data: userData
  }
  const monthlyReportGraphProps = {
    data: monthlyData
  }

  const userReportProps = {
    dataSource: userData
  }

  const monthlyReportProps = {
    dataSource: monthlyData
  }

  const userReportToolProps = {
    title: '中心咨询师分析表',
    handleShowGraph: () => {
      dispatch({ 
        type: 'centerReport/setUserReportGraphVisible', 
        payload: { visible: true } 
      })
    },
    handlePrev: (dateStr) => {

    },
    handleNext: (dateStr) => {

    }
  }

  const monthlyReportToolProps = {
    title: '月度数据汇总',
    handleShowGraph: () => {
      dispatch({ 
        type: 'centerReport/setMonthlyReportGraphVisible', 
        payload: { visible: true } 
      })
    },
    handlePrev: (dateStr) => {

    }, 
    handleNext: (dateStr) => {

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

export default connect(({centerReport}) => ({centerReport}))(CenterReport)