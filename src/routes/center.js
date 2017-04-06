/*
 * 咨询中心
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import CenterTable from '../components/center/centerTable'
import CenterToolbar from '../components/center/centerToolbar'
import CenterModal from '../components/center/centerModal'
import {center as CenterUtil, today, tomorrow, startOfMonth, endOfMonth } from '../utils'

const Center = ({
  location, 
  dispatch, 
  center
}) => {
  const { name, type, dayData, monthData, allData, current, modalVisible, currentMenuKey, pagination } = center

  const tableProps = {
    onEditItem(record) {
      dispatch({ type: 'center/setCurrent', payload: { current: record } });
      dispatch({ type: 'center/setModalVisible', payload: { visible: true } });
    }, 
    onPageChange(pagination, filters, sorter) {
      dispatch({ type: 'center/setPagination', payload: {pagination} })
      dispatch({ type: 'center/query' })
    },
    pagination
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
    current: currentMenuKey,
    onDayAllMenu(e) {
      dispatch({ type: 'center/setybFilter', payload: { ybFilter: false }});
      dispatch({ type: 'center/setjbFilter', payload: { jbFilter: false }});
      // dispatch({ type: 'center/setStartDate', payload: { startDate: today() }});
      // dispatch({ type: 'center/setEndDate', payload: { endDate: tomorrow() }});
    },
    onDayYBMenu(e) {
      dispatch({ type: 'center/setybFilter', payload: { ybFilter: true }});      
      // dispatch({ type: 'center/setStartDate', payload: { startDate: today() }});
      // dispatch({ type: 'center/setEndDate', payload: { endDate: tomorrow() }});
    },
    onDayJBMenu(e) {
      dispatch({ type: 'center/setjbFilter', payload: { jbFilter: true }});
      // dispatch({ type: 'center/setStartDate', payload: { startDate: today() }});
      // dispatch({ type: 'center/setEndDate', payload: { endDate: tomorrow() }});
    },

    onMonthAllMenu(e) {
      dispatch({ type: 'center/setybFilter', payload: { ybFilter: false }});
      dispatch({ type: 'center/setjbFilter', payload: { jbFilter: false }});      
      dispatch({ type: 'center/setStartDate', payload: { startDate: startOfMonth() }});
      dispatch({ type: 'center/setEndDate', payload: { endDate: endOfMonth() }});      
    },
    onMonthYBMenu(e) {
      dispatch({ type: 'center/setybFilter', payload: { ybFilter: true }});      
      dispatch({ type: 'center/setStartDate', payload: { startDate: startOfMonth() }});
      dispatch({ type: 'center/setEndDate', payload: { endDate: endOfMonth() }});
    },
    onMonthJBMenu(e) {
      dispatch({ type: 'center/setjbFilter', payload: { jbFilter: true }});
      dispatch({ type: 'center/setStartDate', payload: { startDate: startOfMonth() }});
      dispatch({ type: 'center/setEndDate', payload: { endDate: endOfMonth() }});
    },

    onChangeDayMenu(e) {
      dispatch({ type: 'center/setCurrentMenuKey', payload: { currentMenuKey: [e.key] }});
      dispatch({ type: 'center/resetPagination' });      
      dispatch({ type: 'center/query' });
    },    
    onChangeMonthMenu(e) {
      dispatch({ type: 'center/setCurrentMenuKey', payload: { currentMenuKey: [e.key] }});
      dispatch({ type: 'center/resetPagination' });      
      dispatch({ type: 'center/query' });
    },
    onChangeSearchDate(date, dateStr) {
      dispatch({ type: 'center/setStartDate', payload: { startDate: dateStr[0] }});
      dispatch({ type: 'center/setEndDate', payload: { endDate: dateStr[1] }});
      dispatch({ type: 'center/query' });
    }
  }

  const centerModalProps = {
    visible: modalVisible,
    item: current,
    onOk(formData) {
      dispatch({ type: 'center/updateCustomer', payload: { current: formData } })
      dispatch({ type: 'center/setModalVisible', payload: { visible: false } })
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
