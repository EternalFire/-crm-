/*
 * 总部 - 数据分析
 */
import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import AdminReportComponent from '../components/report/adminReport'
import AdminReportTool from '../components/report/adminReportTool'
import {center, authority} from '../utils'

function AdminReport({dispatch, admin, loading, user}) {
  // 权限判断
  if (!authority.checkCenter(center.admin, 'currentType', user)) {
    dispatch(routerRedux.push({ pathname: '/' }));
    return (<div></div>);
  }

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
  ({ admin, loading, app }) => ({ admin, loading: loading.global, user: app.user })
)(AdminReport)