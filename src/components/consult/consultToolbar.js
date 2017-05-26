/*
 * 网络咨询 工具栏
 */
import React from 'react'
import {Card, DatePicker, Switch} from 'antd'
import OutputTableButton from '../common/outputTableButton'
import {dateFormat, center} from '../../utils'
import moment from 'moment'

const { RangePicker } = DatePicker;

function ConsultToolbar({
  onChangeSearchDate,
  onChangeColVisible,

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
  colSearchPlatform
}) {
  function handleSwitchChange(prop) {
    return function (checked) {      
      onChangeColVisible(prop, checked);
    }
  }

  function renderColSwitch(text, value, prop) {
    return (
      <Switch style={{ marginRight: "10px" }} 
        checked={value} 
        onChange={handleSwitchChange(prop)} 
        checkedChildren={text} 
        unCheckedChildren={text} 
      />
    );
  }

  return (
    <Card>
      <RangePicker format={dateFormat}
        defaultValue={[ moment(), moment() ]}
        onChange={onChangeSearchDate}
      />
      <OutputTableButton />
      <div style={{ marginTop: "10px" }}>
        筛选列: &nbsp;
        {renderColSwitch('操作', colOP, 'colOP')}
        {renderColSwitch('姓名', colName, 'colName')}
        {renderColSwitch('手机', colMobile, 'colMobile')}
        {renderColSwitch('类别', colFlag, 'colFlag')}
        {renderColSwitch('咨询师', colFollowUserName, 'colFollowUserName')}
        {renderColSwitch('关键字', colKeyword, 'colKeyword')}
        {renderColSwitch('接待客服', colWorkerName, 'colWorkerName')}
        {renderColSwitch('备注', colRemark, 'colRemark')}
        {renderColSwitch('性别', colSex, 'colSex')}
        {renderColSwitch('班型', colGrade, 'colGrade')}
        {renderColSwitch('专业', colMajor, 'colMajor')}
        {renderColSwitch('学历', colEducation, 'colEducation')}
        {renderColSwitch('学校', colUniversity, 'colUniversity')}
        {renderColSwitch('所在地区', colArea, 'colArea')}
        {renderColSwitch('信息来源', colSearchPlatform, 'colSearchPlatform')}
      </div>
    </Card>
  )
}

export default ConsultToolbar
