/*
 * 咨询中心
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import ConsultTable from '../components/consult/consultTable'
import EditModal from '../components/consult/editModal'
import MessageModal from '../components/consult/messageModal'
import {Modal} from 'antd'

function Consult({dispatch, consult}) {
  const {
    data, 
    current, 
    currentMessage,
    editModalVisible, 
    messageModalVisible, 
    pagination
  } = consult; 

  const consultTableProps = {
    dataSource: data,
    onEditItem(record) {
      dispatch({ type: 'consult/setCurrent', payload: { current: record } });
      dispatch({ type: 'consult/showEditModal' });
    }, 
    onShowMessage(record) {
      if (record.guest_id) {
        dispatch({ type: 'consult/queryMessage', payload: { guest_id: record.guest_id } });
      }
      
      dispatch({ type: 'consult/showMessageModal' });
    }, 
    onPageChange(pagination, filters, sorter) {
      dispatch({ type: 'consult/setPagination', payload: { pagination } });
      dispatch({ type: 'consult/query' });
    }, 
    pagination, 
  }

  const editModalProps = {
    title: '编辑',
    visible: editModalVisible,
    item: current, 
    onOk(formData) {
      dispatch({type: 'consult/update', payload: { current: formData }});
      dispatch({type: 'consult/hideEditModal'});
    }, 
    onCancel() {
      dispatch({type: 'consult/hideEditModal'});
    }, 
  }

  const messageModalProps = {
    title: '聊天信息',
    visible: messageModalVisible,
    messages: currentMessage,
    onOk() {
      dispatch({type: 'consult/hideMessageModal'});
    },
    onCancel() {
      dispatch({type: 'consult/hideMessageModal'});
    }
  }

  const EditModalGen = () => <EditModal {...editModalProps} />
  // const MessageModalGen = () => <MessageModal {...messageModalProps} />

  return (
    <div>
      <ConsultTable {...consultTableProps} />
      <EditModalGen />
      <MessageModal {...messageModalProps} />
    </div>
  );
}

export default connect(({consult}) => ({consult}))(Consult)