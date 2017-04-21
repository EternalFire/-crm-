/*
 * 网络咨询 数据表
 */
import React, { PropTypes } from 'react'
import {Table, Icon} from 'antd'
import TableColumnFilter from '../common/tableColumnFilter'
import {timestampToObject, getTableScrollY, activeFilterColor, inactiveFilterColor } from '../../utils'

function ConsultTable ({
  dataSource, 
  loading, 
  onPageChange, 
  pagination, 
  onEditItem,
  onDeleteItem,
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
        <div>
          <a href="javascript:void(0)" onClick={() => {          
            if (onEditItem) {
              onEditItem(record)
            }
          }}>
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
      width: '90px',
    }, {
      title: '分配时间',
      dataIndex: 'createTime',
      render: text => {
        let {date, time} = timestampToObject(text);
        return (
          <div>
            <div>{date}</div>
            <div>{time}</div>
          </div>
        )
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
      filterIcon: <Icon type="search" style={{ color: nameText.length > 0 ? activeFilterColor : inactiveFilterColor }} />,
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
      filterIcon: <Icon type="search" style={{ color: mobileText.length > 0 ? activeFilterColor : inactiveFilterColor }} />,
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
        style={{ marginTop: 15 }}        
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