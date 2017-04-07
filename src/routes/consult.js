/*
 * 咨询中心
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import ConsultTable from '../components/consult/consultTable'
import EditModal from '../components/consult/editModal'
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

        Modal.info({
          title: '聊天记录',
          content: (
            <div>
            {
              currentMessage.map((d, i) => {
                if (d.content.msg_type == 'p') {
                  return (
                    <p key={i} style={{ textAlign: 'right', paddingLeft: '40px' }}>
                      {d.content.msg}
                    </p>
                  );
                }
                else {
                  return (<p key={i}>{d.content.msg}</p>);
                }
              })
            }
            </div>
          ),
          width: '600px',
          maskClosable: true,
          onOk() {},
        });
      }
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

  const ModalGen = () => <EditModal {...editModalProps} />

  return (
    <div>
      <ConsultTable {...consultTableProps} />
      <ModalGen />
    </div>
  );
}

export default connect(({consult}) => ({consult}))(Consult)