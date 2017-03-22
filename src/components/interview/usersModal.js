/*
 * 选择咨询师弹窗
 */
import React from 'react'
import { Modal, Form } from 'antd'

const modal = ({
  title,
  visible,
  item = {},
  users = [],
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
      <Form vertical>
        {users.map((u, i) => (
          <div key={`follow${i}`} className="radio">
            <label>
              <input type="radio" name="followUserId" value={u._id} onClick={handleFollow} /> {u.name}
            </label>
          </div>
        ))}
      </Form>
    </Modal>
  );
}

export default Form.create()(modal)