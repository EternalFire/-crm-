import React from 'react'
import {Spin} from 'antd'

function SpinWrapper({loading, children}) {
  return (
    <Spin spinning={loading} tip='加载中...'>
      {children}
    </Spin>
  )
}

export default SpinWrapper;