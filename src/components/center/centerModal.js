/*
 * 咨询中心编辑弹窗
 */
import React from 'react'
import { Modal, Row, Col, Form, Input, Radio, Checkbox } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group

const CenterModal = ({
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
        
        // _id: item._id
      }

      onOk(data)
    })
  }

  function handleChangeStat(checkedValue) {
    checkedValue.map(v => {
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
    title: "编辑",
    visible,
    onOk: handleOk,
    onCancel,
    width: 800
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
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label='学校: ' {...formItemLayout}>
              {getFieldDecorator('university', {
                initialValue: item.university,
                rules: [
                  {
                    required: true,
                    message: '学校未填写'
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label='专业: ' {...formItemLayout}>
              {getFieldDecorator('major', {
                initialValue: item.major,
                rules: []
              })(<Input />)}
            </FormItem>
            <FormItem label='性别: ' {...formItemLayout}>
              {getFieldDecorator('sex', {
                initialValue: item.sex,
                rules: [{
                  required: true,
                  message: '性别未选择'
                }]
              })(
                <RadioGroup>
                  <Radio value="男">男</Radio>
                  <Radio value="女">女</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label='来源渠道' {...formItemLayout}>
              {item.memsrc}
            </FormItem>
            <FormItem label='课程' {...formItemLayout}>
              {getFieldDecorator('grade', {
                initialValue: item.grade,
                rules: []
              })(<Input />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='手机号码' {...formItemLayout}>
              {getFieldDecorator('mobile', {
                initialValue: item.mobile,
                rules: []
              })(<Input />)}
            </FormItem>
            <FormItem label='工作年限' {...formItemLayout}>
              {getFieldDecorator('jobYears', {
                initialValue: item.jobYears,
                rules: []
              })(<Input />)}
            </FormItem>
            <FormItem label='岗位' {...formItemLayout}>
              {getFieldDecorator('job', {
                initialValue: item.job,
                rules: []
              })(<Input />)}
            </FormItem>
            <FormItem label='学历' {...formItemLayout}>
              {getFieldDecorator('education', {
                initialValue: item.education,
                rules: []
              })(
                <RadioGroup>
                  <Radio value="大专">大专</Radio>
                  <Radio value="本科">本科</Radio>
                  <Radio value="硕士及以上">硕士及以上</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="邀约人">
              {item.invite}
            </FormItem>
            <FormItem {...formItemLayout} label="试听时间">
              {getFieldDecorator('tryDate', {
                initialValue: item.tryDate,
                rules: []
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout} label="初试备注">
              {getFieldDecorator('remark', {
                initialValue: item.remark,
                rules: []
              })(<Input type="textarea" rows={4} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="复试备注">
              {getFieldDecorator('fsRemark', {
                initialValue: item.fsRemark,
                rules: []
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

export default Form.create()(CenterModal)