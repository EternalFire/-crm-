/*
 * 网络咨询 工具栏
 */
import React from 'react'
import {Card, DatePicker} from 'antd'
import OutputTableButton from '../common/outputTableButton'
import {dateFormat, center} from '../../utils'
import moment from 'moment'

const { RangePicker } = DatePicker;

function ConsultToolbar({
  onChangeSearchDate
}) {

  return (
    <Card>
      <RangePicker format={dateFormat}
        defaultValue={[ moment(), moment() ]}
        onChange={onChangeSearchDate}
      />
      <OutputTableButton />
    </Card>
  )
}

export default ConsultToolbar
