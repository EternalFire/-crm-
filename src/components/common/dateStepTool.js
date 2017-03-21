/*
 * 日期组件: 
 *  < 日期 > 
 */
import React from 'react'
import {Icon} from 'antd'
import moment from 'moment'
import {dateFormat} from '../../utils'

export default class DateStepTool extends React.Component {
  state = {
    date: moment().format(dateFormat)
  }

  render() {
    const {date} = this.state;
    const {handlePrev, handleNext} = this.props;  

    return (
      <div>
        <a href="javascript:void(0)"
          onClick={() => {
            const dateString = moment(date).add(-1, 'days').format(dateFormat);

            this.setState({
              date: dateString
            })

            if (handlePrev) {            
              handlePrev(dateString)
            }
          }}
        >
          <Icon type="left" />
        </a>
        <span style={{ color: 'red' }}>{date}</span>
        <a href="javascript:void(0)" 
          onClick={() => {
            const today = moment().valueOf()
            const dateValue = moment(date).add(1, 'days').valueOf()
            
            if (today < dateValue) {
              return
            }

            const dateString = moment(date).add(1, 'days').format(dateFormat)

            this.setState({
              date: dateString
            })
            
            if (handleNext) {
              handleNext(dateString)
            }
          }}
        >
          <Icon type="right" />
        </a>
      </div>
    )
  }
}