import React from 'react'
import {Table, Icon, Input, Button} from 'antd'
// import TableBodyWrapper from '../common/TableBodyWrapper'
import {timestampToString} from '../../utils'
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
        const createDate = timestampToString(text);
        return (<span>{createDate}</span>);
        // return (
        //   <div>
        //     {createDate}<br />
        //     {record.followUserName}
        //   </div>
        // );
      },
      width: '90px',
    }, {
      title: '咨询师',
      dataIndex: 'followUserName',
      width: '80px',
      filters: usersFilters, 
      filterMultiple: false
    },{
      title: '岗位',
      dataIndex: 'job',
      width: '100px',
    }, {
      title: '姓名',
      dataIndex: 'name',
      width: '120px',
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
        <div style={{
          padding: '8px',
          borderRadius: '6px',
          background: '#fff',
          boxShadow: '0 1px 6px rgba(0, 0, 0, .2)'
        }}>
          <Input 
            placeholder="输入手机号"
            value={mobileText}
            onChange={onInputChange}
            onPressEnter={onSearchMobile}
            style={{
              width: 130
            }}
          />
          <Button type="primary" onClick={onSearchMobile}>搜索</Button>
        </div>
      ),
      filterIcon: <Icon type="smile-o" 
        // style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} 
      />,
      filterDropdownVisible: mobileFilterVisible,
      onFilterDropdownVisibleChange: onMobileFilterVisibleChange
      // visible => this.setState({ filterDropdownVisible: visible }, () => this.searchInput.focus()),
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
        scroll={{ x: true, y: 480 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record._id}
      />
    </div>
  )
}

export default CenterTable