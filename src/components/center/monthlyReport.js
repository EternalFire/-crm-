import React from 'react'
import {Table} from 'antd'
import TableBodyWrapper from '../common/TableBodyWrapper'

function MonthlyReport ({dataSource, loading, onPageChange, pagination}) {

  const columns = [
  ];

  return (
    <div>
      <Table
        bordered
        // scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource}
        // loading={loading}
        // onChange={onPageChange}
        // pagination={pagination}
        simple
        rowKey={record => record._id}
      />
    </div>
  )
}

export default MonthlyReport