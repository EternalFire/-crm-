import React, { PropTypes } from 'react'
import { connect } from 'dva'

function Center({location, dispatch, center}) {
  return (
    <div>

      <div>
        <div>dayData: </div>
        <pre>{JSON.stringify(center.dayData, null, 2)}</pre>
      </div>
      <div>
        <div>monthData: </div>
        <pre>{JSON.stringify(center.monthData, null, 2)}</pre>
      </div>
      <div>
        <div>allData: </div>
        <pre>{JSON.stringify(center.allData, null, 2)}</pre>
      </div>
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
