/*
 * 中心咨询师分析工具栏
 *
 */
import React from 'react'
import DateStepTool from '../common/dateStepTool'
import GraphButton from '../common/graphButton'

const UserReportTool = ({title, handleShowGraph, handlePrev, handleNext}) => {

  const dateStepToolProps = {
    handlePrev,
    handleNext
  }

  return (
    <div>
      <h3>{title}</h3>
      <GraphButton handleClick={handleShowGraph} />
      <DateStepTool {...dateStepToolProps} />
    </div>
  )
}

export default UserReportTool