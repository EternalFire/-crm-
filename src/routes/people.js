import React from 'react'
import { connect } from 'dva'

import UserList from '../components/users/list'
import styles from './people.css'

function People({location, people}) {
  const { list, loading, pagination, isMotion } = people

  const userListProps ={
    dataSource: list,
    loading,
    pagination: pagination,
    location,
    isMotion,
    onPageChange (page) {

    },
    onDeleteItem (id) {

    },
    onEditItem (item) {

    }
  };

  return (
    <div className={styles.red}>
      <UserList {...userListProps} />
    </div>
  );
}

export default connect(({people}) => ({people}))(People)