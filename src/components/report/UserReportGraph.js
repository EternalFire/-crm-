/*
 * 中心咨询师分析图表
 *
 */
import React from 'react';
import HighCharts from 'react-highcharts';

// https://www.hcharts.cn/demo/highcharts

// 日初试 日复试 日预报 日转缴 日放款
// cs fs yb zj fk
const DayAmountGraph = React.createClass({
  render() {
    const { data } = this.props;
    const config = {
      chart: {
        //type: 'column'
      },
      credits: { enabled: false },
      title: {
        text: '中心咨询师 - 日统计'
      },
      // subtitle: {
      //   text: 'Source: WorldClimate.com'
      // },
      xAxis: {
        categories: data.map((e) => e.name),
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: '人数 (名)'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.f} 名</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: '日初试',
        data: data.map(e => e.cs)
      }, {
        name: '日复试',
        data: data.map(e => e.fs)
      }, {
        name: '日预报',
        data: data.map(e => e.yb)
      }, {
        name: '日转缴',
        data: data.map(e => e.zj)
      }, {
        name: '日放款',
        data: data.map(e => e.fk)
      }]
    };

    return (
      <div>
        <HighCharts config={config} />
      </div>
    );
  }
});

// 月初试 月复试 总预报 总转缴 总放款
// csOfM fsOfM ybOfM zjOfM fkOfM
const MonthAmountGraph = React.createClass({
  render() {
    const { data } = this.props;

    const config = {
      chart: {
        //type: 'column'
      },
      credits: { enabled: false },
      title: {
        text: '中心咨询师 - 月统计'
      },
      // subtitle: {
      //   text: 'Source: WorldClimate.com'
      // },
      xAxis: {
        categories: data.map((e) => e.name),
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: '人数 (名)'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.f} 名</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: '月初试',
        data: data.map(e => e.csOfM)
      }, {
        name: '月复试',
        data: data.map(e => e.fsOfM)
      }, {
        name: '总预报',
        data: data.map(e => e.ybOfM)
      }, {
        name: '总转缴',
        data: data.map(e => e.zjOfM)
      }, {
        name: '总放款',
        data: data.map(e => e.fkOfM)
      }]
    };

    return (
      <div>
        <HighCharts config={config} />
      </div>
    );
  }
});

// 总预报率  总预报转缴费率 总放款率
// ybRateOfM zjRateOfM fkRateOfM
const RateGraph = React.createClass({
  render() {
    const { data } = this.props;
    const config = {
      chart: {
        //type: 'column'
      },
      credits: { enabled: false },
      title: {
        text: '中心咨询师 - 比率统计'
      },
      // subtitle: {
      //   text: 'Source: WorldClimate.com'
      // },
      xAxis: {
        categories: data.map((e) => e.name),
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: '比率 (%)'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.2f} %</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: '总预报率',
        data: data.map(e => e.ybRateOfM)
      }, {
        name: '总预报转缴费率',
        data: data.map(e => e.zjRateOfM)
      }, {
        name: '总放款率',
        data: data.map(e => e.fkRateOfM)
      }]
    };

    return (
      <div>
        <HighCharts config={config} />
      </div>
    );
  }
});

export default React.createClass({
  render() {
    const {
      data: usersReportData,
    } = this.props;

    return (
      <div>
        <div>
          <DayAmountGraph data={usersReportData} />
        </div>
        <div>
          <MonthAmountGraph data={usersReportData} />
        </div>
        <div>
          <RateGraph data={usersReportData} />
        </div>
      </div>
    );
  }
});