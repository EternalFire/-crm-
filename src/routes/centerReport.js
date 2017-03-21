/*
 * 分中心数据分析
 */
import React from 'react'
import { connect } from 'dva'
import UserReport from '../components/report/userReport'
import MonthlyReport from '../components/report/monthlyReport'
import UserReportTool from '../components/report/userReportTool'
import MonthlyReportTool from '../components/report/monthlyReportTool'

function CenterReport({dispatch, centerReport}) {
  const {userData, monthlyData} = centerReport

  const userReportProps = {
    dataSource: userData
  }

  const monthlyReportProps = {
    dataSource: monthlyData
  }

  const userReportToolProps = {
    title: '中心咨询师分析表',
    handlePrev: (dateStr) => {

    },
    handleNext: (dateStr) => {

    }
  }

  const monthlyReportToolProps = {
    title: '月度数据汇总',
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
    </div>
  )
};

export default connect(({centerReport}) => ({centerReport}))(CenterReport)
