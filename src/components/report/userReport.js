import React from 'react'
import {Table} from 'antd'
import TableBodyWrapper from '../common/TableBodyWrapper'

function UserReport ({dataSource, loading, onPageChange, pagination}) {

  const columns = [{
    title: '姓名',
    dataIndex: 'name',
  }, {
    title: '日初试',
    dataIndex: 'cs',
  }, {
    title: '日复试',
    dataIndex: 'fs',
  }, {
    title: '日预报',
    dataIndex: 'yb',
  }, {
    title: '日转缴',
    dataIndex: 'zj',
  }, {
    title: '日放款',
    dataIndex: 'fk',
  }, {
    title: '月初试',
    dataIndex: 'csOfM',
  }, {
    title: '月复试',
    dataIndex: 'fsOfM',
  }, {
    title: '月初复试',
    render: (text, record, index) => (record.csOfM + record.fsOfM),
  }, {
    title: '总预报',
    dataIndex: 'ybOfM',
  }, {
    title: '总转缴',
    dataIndex: 'zjOfM',
  }, {
    title: '总放款',
    dataIndex: 'fkOfM',
  }, {
    title: '总预报率',
    render: (text, record, index) => {
      record.ybRateOfM = (record.csOfM != 0 && record.ybOfM != 0) ? (record.ybOfM / record.csOfM * 100).toFixed(2) * 1 : 0;

      return (
        <span>
          {record.ybRateOfM} %
        </span>
      );
    },
  }, {
    title: '总预报转缴费率',
    render: (text, record, index) => {
      record.zjRateOfM = (record.zjOfM != 0 && record.ybOfM != 0) ? (record.zjOfM / record.ybOfM * 100).toFixed(2) * 1 : 0;

      return (
        <span>
          {record.zjRateOfM} %
        </span>
      )
    },
  }, {
    title: '总放款率',
    render: (text, record, index) => {
      record.fkRateOfM = (record.fkOfM != 0 && record.csOfM != 0) ? (record.fkOfM / record.csOfM * 100).toFixed(2) * 1 : 0;
      return (
        <span>
          {record.fkRateOfM} %
        </span>
      );
    },
  }];

  let dataSource_ = dataSource.map((e, i) => {
    e._id = i;
    return e;
  });

  return (
    <div>
      <Table
        bordered
        // scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource_}
        loading={loading}
        // onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record._id}
      />
    </div>
  )
}

export default UserReport