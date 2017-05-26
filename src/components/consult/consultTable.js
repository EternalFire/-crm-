/*
 * 网络咨询 数据表
 */
import React, { PropTypes } from 'react'
import {Table, Icon} from 'antd'
import TableColumnFilter from '../common/tableColumnFilter'
import {timestampToObject, getTableScrollY, activeFilterColor, inactiveFilterColor } from '../../utils'

function ConsultTable ({
  users, 
  usersFiltered, 
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
  onEmptyMobile,

  onSearch,

  nameText,
  onInputNameChange, 
  nameFilterVisible,
  onNameFilterVisibleChange, 
  onEmptyName,

  colOP,
  colCreateTime,
  colName,
  colMobile,
  colFlag,
  colFollowUserName,
  colKeyword,
  colWorkerName,
  colRemark,
  colSex,
  colGrade,
  colMajor,
  colEducation,
  colUniversity,
  colArea,
  colSearchPlatform,  
}) {
  let usersFilters = [];
  if (users) {
    usersFilters = users.map(e => {
      return {
        text: e.name,
        value: e._id
      };
    });
  }

  // 分配时间  姓名  手机号  类别  咨询师  关键字  接待客服  备注  性别  班型  专业  学历  学校  所在地  信息来源
  let columns = [];
  if (colOP) {
    columns.push({
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
      // width: '90px',
      width: '7em'      
    });
  }
  if (colCreateTime) {
    columns.push({
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
      // width: '90px',
      width: '13em'      
    });
  }
  if (colName) {
    columns.push({
      title: '姓名',
      dataIndex: 'name',
      // width: '80px',
      width: '8em',      
      filterDropdown: (
        <TableColumnFilter 
          value={nameText} 
          placeholder="输入姓名"
          onChange={onInputNameChange} 
          onPressEnter={onSearch} 
          onOk={onSearch} 
          onEmpty={onEmptyName}
        />
      ),
      filterIcon: <Icon type="search" style={{ color: nameText.length > 0 ? activeFilterColor : inactiveFilterColor }} />,
      filterDropdownVisible: nameFilterVisible,
      onFilterDropdownVisibleChange: onNameFilterVisibleChange
    })
  }
  if (colMobile) {
    columns.push({
      title: '手机号码',
      dataIndex: 'mobile',
      // width: '110px',
      width: '13em', 
      filterDropdown: (
        <TableColumnFilter 
          value={mobileText}
          placeholder="输入手机号"
          onChange={onInputMobileChange}
          onPressEnter={onSearch}
          onOk={onSearch}
          onEmpty={onEmptyMobile}
        />
      ),
      filterIcon: <Icon type="search" style={{ color: mobileText.length > 0 ? activeFilterColor : inactiveFilterColor }} />,
      filterDropdownVisible: mobileFilterVisible,
      onFilterDropdownVisibleChange: onMobileFilterVisibleChange      
    })
  }
  if (colFlag) {
    columns.push({
      title: '类别',
      dataIndex: 'flag',
      // width: '80px',
      width: '8em',      
    }); 
  }
  if (colFollowUserName) {
    columns.push({
      title: '咨询师',
      // width: '80px',
      width: '8em',      
      dataIndex: 'followUserName',
      filters: usersFilters, 
      filterMultiple: false, // 单选
      filteredValue: usersFiltered
    });
  }
  if (colKeyword) {
    columns.push({
      title: '关键字',
      dataIndex: 'keyword',
      // width: '80px',
      width: '8em',
    });
  }
  if (colWorkerName) {
    columns.push({
      title: '接待客服',
      dataIndex: 'workerName',
      // width: '80px',
      width: '8em',
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
    });
  }
  if (colRemark) {
    columns.push({
      title: '备注',
      dataIndex: 'remark',
      // width: '200px',
      width: '50em',      
      render(text, record, index) {
        return (
          <div style={{
            textAlign: 'left'
          }}>
            {text}
          </div>
        )
      }
    });
  }
  if (colSex) {
    columns.push({
      title: '性别',
      dataIndex: 'sex',
      width: '6em'
    });
  }
  if (colGrade) {
    columns.push({
      title: '班型',
      dataIndex: 'grade',
      width: '10em'
    });
  }
  if (colMajor) {
    columns.push({
      title: '专业',
      dataIndex: 'major',
      width: '10em'
    });
  }
  if (colEducation) {
    columns.push({
      title: '学历',
      dataIndex: 'education',
      width: '10em'
    });
  }
  if (colUniversity) {
    columns.push({
      title: '学校',
      dataIndex: 'university',
      width: '10em'
    });
  }
  if (colArea) {
    columns.push({
      title: '所在地区',
      dataIndex: 'area',
      // width: '110px',
      width: '11em',
    });
  }
  if (colSearchPlatform) {
    columns.push({
      title: '信息来源',
      dataIndex: 'searchPlatform',
      // width: '80px',
      width: '8em'
    });
  }

  return (
    <Table
      bordered
      style={{ marginTop: 15 }}        
      // scroll={{ y: getTableScrollY(600) }}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      onChange={onPageChange}
      pagination={pagination}
      simple
      rowKey={record => record._id}
    />
  )
}

export default ConsultTable