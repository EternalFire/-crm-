
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import ConsultTable from '../components/center/consultTable'

function Consult({dipatch, consult}) {
  const consultTableProps = {
    dataSource: consult.data
  }

  return (
    <div>
      <ConsultTable {...consultTableProps} />
    </div>
  );
}

export default connect(({consult}) => ({consult}))(Consult)