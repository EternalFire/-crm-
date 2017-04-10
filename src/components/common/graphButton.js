/*
 * 打开统计图表的按钮
 */
import React from 'react'
import {Icon} from 'antd'

const GraphButton = ({handleClick}) => {
  return (
    <a href="javascript:void(0)"
      onClick={() => {
        if (handleClick) {
          handleClick()
        }
      }}>
      <Icon type="area-chart" />
    </a>
  )
}

export default GraphButton