import { WrapperFlexBox } from './Style';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Typography from '@mui/material/Typography';

const CourseProgress = () => {
    const options = {
        series: [60],
        chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
           hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 3,
              opacity: 0.2
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: .1
            }
          },
      
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px'
            },
            value: {
              formatter: function(val) {
                return parseInt(val);
              },
              color: '#111',
              fontSize: '36px',
              show: true,
            }
          }
        }
      },
      fill: {
        type: 'solid',
        colors: ['#ff5c00']
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Math 123hc'],
      };


  return (
    <WrapperFlexBox
      sx={{
        bgcolor: '#fff',
        boxShadow: '3px 3px 4px #dedede',
        borderRadius: '6px',
        padding: '.1rem',
        flexDirection: 'column',
      }}
    >
      <Typography>Course Progress</Typography>
      <div id="chart">
        <ReactApexChart options={options} series={options.series} type="radialBar" height={250} />
      </div>
    </WrapperFlexBox>
  );
};

export default CourseProgress;
