import * as React from 'react';

import { BarChart } from '@mui/x-charts/BarChart';
import { useMediaQuery } from '@mui/material';





export default function TickPlacementBars({mainReportState}) {
  

  const isSm = useMediaQuery((theme)=> theme.breakpoints.down("md"))

  return (

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100%",
      padding:".5rem",
      
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
        { data: [mainReportState[1].AGrade, mainReportState[1].BGrade, mainReportState[1].CGrade, mainReportState[1].DGrade , -mainReportState[1].FGrade] },

      ]
      
      }
      height={ isSm? 150:235}
      xAxis={[{ data: ['A', 'B', 'C',  "D", 'F' ], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      yAxis={[{ max: mainReportState[0].totalStudents }]}
          />
    </div>
  );
}
