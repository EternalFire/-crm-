/**
 * 总部 - 用户管理
 */
import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router';
import { Modal } from 'antd'
import UserTable from '../components/user/userTable'
import UserModal from '../components/user/userModal'
import UserTool from '../components/user/userTool'
import UserInitModal from '../components/user/userInitModal'
import {center, authority} from '../utils'

const Confirm = Modal.confirm;

const User = ({dispatch, admin, loading, user}) => {
  // 权限判断
  if (!authority.checkCenter(center.admin, 'currentType', user)) {
    dispatch(routerRedux.push({ pathname: '/' }));
    return <div></div>;
  }

  const { allUsers, userModalVisible, userInitModalVisible, currentUser } = admin;

  const userToolProps = {
    onAddUser() {
      dispatch({ type: 'admin/showUserInitModal' });      
    }
  };

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
          dispatch({ type: 'admin/deleteUser', payload: record });
        },
        onCancel() {},
      });
    },
  };

  const userModalProps = {
    visible: userModalVisible,
    item: currentUser, 
    onOk(formData) {
      dispatch({ type: 'admin/updateUser', payload: formData });
      dispatch({ type: 'admin/hideUserModal' });
    },
    onCancel() {
      dispatch({ type: 'admin/hideUserModal' });
    }
  };

  const userInitModalProps = {
    visible: userInitModalVisible, 
    onOk(formData) {
      dispatch({ type: 'admin/addUser', payload: formData });      
      dispatch({ type: 'admin/hideUserInitModal' });
    },
    onCancel() {
      dispatch({ type: 'admin/hideUserInitModal' });      
    }
  };  

  const ModalGen = () => (<UserModal {...userModalProps} />)
  const InitModalGen = () => (<UserInitModal {...userInitModalProps} />)

  return (
    <div>
      <UserTool {...userToolProps} />
      <UserTable {...userTableProps} />
      <ModalGen />
      <InitModalGen />
    </div>
  );
}

export default connect(({admin, loading, app}) => ({
  admin, loading: loading.global, user: app.user
}))(User)