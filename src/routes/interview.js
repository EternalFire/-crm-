import React from 'react'
import { connect } from 'dva'
import {Modal} from 'antd'
import { center, checkDate } from '../utils'
import QR from '../components/interview/qr'
import InterviewTable from '../components/interview/interviewTable'
import InterviewToolbar from '../components/interview/interviewToolbar'
import EditModal from '../components/interview/editModal'
import UsersModal from '../components/interview/usersModal'

const Confirm = Modal.confirm;

const Interview = ({
  dispatch, 
  interview,
  app
}) => {
  const {
    name, 
    type, 
    frontData,
    current,
    editModalVisible,
    usersModalVisible
  } = interview

  const {users} = app

  const qrProps = {
    center: name,
    centerName: center.getCenterName(name)
  };

  const tableProps = {
    dataSource: frontData,
    onEditItem(record) {
      dispatch({ type: 'interview/setEditModalVisible', payload: { visible: true } })
      dispatch({ type: 'interview/setCurrent', payload: { current: record } })
    },
    onDeleteItem(record) {
      Confirm({
        title: `确定要删除 ${record.name} ?`,
        onOk() {
          console.log('delete ok')

          // dispatch({type: 'interview/deleteCustomer'})
        },
        onCancel() {
          console.log('delete cancel')        
        },
      });
    },
    onFollow(record) {
      dispatch({ type: 'interview/setUsersModalVisible', payload: { visible: true } })
    },
    pagination: false
  };

  const toolProps = {
    handleDateChange(date, dateString) {
      checkDate(date, dateString, () => {
        dispatch({ type: 'interview/setDate', payload: { date: dateString } })
        dispatch({ type: 'interview/queryFrontDesk' })
      })
    },
    // handleSearch() {
    // }
  }

  const renderQR = () => {
    if (type === center.interviewType.qr) {
      return (<QR {...qrProps} />)
    }
    return null;
  }

  const renderInterviewTable = () => {
    if (type === center.interviewType.align) {
      return (
        <div>
          <InterviewToolbar {...toolProps} />
          <InterviewTable {...tableProps} />
        </div>
      )
    }
    return null;
  }

  const editModalProps = {
    visible: editModalVisible,
    item: current,
    onOk(formData) {
      dispatch({ type: 'interview/setEditModalVisible', payload: { visible: false } })
    },
    onCancel() {
      dispatch({ type: 'interview/setEditModalVisible', payload: { visible: false } })
    }
  }

  const usersModalProps = {
    title: 'users modal',
    visible: usersModalVisible,
    users: users,
    onOk(formData) {
      dispatch({ type: 'interview/setUsersModalVisible', payload: { visible: false } })
    },
    onCancel() {
      dispatch({ type: 'interview/setUsersModalVisible', payload: { visible: false } })
    }
  }

  return (
    <div>
      {renderQR()}
      {renderInterviewTable()}
      <EditModal {...editModalProps} />
      <UsersModal {...usersModalProps} />
    </div>
  )
}

export default connect(({interview, app}) => ({interview, app}))(Interview)