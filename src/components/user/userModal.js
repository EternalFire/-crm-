/**
 * 编辑用户权限
 */
import React from 'react'
import { Modal, Row, Col, Form, Input, Select } from 'antd'
import {maxNormalLen, maxNormalMessage, authority, center} from '../../utils'

const FormItem = Form.Item;
const Option = Select.Option;

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

      let newData = getFieldsValue();
      if (newData.type) {
        newData.type = parseInt(newData.type)
      }

      const data = {
        ...item, 
        ...newData,
      }
      onOk(data)
    })
  }
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const modalProps = {
    title: "权限信息",
    visible,
    onOk: handleOk,
    onCancel
  };
  
  return (
    <Modal {...modalProps}>
      <Form layout="vertical">
        <FormItem
          {...formItemLayout}
          label="姓名"
        >
          {item.name}
        </FormItem>

        {
          // <FormItem
          //   {...formItemLayout}
          //   label="邮箱"
          //   hasFeedback
          // >
          //   {getFieldDecorator('email', {
          //     initialValue: item.email, 
          //     rules: [{
          //       type: 'email', message: '邮箱格式错误',
          //     }, {
          //       required: true, message: '邮箱未填写',
          //     }, {
          //       max: maxNormalLen,
          //       message: maxNormalMessage 
          //     }],
          //   })(
          //     <Input />
          //   )}
          // </FormItem>
        }

        {
          // <FormItem
          //   {...formItemLayout}
          //   label="原密码"
          //   hasFeedback
          // >
          //   {getFieldDecorator('pwd', {
          //     initialValue: '', 
          //     rules: [{
          //       type: 'number', message: '密码格式错误',
          //     }, {
          //       required: true, message: '密码未填写',
          //     }, {
          //       max: maxNormalLen,
          //       message: maxNormalMessage 
          //     }],
          //   })(
          //     <Input />
          //   )}
          // </FormItem>
        }

        <FormItem
          {...formItemLayout}
          label="职位"
          hasFeedback
        >
          {getFieldDecorator('type', {
            initialValue: `${item.type}`, 
            rules: [{
              required: true, message: '职位未选择',
            }],
          })(
            <Select>
              {authority.getTypes().map((e, i) => {
                return (
                  <Option key={i} value={`${e}`}>
                    {authority.getTypeName(parseInt(e))}
                  </Option>
                );
              })}
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="所属中心"
          hasFeedback
        >
          {getFieldDecorator('center', {
            initialValue: item.center, 
            rules: [{
              required: true, message: '中心未选择',
            }],
          })(
            <Select>
              {center.allCenters().map((e, i) => {
                return (
                  <Option key={i} value={e}>
                    {center.getCenterName(e)}
                  </Option>
                );
              })}
            </Select>
          )}
        </FormItem>

      </Form>
    </Modal>
  )
}

export default Form.create()(UserModal)