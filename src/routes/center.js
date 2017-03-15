import React, { PropTypes } from 'react'
import { connect } from 'dva'

function Center({dispatch, center}) {
  return (
    <div>
      <pre>
        center
      </pre>
    </div>
  )
}

Center.propTypes = {
  admin: PropTypes.object
}

export default connect(({center}) => ({center}))(Center)
