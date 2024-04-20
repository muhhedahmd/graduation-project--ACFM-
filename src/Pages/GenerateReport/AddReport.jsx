import { Box, Typography, Button,  useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';

import { useState } from 'react';
import ReportDrawer from './ReportDrawer';

const AddReport = ({setMainReportState  ,mainReportState}) => {
  const [ReportDrawerState , setReportDrawerState  ] = useState(false)

  const isSm = useMediaQuery((theme)=> theme.breakpoints.down("md"))
  const theme = useTheme();




  return (
    <Box
      sx={{
        margin: `${isSm  ? ".5rem 0 0 0": ""}`,
    width: `${isSm  ? "95%" : "20%"}`,
    height: "90%",
        position: "relative",
        boxShadow: "3px 3px 4px #dedede",
    
      }}
    >
    

      <Button
      onClick={()=>setReportDrawerState(true)}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={
          <>

  

              <svg
              style={{
                width: "4.5rem",
    height: "6rem",
              }}
              
              >
            <path className='path1' d="M16.2031 47.9374H41.6451V53.8841H16.2031V47.9374Z" fill="#FF833D"/>
<path  className='path2 ' d="M16.2031 33.0707H54.3661V39.0174H16.2031V33.0707Z" fill="#FF833D"/>
<path className='path3' d="M16.2031 62.8041H32.1044V68.7508H16.2031V62.8041Z" fill="#FF833D"/>
<path className='path3' d="M63.9067 9.28391H54.366V6.31057C54.366 4.73341 53.6959 3.22085 52.503 2.10563C51.3102 0.990415 49.6924 0.363892 48.0055 0.363892H22.5635C20.8766 0.363892 19.2588 0.990415 18.066 2.10563C16.8731 3.22085 16.203 4.73341 16.203 6.31057V9.28391H6.66226C4.97535 9.28391 3.35753 9.91043 2.1647 11.0257C0.971879 12.1409 0.301758 13.6534 0.301758 15.2306V77.6707C0.301758 79.2479 0.971879 80.7604 2.1647 81.8757C3.35753 82.9909 4.97535 83.6174 6.66226 83.6174H63.9067C65.5937 83.6174 67.2115 82.9909 68.4043 81.8757C69.5971 80.7604 70.2672 79.2479 70.2672 77.6707V15.2306C70.2672 13.6534 69.5971 12.1409 68.4043 11.0257C67.2115 9.91043 65.5937 9.28391 63.9067 9.28391ZM22.5635 6.31057H48.0055V18.2039H22.5635V6.31057ZM63.9067 77.6707H6.66226V15.2306H16.203V24.1506H54.366V15.2306H63.9067V77.6707Z" fill="url(#paint0_linear_503_577)"/>
<defs>
<linearGradient id="paint0_linear_503_577" x1="27.7592" y1="56.1671" x2="0.54054" y2="36.5342" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF833D" />
<stop offset="1" stop-color="#FF833D"/>
</linearGradient>
</defs>
</svg>




          </>
        }
        sx={{
            display:"flex",
            justifyContent:"center"
            ,alignItems:"center",
            bgcolor:"transparent",
          borderRadius: "11px",
          position: "relative",
          width: "100%",
          height: "100%",
          boxShadow: "3px 3px 5px #dedede",
          background: theme.palette.background.paper,
          p: "0",
          '.path1':{
            transition:".3s"
          },


          ":hover , :focus": {
            bgcolor: "#fff",


        

          },
        }}
      >

        <Typography
          sx={{
            position: "absolute",
            color: "#333",
            top: "1rem",
            left: "1rem",
            fontSize: ".8rem",
            fontWeight: "bold",
            letterSpacing: ".5px",
          }}
          variant="caption"
          component={"p"}
        >
          Genrate Report 
        </Typography>
      </Button>
      
    
    <ReportDrawer mainReportState={mainReportState}  setMainReportState={setMainReportState}  open={ReportDrawerState} setReportDrawerState={setReportDrawerState}/>
    </Box>
  );
};

export default AddReport;
