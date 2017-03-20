import React from 'react'
import { connect } from 'dva'
import UserReport from '../components/report/userReport'
import MonthlyReport from '../components/report/monthlyReport'

function CenterReport({dispatch, centerReport}) {
  const {userData, monthlyData} = centerReport

  const userReportProps = {
    dataSource: userData
  }

  const monthlyReportProps = {
    dataSource: monthlyData
  }

  return (
    <div>
      <div>
        <h1>userData</h1>
        <UserReport {...userReportProps} />
      </div>
      <div>
        <h1>monthlyData</h1>
        <MonthlyReport {...monthlyReportProps} />
      </div>
    </div>
  )
};

export default connect(({centerReport}) => ({centerReport}))(CenterReport)
