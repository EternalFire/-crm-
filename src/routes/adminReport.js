/*
 * 总部
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import AdminReportComponent from '../components/report/adminReport'
import AdminReportTool from '../components/report/adminReportTool'

function AdminReport({dispatch, admin, loading}) {
  const {sureportData, date} = admin;

  const adminReportProps = {
    dataSource: sureportData,
    date: date,
    pagination: false,
    loading: loading
  }

  const adminReportToolProps = {
    title: '全国各校区每日数据汇总报表',
    handleShowGraph() {

    },
    handleDateChange(date, dateString) {
      dispatch({ type: 'admin/setDate', payload: { date: dateString } });
      dispatch({ type: 'admin/query' });
    }
  }

  return (
    <div>
      <AdminReportTool {...adminReportToolProps} />
      <AdminReportComponent {...adminReportProps} />
    </div>
  )
}

// AdminReport.propTypes = {
//   admin: PropTypes.object
// }

export default connect(
  ({ admin, loading }) => ({ admin, loading: loading.global })
)(AdminReport)