import * as React from 'react';
import { Box, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';







export default function Watch({FileState}) {
  const FileStateLen = FileState ? FileState.length : 0
  
  const options = {
    series: [FileStateLen * 10],

    chart: {
    height: 150,
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
        size: '80%',
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
    <Box
    sx={{
      background: '#fff', // Set background to #fff
      width:"100%",
      height:"100%",
      boxShadow:"3px 3px 5px #dedede",
      borderRadius:"11px",
      padding: ".5rem",
      display:"flex",
      justifyContent:"flex-start",
      alignItems:"flex-start",
      gap:"1rem",
      flexDirection:"column",
    margin: "0 8px 5px 3px",
    }}
    >

<Typography
textAlign={"left"}

>Course Progress</Typography>
      <div
      style={{
        alignSelf:"center"
      }} 
    
      
       id="chart">
        <ReactApexChart options={options} series={options.series} type="radialBar" height={200} />
      </div>
    </Box>
  );
}

