/*
 * 中心咨询师分析工具栏
 *
 */
import React from 'react'
import DateStepTool from '../common/dateStepTool'

const UserReportTool = ({title, handlePrev, handleNext}) => {

  const dateStepToolProps = {
    handlePrev,
    handleNext
  }

  return (
    <div>
      <h1>{title}</h1>
      <DateStepTool {...dateStepToolProps} />
    </div>
  )
}

export default UserReportTool