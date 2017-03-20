/*
 * 总部
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import AdminReport from '../components/report/adminReport'

function Admin({dispatch, admin}) {
  const {sureportData, date} = admin;

  const adminReportProps = {
    dataSource: sureportData,
    date: date
  }

  return (
    <div>
      <AdminReport {...adminReportProps} />
    </div>
  )
}

Admin.propTypes = {
  admin: PropTypes.object
}

export default connect(({admin}) => ({admin}))(Admin)
