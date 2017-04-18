import React from 'react'
import {Table, Icon, Input, Button} from 'antd'
// import TableBodyWrapper from '../common/TableBodyWrapper'
import TableColumnFilter from '../common/tableColumnFilter'
import {timestampToString, getTableScrollY, activeFilterColor, inactiveFilterColor} from '../../utils'
import ProgressTags from '../common/progressTags'

function CenterTable ({
  users, 
  dataSource, 
  loading, 
  onEditItem, 
  onPageChange, 
  pagination, 

  mobileFilterVisible, 
  onInputChange, 
  onSearchMobile, 
  mobileText,
  onMobileFilterVisibleChange
}) {
  const handleOp = (record) => {
    onEditItem(record)
  }

  let usersFilters = [];
  if (users) {
    usersFilters = users.map(e => {
      return {
        text: e.name,
        value: e._id
      };
    });
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
          <strong>分配时间</strong>
        </div>
      ),
      dataIndex: 'createTime',
      render(text, record, index) {
        return timestampToString(text);
      },
      width: '90px',
    }, {
      title: '咨询师',
      dataIndex: 'followUserName',
      width: '80px',
      filters: usersFilters, 
      filterMultiple: false // 单选
    },{
      title: '岗位',
      dataIndex: 'job',
      width: '100px',
    }, {
      title: '姓名',
      dataIndex: 'name',
      width: '80px',
      render(text, record, index) {
        return (
          <div>
            <div>{text}</div>
            <ProgressTags customer={record} />
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
      filterDropdown: (
        <TableColumnFilter 
          value={mobileText} 
          placeholder="输入手机号" 
          onChange={onInputChange} 
          onPressEnter={onSearchMobile} 
          onOk={onSearchMobile} 
        />
      ),
      filterIcon: <Icon type="search" style={{ color: mobileText.length > 0 ? activeFilterColor : inactiveFilterColor }} />, 
      filterDropdownVisible: mobileFilterVisible,
      onFilterDropdownVisibleChange: onMobileFilterVisibleChange
    }, {
      title: '初试备注',
      dataIndex: 'remark',
      width: '200px',
      render(text, record, index) {
        return (
          <div style={{
            textAlign: 'left'
          }}>
            {text}
          </div>
        )
      }
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
    // <div>
      <Table
        bordered
        scroll={{ y: getTableScrollY(530) }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        // simple
        rowKey={record => record._id}
      />
    // </div>
  )
}

export default CenterTable