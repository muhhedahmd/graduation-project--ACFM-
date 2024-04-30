import { Box } from '@mui/material'
import React from 'react'
import ReactApexChart from 'react-apexcharts';


const AcdamicYear = ({title}) => {
    var options = {
        series: [42, 47, 52, ],
        chart: {
          width: 200,
          type: 'polarArea'
        },
        markers: {
          labels: {
            style: {
              colors: ['#000000', '#000000', '#000000', '#000000', '#000000'] // Set your desired label colors
            }
          }
        },
        labels: ['Fall', 'Spring', 'summer'],
        fill: {
          opacity: 1,
          colors: ['#FF4F0F', '#ff6026', '#ff723e', '#ff8357', '#ff956f']
        },
        stroke: {
          width: 1,
          colors: ['#FF4F0F', '#ff6026', '#ff723e', '#ff8357', '#ff956f']
        },
        yaxis: {
          show: false
        },
        legend: {
          position: 'bottom',
          colors: ['#FF4F0F', '#ff6026', '#ff723e', '#ff8357', '#ff956f']

          
        },
        foreColor: '#ffffff'
,
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0
            },
            spokes: {
              strokeWidth: 0
            }
          }
        },
        theme: {
          monochrome: {
            enabled: true,
            shadeTo: 'light',
            shadeIntensity: 0.6
          }
        }
      };
      
  return (
    <Box
    sx={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"flex-start",
        width:"100%",
bgcolor:"#fff",
padding:"1rem",
boxShadow:"3px 3px 4px #dedede"
    }}
    >
{title}
<Box
sx={{
    'apexcharts-legend-marker':{
        background: '#222 !important'
    }
}}
>
<ReactApexChart 

options={options} series={options.series} type="polarArea" height={"100%"} />

</Box>
    </Box>
  )
}

export default AcdamicYear