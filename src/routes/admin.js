/*
 * 总部
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'

function Admin({dispatch, admin}) {
  return (
    <div>
      <pre>
      {JSON.stringify(admin.sureportData, null, 2)}
      </pre>
    </div>
  )
}

Admin.propTypes = {
  admin: PropTypes.object
}

export default connect(({admin}) => ({admin}))(Admin)
