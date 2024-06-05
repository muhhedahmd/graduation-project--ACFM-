import * as React from 'react';

import { BarChart } from '@mui/x-charts/BarChart';
import { useMediaQuery } from '@mui/material';
import { useCourseContext } from '../../Components/Contexts/CourseContexts';





export default function TickPlacementBars({totalFailed}) {
  const {MainDrawerCourse} = useCourseContext()  
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
        { data: [MainDrawerCourse?.gradeA, MainDrawerCourse?.gradeB, MainDrawerCourse?.gradeC, MainDrawerCourse?.gradeD , totalFailed] },

      ]
   
      
      
      }
      height={ isSm? 150:235}
      xAxis={[{ data: ['A', 'B', 'C',  "D", 'F' ], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      yAxis={[{ max: MainDrawerCourse?.studentsattending }]}
          />
    </div>
  );
}
