/**
 * 网络中心 工具栏
 */
import React from 'react'
import {Menu, Card, DatePicker, Button, message} from 'antd'
import OutputTableButton from '../common/outputTableButton'
import {dateFormat, center} from '../../utils'
import moment from 'moment'

const { RangePicker } = DatePicker;

function CenterToolbar({
  type, 
  current, 
  
  onChangeDayMenu,
  onDayAllMenu, 
  onDayYBMenu,
  onDayJBMenu,
  
  onChangeMonthMenu,
  onMonthAllMenu, 
  onMonthYBMenu,
  onMonthJBMenu,  
  
  onChangeSearchDate,
  startDate = moment(),
  endDate = moment(),
}) {
  let menuDOM;

  function handleChangeDayMenu(e) {
    if (e.key === 'dayAllMenu') {
      if (onDayAllMenu) {
        onDayAllMenu(e)
      } 
    } else if (e.key === 'dayYBMenu') {
      if (onDayYBMenu) {
        onDayYBMenu(e)
      } 
    } else if (e.key === 'dayJBMenu') {
      if (onDayJBMenu) {
        onDayJBMenu(e)
      } 
    }

    if (onChangeDayMenu) {
      onChangeDayMenu(e)
    } 
  }

  function handleChangeMonthMenu(e) {
    if (e.key === 'monthAllMenu') {
      if (onMonthAllMenu) {
        onMonthAllMenu(e)
      } 
    } else if (e.key === 'monthYBMenu') {
      if (onMonthYBMenu) {
        onMonthYBMenu(e)
      } 
    } else if (e.key === 'monthJBMenu') {
      if (onMonthJBMenu) {
        onMonthJBMenu(e)
      }
    }

    if (onChangeMonthMenu) {
      onChangeMonthMenu(e)
    } 
  }

  if (type === center.type.day) {
    menuDOM = (
      <Menu mode="horizontal" selectedKeys={current} onClick={handleChangeDayMenu}>
        <Menu.Item key="dayAllMenu">今日总量</Menu.Item>
        <Menu.Item key="dayYBMenu">今日预报名</Menu.Item>
        <Menu.Item key="dayJBMenu">今日进班</Menu.Item>
      </Menu>
    );
  } else if (type === center.type.month) {
    menuDOM = (
      <Menu mode="horizontal" selectedKeys={current} onClick={handleChangeMonthMenu}>
        <Menu.Item key="monthAllMenu">本月总量</Menu.Item>
        <Menu.Item key="monthYBMenu">本月预报名</Menu.Item>
        <Menu.Item key="monthJBMenu">本月进班</Menu.Item>
      </Menu>
    );
  } else if (type === center.type.all) {
    menuDOM = (
      <Card>
        <RangePicker format={dateFormat}
          value={[ moment(startDate, dateFormat), moment(endDate, dateFormat) ]}
          onChange={onChangeSearchDate}
        />
        <OutputTableButton />
      </Card>
    );
  }

  return menuDOM
}

export default CenterToolbar