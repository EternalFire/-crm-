/*
 * 咨询中心
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import ConsultTable from '../components/consult/consultTable'
import EditModal from '../components/consult/editModal'
// import MessageModal from '../components/consult/messageModal'
import {Modal} from 'antd'

function Consult({dispatch, consult}) {
  const {
    data,
    editModalVisible,
    messageModalVisible
  } = consult  

  const consultTableProps = {
    dataSource: data,
    onEditItem(record) {
      dispatch({type: 'consult/showEditModal'})
    },
    onShowMessage(record) {
      dispatch({type: 'consult/showMessageModal'})

      Modal.info({
        title: '聊天记录',
        content: (
          <div>121212
          {
            // rs.data.map((d) => {
            //   if (d.content.msg_type == 'p') return (<p style={{ textAlign: 'right', paddingLeft: '40px' }}>{d.content.msg}</p>);
            //   else return (<p>{d.content.msg}</p>);
            // })
          }
          </div>
        ),
        width: '600px',
        maskClosable: true,
        onOk() {},
      });
    }
  }

  const editModalProps = {
    title: '编辑',
    visible: editModalVisible,
    onOk() {
      dispatch({type: 'consult/hideEditModal'})
    },
    onCancel() {
      dispatch({type: 'consult/hideEditModal'})      
    }
  }  
  const messageModalProps = {
    title: '聊天信息',
    visible: messageModalVisible,    
    onOk() {
      dispatch({type: 'consult/hideMessageModal'})
    },
    onCancel() {
      dispatch({type: 'consult/hideMessageModal'})      
    }
  }

  return (
    <div>
      <ConsultTable {...consultTableProps} />
      <EditModal {...editModalProps} />
    </div>
  );
}
      // <MessageModal {...messageModalProps} />

export default connect(({consult}) => ({consult}))(Consult)