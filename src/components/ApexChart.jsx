import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Apex = ({dataChart}) => {
  var dataNumber = [1, 2, 3, 4, 5, 10, 12, 9, 8, 10, 7, 6]
  if(dataChart){
  dataChart.sort((a, b) => a.Month - b.Month);
  const check = dataChart.some((element) => element.Profit > 0);
  if(check) {
    dataNumber = dataChart.map((n) => n.Profit) 
  }
  }
  const series = [
    {
      name: 'Net Profit',
      data: dataNumber
    }
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      // title: {
      //   text: '$ (thousands)'
      // }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return '$ ' + val + ' thousands';
        }
      }
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={400} />
    </div>
  );
};

export default Apex;
