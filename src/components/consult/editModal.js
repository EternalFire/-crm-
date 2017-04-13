/*
 * 咨询中心 编辑用户信息
 */
import React, { PropTypes } from 'react'
import {Modal, Row, Col, Form, Input, Radio, Checkbox} from 'antd'
import {maxRemarkLen, maxRemarkMessage, maxNormalLen, maxNormalMessage} from '../../utils'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group

const EditModal = ({
  title,
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
        ...item, 
        ...getFieldsValue(),
      }

      onOk(data)
    })
  }

  function handleChangeStat(checkedValue) {
    checkedValue.map((v) => {
      if (v == 'fs' && !item.fsTime) {
        item.fsTime = new Date().getTime();
      } else if (v == 'yb' && !item.ybTime) {
        item.ybTime = new Date().getTime();
      } else if (v == 'jb' && !item.jbTime) {
        item.jbTime = new Date().getTime();
      } else if (v == 'fk' && !item.fkTime) {
        item.fkTime = new Date().getTime();
      } else if (v == 'zj' && !item.zjTime) {
        item.zjTime = new Date().getTime();
      }
    });
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const remarkFormItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 19 },
  };
  
  const plainOptions = [
    { label: '复试', value: 'fs' },
    { label: '预报', value: 'yb' },
    { label: '进班', value: 'jb' },
    { label: '放款', value: 'fk' },
    { label: '转缴', value: 'zj' }
  ];

  let defaultStat = []; // 选中的跟进进度
  if (item.fsTime) defaultStat.push('fs');
  if (item.ybTime) defaultStat.push('yb');
  if (item.jbTime) defaultStat.push('jb');
  if (item.fkTime) defaultStat.push('fk');
  if (item.zjTime) defaultStat.push('zj');

  const modalProps = {
    title,
    visible,
    onOk: handleOk,
    onCancel,
    width: 600
  }

  return (
    <Modal {...modalProps}>
      <Form vertical>
        <Row>
          <Col span={12}>
            <FormItem label='姓名: ' {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                    message: '姓名未填写'
                  }, {
                    max: maxNormalLen,
                    message: maxNormalMessage
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label='性别: ' {...formItemLayout}>
              {getFieldDecorator('sex', {
                initialValue: item.sex,
                rules: [
                  {
                    required: true,
                    message: '性别未选择'                  
                  }
                ]
              })(
                <RadioGroup>
                  <Radio value="男">男</Radio>
                  <Radio value="女">女</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
          
          <Col span={12}>
            <FormItem label='手机号码' {...formItemLayout}>
              {getFieldDecorator('mobile', {
                initialValue: item.mobile,
                rules: [
                  {
                    max: maxNormalLen,
                    message: maxNormalMessage
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="来源渠道">
              {item.memsrc}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                initialValue: item.remark,
                rules: [
                  {
                    max: maxRemarkLen,
                    message: maxRemarkMessage
                  }
                ]
              })(<Input type="textarea" rows={4} />)}
            </FormItem>
            <FormItem {...remarkFormItemLayout} label="跟进进度">
              <CheckboxGroup options={plainOptions} onChange={handleChangeStat} />
            </FormItem>
          </Col>        
        </Row>        
      </Form>
    </Modal>
  )
}

export default Form.create()(EditModal)