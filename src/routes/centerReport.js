import React from 'react'
import { connect } from 'dva'
import UserReport from '../components/center/userReport'

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
        <pre>{JSON.stringify(centerReport.monthlyData, null, 2)}</pre>
      </div>
    </div>
  )
};

export default connect(({centerReport}) => ({centerReport}))(CenterReport)
