import React from 'react'
import { connect } from 'dva'

function Interview({dispatch, interview}) {
  return (
    <div>
      <h1>Interview</h1>
      <div>{interview.type}</div>
      <pre>{JSON.stringify(interview.frontData)}</pre>
    </div>
  )
}

export default connect(({interview}) => ({interview}))(Interview)