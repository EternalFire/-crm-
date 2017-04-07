/*
 * 月度数据汇总工具栏
 */

import React from 'react'
import { Row, Col } from 'antd'
import DateStepTool from '../common/dateStepTool'
import GraphButton from '../common/graphButton'

const MonthlyReportTool = ({title, handleShowGraph, handlePrev, handleNext}) => {

  const dateStepToolProps = {
    handlePrev,
    handleNext,
    type: 'month'
  }

  return (
    <div>
      <h3>
        {title}        
        <GraphButton handleClick={handleShowGraph} />
        <DateStepTool {...dateStepToolProps} />
      </h3>        
    </div>
  )
}

export default MonthlyReportTool