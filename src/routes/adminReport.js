/*
 * 总部
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import AdminReportCom from '../components/report/adminReport'
import AdminReportTool from '../components/report/adminReportTool'

function AdminReport({dispatch, admin}) {
  const {sureportData, date} = admin;

  const adminReportProps = {
    dataSource: sureportData,
    date: date
  }

  const adminReportToolProps = {
    title: '全国各校区每日数据汇总报表',
    handleShowGraph() {

    },
    handleDateChange() {

    }
  }

  return (
    <div>
      <AdminReportTool {...adminReportToolProps} />
      <AdminReportCom {...adminReportProps} />
    </div>
  )
}

AdminReport.propTypes = {
  admin: PropTypes.object
}

export default connect(({admin}) => ({admin}))(AdminReport)
