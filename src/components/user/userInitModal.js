/**
 * 用户新增弹窗
 */
import React from 'react'
import { Modal, Row, Col, Form, Input, Select } from 'antd'
import {maxNormalLen, maxNormalMessage, authority, center} from '../../utils'

const FormItem = Form.Item;
const Option = Select.Option;

function UserInitModal({
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

      if (newData.type) {
        newData.type = parseInt(newData.type)
      }

      const data = { ...item, ...newData };
      onOk(data);
    })
  }

  function checkPassword(rule, value, callback) {
    if (value && value !== getFieldValue('newPwd1')) {
      callback('两次密码输入不一致');
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
          <Col span={18}>
            <FormItem
              {...formItemLayout}
              label="姓名:"
            >
              {getFieldDecorator('name', {
                initialValue: '', 
                rules: [{
                  required: true, message: '姓名未填写',
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

        <Row>
          <Col span={18}>
            <FormItem
              {...formItemLayout}
              label="邮箱:"
              hasFeedback
            >
              {getFieldDecorator('email', {
                initialValue: '', 
                rules: [{
                  type: 'email', message: '邮箱格式错误',
                }, {
                  required: true, message: '邮箱未填写',
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

        <Row>
          <Col span={18}>
            <FormItem
              {...formItemLayout}
              label="密码:"
              hasFeedback
            >
              {getFieldDecorator('newPwd1', {
                initialValue: '', 
                rules: [{
                  pattern: /[0-9]+/, message: '密码格式错误',
                }, {
                  required: true, message: '密码未填写'
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
                  required: true, message: '密码未填写'
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

        <Row>
          <Col span={18}>
            <FormItem
              {...formItemLayout}
              label="职位"
              hasFeedback
            >
              {getFieldDecorator('type', {
                initialValue: '', 
                rules: [{
                  required: true, message: '职位未选择',
                }],
              })(
                <Select>
                  {authority.getTypes().map((e, i) => {
                    return (
                      <Option key={i} value={`${e}`}>
                        {authority.getTypeName(e)}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={18}>
            <FormItem
              {...formItemLayout}
              label="所属中心"
              hasFeedback
            >
              {getFieldDecorator('center', {
                initialValue: '', 
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
          </Col>
        </Row>

      </Form>
    </Modal>
  )
}

export default Form.create()(UserInitModal)