/**
 * 社招面试 工具栏
 */
import React from 'react'
import {DatePicker, Button} from 'antd'
import moment from 'moment'

function InterviewToolbar({handleDateChange, handleSearch}) {
  return (
    <div>
      <DatePicker onChange={handleDateChange} defaultValue={moment()} />
      {' '}
    </div>
  )
}
      // <Button icon="search" onClick={handleSearch}>查询</Button>

export default InterviewToolbar