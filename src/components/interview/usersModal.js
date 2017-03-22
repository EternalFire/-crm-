/*
 * 选择咨询师弹窗
 */
import React from 'react'
import { Modal, Form } from 'antd'

const modal = ({
  title,
  visible,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  },
  children
}) => {

  const modalProps = {
    title,
    visible,
    onOk,
    onCancel
  }

  return (
    <Modal {...modalProps}>
      <Form vertical>
        {children}
      </Form>
    </Modal>
  );
}

export default Form.create()(modal)