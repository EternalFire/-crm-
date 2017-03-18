import React, { PropTypes } from 'react'
import { connect } from 'dva'
import CenterTable from '../components/center/centerTable'
import {center as CenterUtil} from '../utils'

function Center({location, dispatch, center}) {
  const { name, type, dayData, monthData, allData } = center

  const tableProps = {
  }

  const renderDayTable = () => {
    tableProps.dataSource = dayData

    return (
      <div>
        <div>dayData: </div>
        <CenterTable {...tableProps} />
      </div>
    )
  };
  const renderMonthTable = () => {
    tableProps.dataSource = monthData

    return (
      <div>
        <div>monthData: </div>
        <CenterTable {...tableProps} />
      </div>
    )
  };
  const renderAllTable = () => {
    tableProps.dataSource = allData

    return (
      <div> 
        <div>allData: </div>
        <CenterTable {...tableProps} />
      </div>    
    )
  };

  const renderObject = {}
  renderObject[CenterUtil.type.day] = renderDayTable
  renderObject[CenterUtil.type.month] = renderMonthTable
  renderObject[CenterUtil.type.all] = renderAllTable
  
  return (
    <div>
      {renderObject[type] ? renderObject[type]() : CenterUtil.getCenterName(name)}
    </div>
  )
}

Center.propTypes = {
  center: PropTypes.object
}

function mapStateToProps(state) {
  const { center } = state
  return { center }
}

export default connect(mapStateToProps)(Center)
