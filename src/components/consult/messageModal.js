/*
 * 网络咨询 聊天信息
 */
import React, { PropTypes } from 'react'
import {Modal, Form} from 'antd'
import SpinWrapper from '../common/spinWrapper'
import styles from './messageModal.css'

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
    onCancel,
    width: 600,
    style: { top: 20 },
    maskClosable: false
  };

  function renderMessages() {
    return messages.map((d, i) => {
      if (d.content.msg_type == 'p') {
        return (
          <div className={styles.messageBox}>
            <p key={i} className={styles.answer}>
              {d.content.msg}
            </p>
          </div>
        );
      }
      else {
        return (
          <div className={styles.messageBox}>
            <p key={i} className={styles.question}>
              {d.content.msg}
            </p>
          </div>
        );
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