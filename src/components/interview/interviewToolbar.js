import React from 'react'
import {DatePicker, Button} from 'antd'
import moment from 'moment'

function InterviewToolbar({handleDateChange, handleSearch}) {
  return (
    <div>
      <DatePicker onChange={handleDateChange} defaultValue={moment()} />
      {' '}
      <Button icon="search" onClick={handleSearch}>查询</Button>
    </div>
  )
}

export default InterviewToolbar