/*
 * 咨询中心 聊天信息
 */
import React, { PropTypes } from 'react'
import {Modal, Form} from 'antd'
import SpinWrapper from '../common/spinWrapper'

const MessageModal = ({
  title, 
  visible, 
  loading, 
  messages = [], 
  onOk, 
  onCancel
}) => {
  const modalProps = {
    title,
    visible,
    onOk,
    onCancel
  };

  function renderMessages() {
    return messages.map((d, i) => {
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

  return (
    <Modal {...modalProps}>
      <SpinWrapper loading={loading}>
        {messages.length === 0 ? '暂无聊天信息' : renderMessages()}
      </SpinWrapper>
    </Modal>
  )
}

export default MessageModal