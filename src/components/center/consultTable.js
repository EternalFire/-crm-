import React, { PropTypes } from 'react'
import {Table, Icon} from 'antd'
import {timestampToString} from '../../utils'

function ConsultTable ({dataSource, loading, onPageChange, pagination}) {
  const columns = [{
      title: '操作',
      dataIndex: 'op',
      render: (text, record, index) => (
        <a href="javascript:void(0)" onClick={() => {
          // this.openTarget(record)
        }}>
          <Icon type="edit" />
        </a>
      ),
      width: '50px',
    }, {
      title: '姓名',
      dataIndex: 'name',
      width: '80px',
    }, {
      title: '手机号码',
      dataIndex: 'mobile',
      width: '110px',
    }, {
      title: '所在地区',
      dataIndex: 'area',
      width: '110px',
    }, {
      title: '信息来源',
      dataIndex: 'searchPlatform',
      width: '80px',
    }, {
      title: '关键字',
      dataIndex: 'keyword',
      width: '80px',
    }, {
      title: '咨询顾问',
      width: '80px',
      dataIndex: 'followUserName',
    }, {
      title: '分配日期',
      dataIndex: 'createTime',
      render(text, record, index) {
        return (<div>{timestampToString(text)}</div>);
      },
      width: '90px',
    }, {
      title: '接待客服',
      dataIndex: 'workerName',
      width: '80px',
      render: (text, record, index) => {
        return (
          <div>
            {text}{' '}
            <a href="javascript:void(0)" onClick={() => {
              // this.openMessages(record.guest_id)
            }}>
              <Icon type="message" />
            </a>
          </div>
        );
      },
    }, {
      title: '类别',
      dataIndex: 'flag',
      width: '80px',
    }, {
      title: '备注',
      dataIndex: 'remark',
    },
    /*
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render(text, record, index) {
        return (<div>{moment.unix(text / 1000).format('YYYY-MM-DD')}</div>);
      },
    }
    */
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

export default ConsultTable