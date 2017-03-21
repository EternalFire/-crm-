import React from 'react'
import {Table} from 'antd'
import TableBodyWrapper from '../common/TableBodyWrapper'
import moment from 'moment'

function MonthlyReport ({dataSource, loading, onPageChange, pagination}) {

  let columns = [{
    title: '日期',
    dataIndex: 'titileName',
  }];

  let szData = { titileName: '简历上门' };
  let wzData = { titileName: '市场上门' };
  let ybData = { titileName: '预报量' };
  let zjData = { titileName: '转缴量' };
  let fkData = { titileName: '放款量' };
  let ybRate = { titileName: '预报率(%)' };
  let zjRate = { titileName: '转缴率(%)' };
  let fkRate = { titileName: '放款率(%)' };

  let data = dataSource
  if (dataSource.length === 0) {
    data = Array.from({length: moment().daysInMonth()}).map((e, i) => {
      return {
        date: i + 1 + '',
        sz: 0,
        wz: 0,
        yb: 0,
        zj: 0,
        fk: 0
      }
    })
  }

  data.map(d => {
    const no = d.date.substring(d.date.length - 2);
    columns.push({
      title: no,
      dataIndex: `date${no}`,
    });

    szData[`date${no}`] = d.sz;
    wzData[`date${no}`] = d.wz;
    ybData[`date${no}`] = d.yb;
    zjData[`date${no}`] = d.zj;
    fkData[`date${no}`] = d.fk;
    ybRate[`date${no}`] = `${(d.sz + d.wz != 0) ? (d.yb / (d.sz + d.wz) * 100).toFixed(1) * 1 : 0}`;
    zjRate[`date${no}`] = `${(d.yb != 0) ? (d.zj / d.yb * 100).toFixed(1) * 1 : 0}`;
    fkRate[`date${no}`] = `${(d.sz + d.wz != 0) ? (d.fk / (d.sz + d.wz) * 100).toFixed(1) * 1 : 0}`;
  });


  let dataSource_ = [szData, wzData, ybData, zjData, fkData, ybRate, zjRate, fkRate].map((d, i) => {
    d._id = i;
    return d;
  });

  return (
    <div>
      <Table
        bordered
        // scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource_}
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