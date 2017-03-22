/*
 * 咨询中心
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import CenterTable from '../components/center/centerTable'
import CenterToolbar from '../components/center/centerToolbar'
import CenterModal from '../components/center/centerModal'
import {center as CenterUtil} from '../utils'

const Center = ({
  location, 
  dispatch, 
  center
}) => {
  const { name, type, dayData, monthData, allData, current, modalVisible } = center

  const tableProps = {
    onEditItem(record) {
      dispatch({
        type: 'center/setCurrent', 
        payload: {
          current: record
        }
      });
      dispatch({ type: 'center/setModalVisible', payload: { visible: true } })
    }
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

  const centerModalProps = {
    visible: modalVisible,
    item: current,
    onOk(formData) {
      dispatch({ type: 'center/setModalVisible', payload: { visible: false } })
      // dispatch({ type: 'center/query' })
      // dispatch({ type: 'center/setCurrent', payload: { current: formData } })
      dispatch({ type: 'center/updateLocalDayData', payload: { current: formData } })
    },
    onCancel() {
      dispatch({ type: 'center/setModalVisible', payload: { visible: false } })
    }
  }

  return (
    <div>
      <CenterToolbar {...centerToolbarProps} />
      {renderObject[type] ? renderObject[type]() : CenterUtil.getCenterName(name)}
      <CenterModal {...centerModalProps} />
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
