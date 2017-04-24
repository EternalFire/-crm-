/*
 * 网络咨询
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import ConsultToolbar from '../components/consult/consultToolbar'
import ConsultTable from '../components/consult/consultTable'
import EditModal from '../components/consult/editModal'
import MessageModal from '../components/consult/messageModal'
import {Modal} from 'antd'

const Confirm = Modal.confirm;

function Consult({dispatch, consult, users, loading}) {
  const {
    data, 
    current, 
    currentMessage,
    editModalVisible, 
    messageModalVisible, 
    pagination,

    mobileText, 
    mobileFilterVisible,
    nameText, 
    nameFilterVisible,
    usersFilters
  } = consult; 

  const consultToolbarProps = {
    onChangeSearchDate(date, dateStr) {
      dispatch({ type: 'consult/setStartDate', payload: { startDate: dateStr[0] }});
      dispatch({ type: 'consult/setEndDate', payload: { endDate: dateStr[1] }});
      dispatch({ type: 'consult/query' });
    }
  }

  const consultTableProps = {
    dataSource: data,
    users, 
    usersFiltered: usersFilters,    
    loading,
    pagination, 
    onEditItem(record) {
      dispatch({ type: 'consult/setCurrent', payload: { current: record } });
      dispatch({ type: 'consult/showEditModal' });
    }, 
    onDeleteItem(record) {
      Confirm({
        title: `确定要删除 ${record.name} ?`,
        onOk() {
          dispatch({type: 'consult/deleteCustomer', payload: { current: record }})
        },
        onCancel() {},
      });
    }, 
    onShowMessage(record) {
      if (record.guest_id) {
        dispatch({ type: 'consult/queryMessage', payload: { guest_id: record.guest_id } });
      }

      dispatch({ type: 'consult/showMessageModal' });
    }, 
    onPageChange(pagination, filters, sorter) {
      const { followUserName } = filters;
      dispatch({ type: 'consult/setUsersFilters', payload: followUserName });
      dispatch({ type: 'consult/setPagination', payload: { pagination } });
      dispatch({ type: 'consult/query' });
    },

    mobileText,
    onInputMobileChange(e) {
      // dispatch({ type: 'consult/clearFilters' });
      dispatch({ type: 'consult/setMobileText', payload: { mobileText: e.target.value } });      
    },
    mobileFilterVisible,
    onMobileFilterVisibleChange(visible) {
      dispatch({ type: 'consult/setMobileFilterVisible', payload: { mobileFilterVisible: visible } });
    },
    
    onSearch() {
      // 按列条件查询, 复位分页页码
      dispatch({ type: 'consult/resetPagination' })
      
      dispatch({ type: 'consult/query' })
    },
    
    nameText,
    onInputNameChange(e) {
      // dispatch({ type: 'consult/clearFilters' });
      dispatch({ type: 'consult/setNameText', payload: { nameText: e.target.value } });      
    }, 
    nameFilterVisible,
    onNameFilterVisibleChange(visible) {
      dispatch({ type: 'consult/setNameFilterVisible', payload: { nameFilterVisible: visible } });
    },
  }

  const editModalProps = {
    title: '编辑',
    visible: editModalVisible,
    item: current, 
    onOk(formData) {
      dispatch({ type: 'consult/update', payload: { current: formData } });
      dispatch({ type: 'consult/hideEditModal' });
    }, 
    onCancel() {
      dispatch({ type: 'consult/hideEditModal' });
    }, 
  }

  const messageModalProps = {
    title: '聊天信息',
    visible: messageModalVisible,
    messages: currentMessage,
    loading,
    onOk() {
      dispatch({ type: 'consult/hideMessageModal' });
    },
    onCancel() {
      dispatch({ type: 'consult/hideMessageModal' });
    }
  }

  const EditModalGen = () => <EditModal {...editModalProps} />

  return (
    <div>
      <ConsultToolbar {...consultToolbarProps} />
      <ConsultTable {...consultTableProps} />
      <EditModalGen />
      <MessageModal {...messageModalProps} />
    </div>
  );
}

export default connect(({consult, app, loading}) => ({
  consult, 
  users: app.users, 
  loading: loading.global
}))(Consult)