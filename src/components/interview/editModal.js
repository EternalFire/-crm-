/*
 * 社招面试 - 分配简历 - 编辑弹窗
 */
import React from 'react'
import { Modal, Row, Col, Form } from 'antd'

const EditModal = ({
  visible,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }  
}) => {

  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        // key: item.key,
        _id: item._id
      }
      onOk(data)
    })
  }

  // todo add hook
  function handleChangeCustomerStatTYB(e) {    
    if (e.target.checked) {
      item.tybTime = new Date().getTime();
    } else {
      delete item.tybTime;
    }
  }
  function handleChangeCustomerStatTFK(e) {    
    if (e.target.checked) {
      item.tfkTime = new Date().getTime();
    } else {
      delete item.tfkTime;
    }
  }

  const modalProps = {
    title: "编辑",
    visible,
    onOk: handleOk,
    onCancel    
  }

  return (
    <Modal {...modalProps}>
      <Form vertical>
        <Row gutter={16}>
          <Col span={8}>姓名</Col>
          <Col span={16}>{item.name}</Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>跟进进度</Col>
          <Col span={16}>
            <label className="">
              <input type="checkbox" checked={(item.tybTime ? true : false)} onClick={handleChangeCustomerStatTYB} /> 退预报
            </label>
            <label className="">
              <input type="checkbox" checked={(item.tfkTime ? true : false)} onClick={handleChangeCustomerStatTFK} /> 退放款
            </label>
          </Col>
        </Row>   
      </Form>
    </Modal>
  )
}

export default Form.create()(EditModal)