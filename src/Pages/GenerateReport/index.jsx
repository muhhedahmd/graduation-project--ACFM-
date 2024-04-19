import React from 'react'
import StanderdBox from '../../Components/StanderdBox'
import InfoBoxes from './InfoBoxes'
import { Box, Typography, useMediaQuery } from '@mui/material'
import TickPlacementBars from './ChartReport'
import AddReport from './AddReport'
import FilesTable from '../../Components/Dashbboard/FilesTable'

const GenerateReport = ({page}) => {
  const isSm = useMediaQuery((theme)=> theme.breakpoints.down("md"))
  return (
    <StanderdBox>
    <Box
         className="Holder"
         sx={{
   
           height:"100vh",
           width:"100vw",
           margin:"1.5rem 1rem 1rem 1rem "
         }}
       >
       <Typography
       variant='h5'
       component={"p"}
       align='left'
       >
   {page}
       </Typography>
   
   <Box
   sx={{
    height:"95vh",
        width:"auto",
   }}>
   
       <Box
   
       sx={{
   
         flexDirection:`${isSm ?"column" :"row" }`,
         display:"flex",
         justifyContent:"space-between",
         alignItems:"flex-start",
         width:`${isSm  ? "95%"  :"100%"}`,
         maxHeight:"24%",
         overflow:"auto",
         gap:".5rem"
     
       }}
       className="infoBox-wrapper"
       >
           <InfoBoxes 
       title={"total Student"}
       // icon={<InsertEmoticonSharp/>}
       value={"100"}
       key={"1"}
   
         />
           <InfoBoxes 
       title={"total enorled"}
       // icon={<InsertEmoticonSharp/>}
       value={"98"}
       key={"2"}
   
         />
         <InfoBoxes 
       title={"total not enorled"}
       // icon={<InsertEmoticonSharp/>}
       value={"2"}
       key={"2"}
   
         />
         <InfoBoxes 
       title={"total pass"}
       // icon={<InsertEmoticonSharp/>}
       value={"10"}
       key={"1"}
   
         />
         <InfoBoxes 
       title={"total failed"}
       // icon={<InsertEmoticonSharp/>}
       value={"90"}
       key={"1"}
   
         />
   
       </Box>
       <Box
       className="chart-wrapper"
       sx={{
         borderRadius:"6px",
           width:`${isSm ?"    95%" : "100%"}`,
           padding:".5rem",
           boxShadow:"3px 2px 4px #dedede",
           bgcolor:"#fff",
           margin:"1rem 0 0 0",
         // maxHeight:"49%",
         height: `${isSm ? "25%" : "40%"}`,
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
   
       }}
       >
   
       <TickPlacementBars/>
   
   
       </Box>
       <Box
       className="Add-Report-wrapper"
       sx={{
         borderRadius:"6px",
         margin:"1rem 0 ",
           width:"100%",
           display:"flex",
           justifyContent:"space-between",
           alignItems:"flex-start",
   
           height: "31%",
           flexDirection:`${isSm ? "column" : "row"}`
   
           // padding:".5rem",
       
       }}
       >
   
   <Box
   sx={{
     // maxHeight:"100%",
     height: "90%",
     width:`${isSm ? "98%" : "80%"}`
   
   }}
   >
   
   <FilesTable state={null}  Report={true} NoSearch={true}/>
   
   </Box>
         
         <AddReport/>
   
       
   
   
       </Box>
   
     
   </Box>
   
       </Box>
       </StanderdBox>
  )
}

export default GenerateReport