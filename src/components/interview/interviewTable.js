import React from 'react'
import {Table, Icon, Button} from 'antd'
import TableBodyWrapper from '../common/TableBodyWrapper'
import ProgressTags from '../common/progressTags'
import {timestampToString} from '../../utils'

const InterviewTable = ({
  dataSource, 
  loading, 
  onPageChange, 
  pagination,
  onEditItem,
  onDeleteItem,
  onFollow, // 分配咨询师
}) => {
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
      width: '80px',
    }, {
      title: '序号',
      dataIndex: 'no',
      width: '50px',
    }, {
      title: '咨询师',
      dataIndex: 'follow',
      render: (text, record, index) => {
        return (
          <Button size="small" type={(text ? null : 'danger')} 
            icon="setting" 
            onClick={() => {
              if (onFollow) {
                onFollow(record, index)
              }
            }}
          >
            {(text ? text : '分配')}
          </Button>
        );
      },
      width: '100px',
    }, {
      title: '姓名',
      dataIndex: 'name',
      render: (text, record, index) => {
        // 分配
        return (
          <div>
            {text}{' '}<ProgressTags customer={record} />
          </div>
        );       
      },
      width: '100px',
    }, {
      title: '手机号码',
      dataIndex: 'mobile',
      width: '100px',
    }, {
      title: '专业',
      dataIndex: 'major',
      width: '100px',
    }, {
      title: '岗位',
      dataIndex: 'job',
      width: '100px',
    }, {
      title: '学历',
      dataIndex: 'education',
      width: '50px',
    }, {
      title: '学校',
      dataIndex: 'university',
      width: '100px',
    }, {
      title: '工作年限',
      dataIndex: 'jobYears',
      width: '80px',
    }, {
      title: '渠道来源',
      dataIndex: 'memsrc',
      width: '80px',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      render: text => timestampToString(text),
      width: '100px',
    }
  ];

  return (
    <div>
      <Table
        bordered
        // scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        // onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record._id}
      />
    </div>
  )
}

export default InterviewTable