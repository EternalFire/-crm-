/*
 * 咨询中心 聊天信息
 */
import React, { PropTypes } from 'react'
import {Modal, Form} from 'antd'

const messageModal = ({
  title,
  visible,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue    
  }
}) => {

  const modalProps = {
    title,
    visible,
    onOk,
    onCancel
  }

  return (
    <Modal {...modalProps}>
      message
    </Modal>
  )
}

export default Form.create()(messageModal)