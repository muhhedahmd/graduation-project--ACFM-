import { Box, CircularProgress, Drawer, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import ReportInfo from "./ReportInfo";
import ReportGrades from "./ReportGrades";
import { Close } from "@mui/icons-material";
import { StyledMainBtn } from "../../MainDrawer/style";
import { useRef } from "react";
import { useCourseContext } from "../../Components/Contexts/CourseContexts";


const ReportDrawer = ({
  open,
  setReportDrawerState,
  setMainReportState,
  mainReportState,
  
}) => {
  const {MainDrawerCourse , editCourse ,EditLoader } = useCourseContext()
  const ReportInfoRef = useRef();
  const ReportGradesRef = useRef();
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  
      const handleClick = () => {


      const updataed = {
          ...MainDrawerCourse ,
          ...mainReportState[0],
        A: mainReportState[1].gradeA,
        B:  mainReportState[1].gradeB,
        C: mainReportState[1].gradeC,
        D : mainReportState[1].gradeD,
      }
        editCourse(MainDrawerCourse.courseid,updataed)
        
 

    
      };

  return (
    <Drawer
      onClose={() => setReportDrawerState(false)}
      variant="persistent"
      anchor="bottom"
      open={open}
    >
      <Box
        sx={{
          padding: "1rem 0 0 0",
          display: "flex",
          justifyContent: "flex-start",
          gap: "3rem",
          alignItems: "flex-start",
          position: "relative",
          height: `${isSm ? "100%" : "100vh"}`,
          width: "100vw",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: `${isSm ? "1rem 1.5rem" : "1rem 3rem"}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            style={{
              maxWidth: "2.2rem",
            }}
            alt="logo"
            src="/images/logo-o6u 1.png"
          />
          <Typography
            sx={{
              color: "#000",
            }}
            variant="h5"
            component={"p"}
            align="center"
          >
            Report Info
          </Typography>
          <Close
            onClick={() => setReportDrawerState(false)}
            sx={{
              fontSize: "1.7rem",
              cursor: "pointer",
              color: "#333",
            }}
          />
        </Box>
        <Box
          sx={{
            flexDirection: `${isSm ? "column" : "row"}`,
            display: "flex",
            justifyContent: "center",
            alignItems: `${isSm ? "center" : "flex-start"}`,
            position: "relative",
            width: "100vw",
            gap: "2rem",
          }}
        >
          
          <ReportInfo mainReportState={mainReportState} setMainReportState={setMainReportState} ref={ReportInfoRef} />
   
          <ReportGrades mainReportState={mainReportState} ref={ReportGradesRef} setMainReportState={setMainReportState}/>
          
        </Box>
        <StyledMainBtn
          onClick={handleClick}
          width={"63%"}
          sx={{
            alignSelf: "center",
            // margin:"1rem 0 0 0",
            color: "#fff",
          }}
          variant="contained"
          color="primary"
        >
         {EditLoader ? <CircularProgress 
    sx={{
            alignSelf: "center",
            // margin:"1rem 0 0 0",
            color: "#fff",
          }}

         />:" Create Report"}
        </StyledMainBtn>
      </Box>
    </Drawer>
  );
};

export default ReportDrawer;
