/*
 * 总部数据分析工具栏
 */
import React from 'react'
import {DatePicker} from 'antd'
import GraphButton from '../common/graphButton'
import moment from 'moment'

const AdminReportTool = ({title, handleShowGraph, handleDateChange}) => {
  return (
    <div>
      <h3>
        {title}
        <GraphButton handleClick={handleShowGraph} />
        <DatePicker onChange={handleDateChange} defaultValue={moment()} />        
      </h3>
    </div>
  )
}

export default AdminReportTool