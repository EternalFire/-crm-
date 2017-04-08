/*
 * 总部数据分析
 *
 */
import React from 'react'
import { connect } from 'dva'
import {Table, Icon, DatePicker} from 'antd'
import {center} from '../../utils'
const {getCenterName} = center;

function AdminReportComponent({dataSource, date, pagination, loading}) {
  const columns = [{
      title: '校区名称',
      dataIndex: 'center',
      render: (text, record, index) => text == '总计' ? text : getCenterName(text),
      width: '80px',
    }, {
      title: '预报量',
      dataIndex: 'yb',
      width: '80px',
    }, {
      title: '上门量',
      dataIndex: 'count',
      width: '80px',
    }, {
      title: '预报率(%)',
      dataIndex: 'ybRate',
      render: (text, record, index) => record.count != 0 ? (record.yb / record.count  * 100).toFixed(1) * 1 : 0,
      width: '80px',
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
      />
    </div>
  );  
}


export default AdminReportComponent