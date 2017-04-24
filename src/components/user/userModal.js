/**
 * 用户信息
 */
import React from 'react'
import { Modal, Row, Col, Form, Input } from 'antd'

const FormItem = Form.Item;

function UserModal({
  visible,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  } 
}) {

  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        _id: item._id
      }
      onOk(data)
    })
  }
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const modalProps = {
    title: "编辑CRM系统用户信息",
    visible,
    onOk: handleOk,
    onCancel
  };
  
  return (
    <Modal {...modalProps}>
      <Form layout="vertical">
        <FormItem
          {...formItemLayout}
          label="E-mail"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>

      </Form>
    </Modal>
  )
}

export default Form.create()(UserModal)