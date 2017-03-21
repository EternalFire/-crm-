import React from 'react'
import {Table, Icon} from 'antd'
import TableBodyWrapper from '../common/TableBodyWrapper'

function CenterTable ({dataSource, loading, onEditItem, onPageChange, pagination}) {
  const handleOp = (record) => {
    onEditItem(record)
  }

  const columns = [{
      title: '操作',
      dataIndex: 'op',
      render: (text, record, index) => (
        <a href="javascript:void(0)" onClick={() => handleOp(record)}>
          <Icon type="edit" />
        </a>
      ),
      width: '50px',
    }, {
      title: (
        <div>
          <strong>分配情况</strong>
        </div>
      ),
      dataIndex: 'createTime',
      render(text, record, index) {
        // todo extract this function 
        // const createDate = moment.unix(text / 1000).format('YYYY-MM-DD');
        
        const createDate = text

        return (
          <div>
            {createDate}<br />
            {record.followUserName}
          </div>
        );
      },
      width: '90px',
    }, {
      title: '岗位',
      dataIndex: 'job',
      width: '100px',
    }, {
      title: '姓名',
      dataIndex: 'name',
      width: '120px',
      render(text, record, index) {
            // <Tags customer={record} />
        return (
          <div>
            <div>{text}</div>
          </div>
        );
      }
    }, {
      title: '性别',
      dataIndex: 'sex',
      width: '50px',
    }, {
      title: '手机号码',
      dataIndex: 'mobile',
      width: '100px',
    }, {
      title: '初试备注',
      dataIndex: 'remark',
    }, {
      title: '课程',
      dataIndex: 'grade',
      width: '80px',
    }, {
      title: '学历',
      dataIndex: 'education',
      width: '50px',
    }, {
      title: '专业',
      dataIndex: 'major',
      width: '100px',
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
      title: '邀约人',
      dataIndex: 'invite',
      width: '60px',
    }
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

export default CenterTable