/*
 * 总部数据分析
 *
 */
import React from 'react'
import { connect } from 'dva'
import {Table, Icon, DatePicker} from 'antd'
import {center} from '../../utils'
const {getCenterName} = center;

function AdminReport({dataSource, date}) {

    let tdata = [...dataSource];

    let allCount = 0;
    let allYb = 0;
    tdata.forEach((d, index) => {
      d.key = index;
      allCount += d.count;
      allYb += d.yb;
    });
    tdata.push({
      center: '总计',
      yb: allYb,
      count: allCount,
    });  

  const columns = [{
      title: '校区名称',
      dataIndex: 'center',
      render: (text, record, index) => text == '总计' ? text : getCenterName(text),
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
        dataSource={tdata}
        // loading={loading}
        // onChange={onPageChange}
        // pagination={pagination}
        simple
        title={() => (
          <h3>
            全国各校区每日数据汇总报表{' '}
            <a href="javascript:void(0)"
              style={{ padding: '0 5px' }}
              onClick={() => {
                // this.graph
              }}
            >
              <Icon type="area-chart" />
            </a>

          </h3>
        )} 
      />
    </div>
  );  
}

           

export default AdminReport