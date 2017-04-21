/*
 * 咨询中心
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import CenterTable from '../components/center/centerTable'
import CenterToolbar from '../components/center/centerToolbar'
import CenterModal from '../components/center/centerModal'
import {center as CenterUtil, today, tomorrow, startOfMonth, endOfMonth } from '../utils'

const Center = ({ location, dispatch, center, loading, user, users }) => {
  const { name, type, dayData, monthData, allData, current, modalVisible, currentMenuKey, pagination, mobileFilterVisible, mobileText, startDate, endDate, usersFilters } = center;

  const tableProps = {
    users, 
    usersFiltered: usersFilters,
    onEditItem(record) {
      dispatch({ type: 'center/setCurrent', payload: { current: record } });
      dispatch({ type: 'center/setModalVisible', payload: { visible: true } });
    }, 
    onPageChange(pagination, filters, sorter) {
      const { followUserName } = filters;
      // dispatch({ type: 'center/clearFilters' });
      dispatch({ type: 'center/setUsersFilters', payload: { usersFilters: followUserName } });
      dispatch({ type: 'center/setPagination', payload: { pagination } });
      dispatch({ type: 'center/query' });
    }, 
    pagination, 
    loading, 
    mobileFilterVisible, 
    mobileText, 
    onInputChange(e) {
      // dispatch({ type: 'center/clearFilters' });      
      dispatch({ type: 'center/setMobileText', payload: { mobileText: e.target.value } });
    },
    onSearchMobile(e) {
      // if (mobileText && mobileText.length > 0) {
        dispatch({ type: 'center/resetPagination' });        
        dispatch({ type: 'center/query' })
      // } 
    },
    onMobileFilterVisibleChange(visible) {
      dispatch({ type: 'center/setMobileFilterVisible', payload: { mobileFilterVisible: visible } });
    }
  }

  const renderDayTable = () => {
    // console.log('renderDayTable')
    tableProps.dataSource = dayData

    return (
      <CenterTable {...tableProps} />
    )
  };
  const renderMonthTable = () => {
    // console.log('renderMonthTable')
    tableProps.dataSource = monthData

    return (
      <CenterTable {...tableProps} />
    )
  };
  const renderAllTable = () => {
    // console.log('renderAllTable')
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
      dispatch({ type: 'center/setStartDate', payload: { startDate: today() }});
      dispatch({ type: 'center/setEndDate', payload: { endDate: today() }});
    },
    onDayYBMenu(e) {
      dispatch({ type: 'center/setybFilter', payload: { ybFilter: true }});      
      dispatch({ type: 'center/setStartDate', payload: { startDate: today() }});
      dispatch({ type: 'center/setEndDate', payload: { endDate: today() }});
    },
    onDayJBMenu(e) {
      dispatch({ type: 'center/setjbFilter', payload: { jbFilter: true }});
      dispatch({ type: 'center/setStartDate', payload: { startDate: today() }});
      dispatch({ type: 'center/setEndDate', payload: { endDate: today() }});
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
    },
    startDate,
    endDate
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

  // https://github.com/dvajs/dva/issues/668
  const ModalGen = () => <CenterModal {...centerModalProps} />

  return (
    <div>
      <CenterToolbar {...centerToolbarProps} />
      {renderObject[type] ? renderObject[type]() : CenterUtil.getCenterName(name)}
      <ModalGen />
    </div>
  )
}

Center.propTypes = {
  center: PropTypes.object
}

function mapStateToProps(state) {
  const { center, loading, app } = state  
  return { 
    center, 
    loading: loading.global,
    user: app.user,
    users: app.users
  }
}

export default connect(mapStateToProps)(Center)
