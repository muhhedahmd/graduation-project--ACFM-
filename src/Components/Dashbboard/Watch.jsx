import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const data = [
  { value: 10, label: 'A' },
  { value: 2, label: 'b' },
];

const size = {

  
  width: "420",
   

  height: "300",

};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function Watch() {

  return (
    <Box
    sx={{
      background: '#fff', // Set background to #fff
      width:"100%",
      height:"100%",
      boxShadow:"3px 3px 5px #dedede",
      borderRadius:"11px",
      padding: "0 1rem 0 0",
    margin: "0 8px 5px 3px",
    }}
    >

    <PieChart
      sx={{
        background: 'transparent', // Set background tof
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
    
      }}
      margin={{
    left: -100,
    right: 20,
    top: 100,
    bottom: 24,
  }}
      
      viewBox='32 0 440 201'
      series={[{ data, innerRadius: 80 }]}
      {...size}

    > 
      
      <PieCenterLabel>Category</PieCenterLabel>
    </PieChart>
    </Box>
  );
}
