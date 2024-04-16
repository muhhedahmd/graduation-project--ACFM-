import * as React from 'react';

import { BarChart } from '@mui/x-charts/BarChart';
import { useMediaQuery } from '@mui/material';





export default function TickPlacementBars() {
  

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
      series={[
        { data: [35, 44, 24, 34 , 100] },
      ]}
      height={ isSm? 150:250}
      xAxis={[{ data: ['A', 'B', 'C',  "D", 'F' ], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
    </div>
  );
}