/**
 * 用户信息
 */
import React from 'react'
import { Modal, Row, Col, Form, Input } from 'antd'
import {maxNormalLen, maxNormalMessage, authority, center} from '../../utils'

const FormItem = Form.Item;

function UserInfoModal({
  visible,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue
  }
}) {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }

      let newData = getFieldsValue();
      if (newData.newPwd2) {
        newData.pwd = newData.newPwd2;
        delete newData.newPwd2;
        delete newData.newPwd1;
      }

      const data = { ...item, ...newData };
      onOk(data);
    })
  }

  function checkPassword(rule, value, callback) {
    if (value && value !== getFieldValue('newPwd1')) {
      callback('新密码输入不一致');
    } else {
      callback();
    }
  }

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };

  const modalProps = {
    title: "用户信息",
    visible,
    onOk: handleOk,
    onCancel
  };
  
  return (
    <Modal {...modalProps}>
      <Form layout="vertical">
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="姓名:"
            >
              {item.name}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={10}>
            <FormItem
              {...formItemLayout}
              label="职位:"          
            >
              {authority.getTypeName(item.type)}          
            </FormItem>
          </Col>
          <Col span={14}>
            <FormItem
              {...formItemLayout}
              label="所属中心: "
            >
              {center.getCenterName(item.center)}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={18}>
            <FormItem
              {...formItemLayout}
              label="邮箱:"
              hasFeedback
            >
              {getFieldDecorator('email', {
                initialValue: item.email, 
                rules: [{
                  type: 'email', message: '邮箱格式错误',
                }, {
                  max: maxNormalLen,
                  message: maxNormalMessage 
                }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>

        {
        // <Row>
        //   <Col span={18}>
        //     <FormItem
        //       {...formItemLayout}
        //       label="原密码:"
        //       hasFeedback
        //     >
        //       {getFieldDecorator('pwd', {
        //         initialValue: item.pwd, 
        //         rules: [{
        //           pattern: /[0-9]+/, message: '密码格式错误',
        //         }, {
        //           required: true, message: '密码未填写',
        //         }, {
        //           max: maxNormalLen,
        //           message: maxNormalMessage 
        //         }],
        //       })(
        //         <Input type="password" />
        //       )}
        //     </FormItem>
        //   </Col>
        // </Row>
        }

        <Row>
          <Col span={18}>
            <FormItem
              {...formItemLayout}
              label="新密码:"
              hasFeedback
            >
              {getFieldDecorator('newPwd1', {
                initialValue: '', 
                rules: [{
                  pattern: /[0-9]+/, message: '密码格式错误',
                }, {
                  max: maxNormalLen,
                  message: maxNormalMessage 
                }],
              })(
                <Input type="password" />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={18}>
            <FormItem
              {...formItemLayout}
              label="确认密码:"
              hasFeedback
            >
              {getFieldDecorator('newPwd2', {
                initialValue: '', 
                rules: [{
                  pattern: /[0-9]+/, message: '密码格式错误',
                }, {
                  max: maxNormalLen,
                  message: maxNormalMessage 
                }, {
                  validator: checkPassword,
                }],
              })(
                <Input type="password" />
              )}
            </FormItem>
          </Col>
        </Row>

      </Form>
    </Modal>
  )
}

export default Form.create()(UserInfoModal)