/*
 * 咨询中心
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import CenterTable from '../components/center/centerTable'
import CenterToolbar from '../components/center/centerToolbar'
// import ModalWrapper from '../components/common/modalWrapper'
import {center as CenterUtil} from '../utils'

function Center({location, dispatch, center}) {
  const { name, type, dayData, monthData, allData } = center

  const tableProps = {
  }

  const renderDayTable = () => {
    tableProps.dataSource = dayData

    return (
      <CenterTable {...tableProps} />
    )
  };
  const renderMonthTable = () => {
    tableProps.dataSource = monthData

    return (
      <CenterTable {...tableProps} />
    )
  };
  const renderAllTable = () => {
    tableProps.dataSource = allData

    return (
      <CenterTable {...tableProps} />
    )
  };

  const renderObject = {}
  renderObject[CenterUtil.type.day] = renderDayTable
  renderObject[CenterUtil.type.month] = renderMonthTable
  renderObject[CenterUtil.type.all] = renderAllTable
  
  const centerToolbarProps = {
    type: type,
    current: ['dayAllMenu']
  }

  return (
    <div>
      <CenterToolbar {...centerToolbarProps} />
      {renderObject[type] ? renderObject[type]() : CenterUtil.getCenterName(name)}
    </div>
  )
}

Center.propTypes = {
  center: PropTypes.object
}

function mapStateToProps(state) {
  const { center } = state
  return { center }
}

export default connect(mapStateToProps)(Center)
