import React from 'react'
import {Button, message} from 'antd'

function OutputTableButton({
}) {
  return (
    <Button onClick={() => {
      message.info('近期推出');
    }}>导出Excel</Button>
  )
}

export default OutputTableButton