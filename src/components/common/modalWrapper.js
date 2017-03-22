import React from 'react'
import { Modal } from 'antd'

const ModalForm = ({
  title,
  visible,
  onOk,
  onCancel,
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
      {children}
    </Modal>
  );
}

export default ModalForm