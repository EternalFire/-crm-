import React, { PropTypes } from 'react'
import { connect } from 'dva'
import CenterTable from '../components/center/centerTable'
import {center as CenterUtil} from '../utils'

function Center({location, dispatch, center}) {
  const { name, type, dayData, monthData, allData } = center

  const tableProps = {
    dataSource: dayData
  }

  const renderDayTable = () => {    
    return (
      <div>
        <div>dayData: </div>
        <CenterTable {...tableProps} />
      </div>
    )
  };
  const renderMonthTable = () => {
    return (
      <div>
        <div>monthData: </div>
        <pre>{JSON.stringify(monthData, null, 2)}</pre>
      </div>
    )
  };
  const renderAllTable = () => {
    return (
      <div> 
        <div>allData: </div>
        <pre>{JSON.stringify(allData, null, 2)}</pre>
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
