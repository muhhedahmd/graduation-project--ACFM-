import * as React from 'react';

import { BarChart } from '@mui/x-charts/BarChart';
import { useMediaQuery } from '@mui/material';





export default function CoursesGraph({mainReportState}) {
  

  const isSm = useMediaQuery((theme)=> theme.breakpoints.down("md"))

  return (

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100%",
      padding:".5rem",
      background:"#fff",
      
       width:  `${ isSm? "95%":"100%"}` }}>

<BarChart

sx={{
  'rect':{
    height:"100%"
  }
  ,'.css-1vuxth3-MuiBarElement-root':{
    fill: '#ff5c00',
  }
}}
      series={[
        { data: [30 , 100 , 20 , 40 ,20 ,30 ] },

      ]
      
      }
      height={ isSm? 150:200}
      xAxis={[{ data: ['Course 1 ', 'course 2 ', 'course 3',  "course 4", 'course 5 ' , "course 6 " ], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      yAxis={[{ max: 100}]}
          />
    </div>
  );
}
