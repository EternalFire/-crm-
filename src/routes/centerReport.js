import React from 'react'
import { connect } from 'dva'

function CenterReport({dispatch, centerReport}) {
  return (
    <div>
      <div>
        <h1>userData</h1>
        <pre>{JSON.stringify(centerReport.userData, null, 2)}</pre>
      </div>
      <div>
        <h1>monthlyData</h1>    
        <pre>{JSON.stringify(centerReport.monthlyData, null, 2)}</pre>
      </div>
    </div>
  )
};

export default connect(({centerReport}) => ({centerReport}))(CenterReport)
