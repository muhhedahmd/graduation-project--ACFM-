import React, { useState } from "react";
import StanderdBox from "../../Components/StanderdBox";
import InfoBoxes from "./InfoBoxes";
import { Box, Typography, useMediaQuery } from "@mui/material";
import TickPlacementBars from "./ChartReport";
import AddReport from "./AddReport";
import FilesTable from "../../Components/Dashbboard/FilesTable";
import { useReportFiles } from "../../Components/Contexts/ReportFileContext";

const GenerateReport = ({ page }) => {
  const { state } = useReportFiles();
  const [mainReportState , setMainReportState ]= useState( 
    [
      {
        totalStudents: 0,
        totalEnrolled: 0,
        totalPassed: 0,
        totalUnenrolled: 0,
        totalFailed: 0
    }
      ,
        {
          AGrade: 0,
          BGrade: 0,
          CGrade: 0,
          DGrade: 0,
          FGrade: 0
      }
      
    ]
  )
    const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const totalStudents = parseInt(mainReportState[0].totalStudents);
const totalEnrolled = parseInt(mainReportState[0].totalEnrolled);
const totalPassed = parseInt(mainReportState[0].totalPassed);
const totalUnenrolled = parseInt(mainReportState[0].totalUnenrolled);
const totalFailed = parseInt(mainReportState[0].totalFailed);
  return (
    <StanderdBox>
      <Box
        className="Holder"
        sx={{
          height: "100vh",
          width: "100%",
          margin: '.5rem 1rem 0 1rem ',
          display:"flex",
          justifyContent:"flex-start",
          alignItems:"flex-start",
          gap:".5rem",
          flexDirection:"column",
        }}
      >
        <Typography variant="h5" component={"p"} align="left">
          {page}
        </Typography>

        <Box
          sx={{
            height: "95vh",
            width: "100%",
            display: "flex",
            justifyContent:"flex-start",
            alignItems:"flex-start",
            flexDirection:"column",
            gap:"1rem",
          }}
        >
          <Box
            sx={{
              flexDirection: `${isSm ? "column" : "row"}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: `${isSm ? "95%" : "100%"}`,
              maxHeight:`${isSm ? '19%': "100%"}`,
              height: "auto",
              overflow: "auto",
              gap: ".5rem",
            }}
            className="infoBox-wrapper"
          >
          <InfoBoxes
    title={"Total Students"}
    percent={((totalStudents / totalStudents) * 100).toFixed(2) }
    value={totalStudents}
    key={"1"}
/>
<InfoBoxes
    title={"Total Enrolled"}
    percent={((totalEnrolled / totalStudents) * 100).toFixed(2)}
    value={totalEnrolled}
    key={"2"}
/>
<InfoBoxes
    title={"Total Not Enrolled"}
    percent={((totalUnenrolled / totalStudents) * 100).toFixed(2)}
    value={totalUnenrolled}
    key={"3"}
/>
<InfoBoxes
    title={"Total Passed"}
    percent={((totalPassed / totalStudents) * 100).toFixed(2)}
    value={totalPassed}
    key={"4"}
/>
<InfoBoxes
    title={"Total Failed"}
    percent={((totalFailed / totalStudents) * 100).toFixed(2)}
    value={totalFailed}
    key={"5"}
/>
          </Box>
          <Box
            className="chart-wrapper"
            sx={{
              borderRadius: "6px",
              width: `${isSm ? "    95%" : "100%"}`,
              padding: ".5rem",
              boxShadow: "3px 2px 4px #dedede",
              bgcolor: "#fff",
              // maxHeight:"49%",
              margin: `${isSm ? "1rem 0  00 0 " : "0"}`,
              height: `${isSm ? "25%" : "40%"}`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TickPlacementBars mainReportState={mainReportState}/>
          </Box>

          <Box
            className="Add-Report-wrapper"
            sx={{
              borderRadius: "6px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",

              height: "38%",
              flexDirection: `${isSm ? "column" : "row"}`,

              // padding:".5rem",
            }}
          >
            <Box
              sx={{
                // maxHeight:"100%",
                height: "90%",
                width: `${isSm ? "98%" : "80%"}`,
              }}
            >
              <FilesTable
                state={state?.StaticalFiles}
                Report={true}
                NoSearch={true}
              />
            </Box>

            <AddReport  mainReportState={mainReportState} setMainReportState={setMainReportState} />
          </Box>
        </Box>
      </Box>
    </StanderdBox>
  );
};

export default GenerateReport;
