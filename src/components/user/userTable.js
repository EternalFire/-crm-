/**
 * 用户列表
 */
import React from 'react'
import {Table, Icon, Button} from 'antd'
import {getTableScrollY, center, authority} from '../../utils'

function UserTable({
  dataSource,
  loading, 
  pagination,
  onEditItem,
  onDeleteItem,  
}) {

  const columns = [{
    title: '操作',
    dataIndex: 'op', 
    render: (text, record, index) => (
      <div>
        <a href="javascript:void(0)" 
          onClick={() => {
            if (onEditItem) {
              onEditItem(record, index)
            }
          }}
        >
          <Icon type="edit" />
        </a>

        <a href="javascript:void(0)" 
          onClick={() => {
            if (onDeleteItem) {
              onDeleteItem(record, index)
            }
          }}
          style={{ marginLeft: '20px' }}
        >
          <Icon type="delete" />
        </a>
      </div>
    ),
    width: '90px'
  }, {
    title: '姓名',
    dataIndex: 'name',  
    width: '90px'
  }, {
    title: '邮箱',
    dataIndex: 'email',
    width: '90px'    
  }, {
    title: '类型',
    dataIndex: 'type',
    width: '90px',
    render: (text, record, index) => (
      <div>
        {authority.getTypeName(text)}
      </div>
    )
  }, {
    title: '中心',
    dataIndex: 'center',
    width: '90px',
    render: (text, record, index) => (
      <div>
        {center.getCenterName(text)}
      </div>
    )    
  }];

  return (
    <Table
      bordered
      style={{ marginTop: 15 }}        
      scroll={{ y: getTableScrollY(580) }}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      // onChange={onPageChange}
      pagination={pagination}
      simple
      rowKey={record => record._id}
    />  
  );
}

export default UserTable