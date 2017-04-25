/*
 * 用户管理 工具栏
 */
import React from 'react'
import {Card, Button} from 'antd'

function UserToolbar({
  onAddUser
}) {
  return (
    <Card>
      <Button type="primary" size="small" onClick={onAddUser}>新增用户</Button>
    </Card>
  )
}

export default UserToolbar