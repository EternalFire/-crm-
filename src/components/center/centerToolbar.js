import React from 'react'
import {Menu, Card, DatePicker} from 'antd'
import {dateFormat, center} from '../../utils'
import moment from 'moment'

const { RangePicker } = DatePicker;


// todo: extract key to utils/center.js
//       extract current to model
function CenterToolbar({
  type, 
  current, 
  handleChangeDayMenu, 
  handleChangeMonthMenu, 
  handleChangeSearchDate
}) {
  let menuDOM;

  if (type == center.type.day) {
    menuDOM = (
      <Menu mode="horizontal" selectedKeys={current} onClick={handleChangeDayMenu}>
        <Menu.Item key="dayAllMenu">今日总量</Menu.Item>
        <Menu.Item key="dayYBMenu">今日预报名</Menu.Item>
        <Menu.Item key="dayJBMenu">今日进班</Menu.Item>
      </Menu>
    );
  } else if (type == center.type.month) {
    menuDOM = (
      <Menu mode="horizontal" selectedKeys={current} onClick={handleChangeMonthMenu}>
        <Menu.Item key="monthAllMenu">本月总量</Menu.Item>
        <Menu.Item key="monthYBMenu">本月预报名</Menu.Item>
        <Menu.Item key="monthJBMenu">本月进班</Menu.Item>
      </Menu>
    );
  } else  if (type == center.type.all) {
    // TODO 搜索条件
    menuDOM = (
      <Card>
        <RangePicker format={dateFormat}
          defaultValue={[ moment(), moment() ]}
          onChange={handleChangeSearchDate}
        />
      </Card>
    );
  }

  return menuDOM
}

export default CenterToolbar