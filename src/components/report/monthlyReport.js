import React from 'react'
import {Table} from 'antd'
import TableBodyWrapper from '../common/TableBodyWrapper'
import moment from 'moment'

function MonthlyReport ({dataSource, loading, onPageChange, pagination}) {

  let columns = [{
    title: '日期',
    dataIndex: 'titileName',
  }];

  dataSource.forEach((e, i) => {
    if (i === 0) {
      Object.keys(e).forEach(k => {        
        if (k.includes('date')) {
          columns.push({
            title: k.substr(k.indexOf('date') + 4),
            dataIndex: k,
          }); 
        }
      })
    }      
  })

  return (
    <div>
      <Table
        bordered
        // scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource}
        // loading={loading}
        // onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record._id}
      />
    </div>
  )
}

export default MonthlyReport