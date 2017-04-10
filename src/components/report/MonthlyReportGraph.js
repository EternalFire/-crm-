/*
 * 月度数据汇总图表
 *
 */
import React from 'react';
import HighCharts from 'react-highcharts';

// 输入:
//   var data = [{"titileName":"简历上门","date01":22,"date02":19,"date03":0,"date04":0,"date05":0,"date06":0,"date07":0,"date08":0,"date09":0,"date10":0,"date11":0,"date12":0,"date13":0,"date14":0,"date15":0,"date16":0,"date17":0,"date18":0,"date19":0,"date20":0,"date21":0,"date22":0,"date23":0,"date24":0,"date25":0,"date26":0,"date27":0,"date28":0,"date29":0,"date30":0,"date31":0}]
//   getDays(data)
// 输出:
//   ["01","02","03", ... , "31"]
//
// data 从 MonthReport(report.js) 获得, index 默认 0
const getDays = (data, index) => {
  const field = 'date';
  let i = 0;

  if (index) {
    i = index;
  }

  let object
  if (data && data[i]) {
    object = data[i]
  } else{
    object = Array.from({ length: 31 }).map((e, i) => {
      if ( i < 10 ) {
        return '0' + i
      }

      return i + ""
    })
  } 

  return Object.keys(object)
    .map((key) => {
      if (key.includes(field)) {
        return key.substr(field.length);
      }
    })
    .filter(e => e)
    .sort((a, b) => {
      return Number(a) - Number(b);
    });
};

// 获取 data[index]的 从 "date01" 到 "date31" 的属性值
const getValues = (data, index) => {
  const field = 'date';
  const object = data[index];

  if (object) {
    return getDays(data).map((key) => {
      return Number(object[field + key]);
    });
  }
  return [];
};

// 简历上门  市场上门 预报量 转缴量 放款量
// data index:
//    0       1       2     3    4
const AmountGraph = React.createClass({
  render() {
    const { data } = this.props;
    const config = {
      chart: {
        //type: 'column'
      },
      credits: { enabled: false },
      title: {
        text: '月度数据汇总 - 数量统计'
      },
      // subtitle: {
      //   text: 'Source: WorldClimate.com'
      // },
      xAxis: {
        categories: getDays(data),
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
        name: '简历上门',
        data: getValues(data, 0)
      }, {
        name: '市场上门',
        data: getValues(data, 1)
      }, {
        name: '预报量',
        data: getValues(data, 1)
      }, {
        name: '转缴量',
        data: getValues(data, 2)
      }, {
        name: '放款量',
        data: getValues(data, 3)
      }]
    };

    return (
      <div>
        <HighCharts config={config} />
      </div>
    );
  }
});

// 预报率(%) 转缴率(%) 放款率(%)
//    5       6       7
const RateGraph = React.createClass({
  render() {
    const { data } = this.props;
    const config = {
      chart: {
        //type: 'column'
      },
      credits: { enabled: false },
      title: {
        text: '月度数据汇总 - 比率统计'
      },
      // subtitle: {
      //   text: 'Source: WorldClimate.com'
      // },
      xAxis: {
        categories: getDays(data),
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
        name: '预报率',
        data: getValues(data, 5)
      }, {
        name: '转缴率',
        data: getValues(data, 6)
      }, {
        name: '放款率',
        data: getValues(data, 7)
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
    const { data: momthReportData } = this.props;    

    return (
      <div>
        <div>
          <AmountGraph data={momthReportData} />
        </div>
        <div>
          <RateGraph data={momthReportData} />
        </div>
      </div>
    );
  }
});