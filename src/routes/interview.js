import React from 'react'
import { connect } from 'dva'
import { center } from '../utils'
import QR from '../components/interview/qr'

function Interview({dispatch, interview}) {
  const {name, type, frontData} = interview

  const qrProps = {
    center: name,
    centerName: center.getCenterName(name)
  };

  const renderQR = () => {
    if (type === center.interviewType.qr) {
      return (<QR {...qrProps} />)
    }
    return null;
  }

  const renderInterviewTable = () => {
    if (type === center.interviewType.align) {
      return (
        <div>
          <h1>Interview</h1>
          <div>{type}</div>
          <pre>{JSON.stringify(frontData)}</pre>  
        </div>
      )
    }
    return null;
  }

  return (
    <div>
      {renderQR()}
      {renderInterviewTable()}
    </div>
  )
}

export default connect(({interview}) => ({interview}))(Interview)