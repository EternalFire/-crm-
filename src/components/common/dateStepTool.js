/*
 * 日期组件: 
 *  < 日期 > 
 */
import React from 'react'
import {Icon} from 'antd'
import moment from 'moment'
import {dateFormat, monthFormat} from '../../utils'

export default class DateStepTool extends React.Component {
  state = {
    date: ''
  }

  componentDidMount() {
    const { type } = this.props;

    if (type === 'month') {
      this.setState({ date: moment().format(monthFormat) });
    } else {
      this.setState({ date: moment().format(dateFormat) });
    }
  }

  render() {
    const {date} = this.state;
    const {handlePrev, handleNext, type} = this.props;  

    return (
      <span>
        <a href="javascript:void(0)"
          onClick={() => {
            let dateString = '';

            if (type === 'month') {
              dateString = moment(date).add(-1, 'month').format(monthFormat);
            } else {
              dateString = moment(date).add(-1, 'days').format(dateFormat);
            }

            this.setState({
              date: dateString
            });

            if (handlePrev) {            
              handlePrev(dateString);
            }
          }}
        >
          <Icon type="left" />
        </a>
        <span style={{ color: 'red' }}>{date}</span>
        <a href="javascript:void(0)" 
          onClick={() => {
            const today = moment().valueOf();
            const dateValue = moment(date).add(1, 'days').valueOf();
            
            if (today < dateValue) {
              return
            }

            let dateString = '';

            if (type === 'month') {
              dateString = moment(date).add(1, 'month').format(monthFormat);
            } else {
              dateString = moment(date).add(1, 'days').format(dateFormat);
            }

            this.setState({
              date: dateString
            });
            
            if (handleNext) {
              handleNext(dateString);
            }
          }}
        >
          <Icon type="right" />
        </a>
      </span>
    )
  }
}