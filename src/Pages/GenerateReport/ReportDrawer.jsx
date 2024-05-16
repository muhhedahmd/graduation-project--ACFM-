import { Box, Drawer, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import ReportInfo from "./ReportInfo";
import ReportGrades from "./ReportGrades";
import { Close } from "@mui/icons-material";
import { StyledMainBtn } from "../../MainDrawer/style";
import { useRef } from "react";
import jsPDF from "jspdf";

const ReportDrawer = ({
  mainReportState,
  open,
  setReportDrawerState,
  setMainReportState,
}) => {
  const ReportInfoRef = useRef();
  const ReportGradesRef = useRef();
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const handleClick = () => {
    const reportInfoData = ReportInfoRef.current.participation();
    const reportGradesData = ReportGradesRef.current.getReportData();

    // Convert string values to numbers
    const totalStudents = parseInt(reportInfoData.totalStudents);
    const totalEnrolled = parseInt(reportInfoData.totalEnrolled);
    const totalPassed = parseInt(reportInfoData.totalPassed);

    // Convert grade values to numbers
    const AGrade = parseInt(reportGradesData.AGrade);
    const BGrade = parseInt(reportGradesData.BGrade);
    const CGrade = parseInt(reportGradesData.CGrade);
    const DGrade = parseInt(reportGradesData.DGrade);

    // Calculate FGrade
    const FGrade = -Math.max(
      0,
      totalEnrolled - (AGrade + BGrade + CGrade + DGrade)
    );
    // Validate the input data
    if (
      totalEnrolled <= totalStudents &&
      totalPassed <= totalEnrolled &&
      AGrade <= totalPassed &&
      BGrade <= totalPassed &&
      CGrade <= totalPassed &&
      DGrade <= totalPassed &&
      !isNaN(totalStudents) &&
      !isNaN(totalEnrolled) &&
      !isNaN(totalPassed) &&
      !isNaN(AGrade) &&
      !isNaN(BGrade) &&
      !isNaN(CGrade) &&
      !isNaN(DGrade)
    ) {
      // If all validations pass, update mainReportState
      setMainReportState([
        {
          ...reportInfoData,
          ...ReportInfoRef.current.totals,
        },
        {
          ...reportGradesData,

          FGrade: FGrade,
        },
      ]);

      const doc = new jsPDF();
      Object.keys(mainReportState[0]).map((key, i) =>
        doc.text(`${key}: ${mainReportState[0][key]}`, 10, i * 10, {
          align: "left",
          baseline: "top",
        })
      );

      Object.keys(mainReportState[1]).map((key, i) =>
        doc.text(`${key}: ${mainReportState[1][key]}`, 100, i * 10, {
          align: "left",
          baseline: "top",
        })
      );

      //  doc.save('example.pdf');
      // const pdfBlob = doc.output("blob");

      // Create a URL for the Blob
      // const pdfFile = new File([pdfBlob], "example.pdf", {
      //   type: "application/pdf",
      // });
      // uploadFile(pdfFile, uuidv4(), "report");
    } else {
      // Display an error message or take any other specified actions
      console.error("Invalid data. Please enter valid values.");
      // You can display an error message or take any other specified actions
    }
    console.log(mainReportState, FGrade);
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
          <ReportInfo ref={ReportInfoRef} />
          <ReportGrades ref={ReportGradesRef} />
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
          Create Report{" "}
        </StyledMainBtn>
      </Box>
    </Drawer>
  );
};

export default ReportDrawer;
