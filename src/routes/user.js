/**
 * 用户管理
 */
import React from 'react'
import { connect } from 'dva'
import { Modal } from 'antd'
import UserTable from '../components/user/userTable'
import UserModal from '../components/user/userModal'

const Confirm = Modal.confirm;

const User = ({dispatch, admin, loading}) => {
  const { allUsers, userModalVisible } = admin;

  const userTableProps = {
    dataSource: allUsers,
    loading,
    pagination: false,
    onEditItem(record) {
      dispatch({ type: 'admin/setCurrentUser', payload: record });
      dispatch({ type: 'admin/showUserModal' });
    },
    onDeleteItem(record) {
      Confirm({
        title: `确定要删除 ${record.name} ?`,
        onOk() {
          dispatch({type: 'admin/deleteUser', payload: { current: record }})
        },
        onCancel() {},
      });
    }
  };

  const userModalProps = {
    visible: userModalVisible,
    onOk(formData) {
      dispatch({ type: 'admin/hideUserModal' });      
    },
    onCancel() {
      dispatch({ type: 'admin/hideUserModal' });      
    }
  };

  const ModalGen = () => (<UserModal {...userModalProps} />)

  return (
    <div>
      <UserTable {...userTableProps} />
      <ModalGen />
    </div>
  );
}

export default connect(({admin, loading}) => ({
  admin, loading: loading.global
}))(User)