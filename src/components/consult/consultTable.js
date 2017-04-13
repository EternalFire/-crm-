/*
 * 咨询中心 数据表
 */
import React, { PropTypes } from 'react'
import {Table, Icon} from 'antd'
import TableColumnFilter from '../common/tableColumnFilter'
import {timestampToString, getTableScrollY} from '../../utils'

function ConsultTable ({
  dataSource, 
  loading, 
  onPageChange, 
  pagination, 
  onEditItem,
  onShowMessage,

  mobileText,
  onInputMobileChange,
  mobileFilterVisible,
  onMobileFilterVisibleChange,
  onSearch,

  nameText,
  onInputNameChange, 
  nameFilterVisible,
  onNameFilterVisibleChange,
}) {
  const columns = [{
      title: '操作',
      dataIndex: 'op',
      render: (text, record, index) => (
        <a href="javascript:void(0)" onClick={() => {          
          if (onEditItem) {
            onEditItem(record)
          }
        }}>
          <Icon type="edit" />
        </a>
      ),
      width: '50px',
    }, {
      title: '分配时间',
      dataIndex: 'createTime',
      render(text, record, index) {
        return timestampToString(text);
      },
      width: '90px',
    }, {
      title: '姓名',
      dataIndex: 'name',
      width: '80px',
      filterDropdown: (
        <TableColumnFilter 
          value={nameText}
          placeholder="输入姓名"
          onChange={onInputNameChange}
          onPressEnter={onSearch}
          onOk={onSearch}
        />
      ),
      filterDropdownVisible: nameFilterVisible,
      onFilterDropdownVisibleChange: onNameFilterVisibleChange
    }, {
      title: '手机号码',
      dataIndex: 'mobile',
      width: '110px',
      filterDropdown: (
        <TableColumnFilter 
          value={mobileText}
          placeholder="输入手机号"
          onChange={onInputMobileChange}
          onPressEnter={onSearch}
          onOk={onSearch}
        />
      ),
      filterDropdownVisible: mobileFilterVisible,
      onFilterDropdownVisibleChange: onMobileFilterVisibleChange      
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
      title: '接待客服',
      dataIndex: 'workerName',
      width: '80px',
      render: (text, record, index) => {
        return (
          <div>
            {text}{' '}
            <a href="javascript:void(0)" onClick={() => {
              if (onShowMessage) {
                onShowMessage(record)
              }
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
    // <div>
      <Table
        bordered
        scroll={{ y: getTableScrollY(600) }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record._id}
      />
    // </div>  
  )
}

export default ConsultTable