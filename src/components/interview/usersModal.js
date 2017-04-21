/*
 * 选择咨询师弹窗
 */
import React from 'react'
import { Modal, Form } from 'antd'
import moment from 'moment'

const modal = ({
  title,
  visible,
  item = {},
  users = [],
  followUser = {},
  onOk,
  onCancel,
  onFollow,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {

  function handleFollow(e) {
    if (onFollow) {
      onFollow(e)
    }
  }

  const modalProps = {
    title,
    visible,
    onOk,
    onCancel
  }

  return (
    <Modal {...modalProps}>
      <Form layout="vertical">
        {
          users.map((u, i) => (
            <div key={`follow${i}`} className="radio">
              <label>
                <input type="radio" name="followUserId" value={u._id} checked={followUser._id === u._id} onChange={handleFollow} /> {u.name}
              </label>
            </div>
          ))
        }
      </Form>
    </Modal>
  );
}

export default Form.create()(modal)