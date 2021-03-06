import React, {PropTypes} from 'react'
import { Button, Row, Form, Input } from 'antd'
import { config } from '../utils'
import styles from './login.less'

const FormItem = Form.Item

const login = ({
  loginButtonLoading,
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      onOk(values)
    })
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img src={config.logoSrc} />
        <span>{config.name}</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请填写邮箱'
              },{
                type: 'email', 
                message: '请输入有效的邮箱! '
              }
            ]
          })(<Input size='large' onPressEnter={handleOk} placeholder='用户名' />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('pwd', {
            rules: [
              {
                required: true,
                message: '请填写密码'
              }
            ]
          })(<Input size='large' type='password' onPressEnter={handleOk} placeholder='密码' />)}
        </FormItem>
        <Row>
          <Button type='primary' size='large' onClick={handleOk} loading={loginButtonLoading}>
            登录
          </Button>
        </Row>
      </form>
    </div>
  )
}

login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onOk: PropTypes.func
}

export default Form.create()(login)
