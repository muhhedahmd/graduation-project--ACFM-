import { Box, Input, FormGroup, FormLabel, Typography, useMediaQuery } from "@mui/material";
import React, { useState, forwardRef, useImperativeHandle, useMemo } from "react";
import styled from "styled-components";

const StyledFormGroup = styled(FormGroup)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
}));

const StyledLabel = styled(FormLabel)(() => ({
  color: "#333",
}));

const ReportInfo = forwardRef((props, ref) => {
    const isSm = useMediaQuery(theme=>theme.breakpoints.down("md"))

  const [participation, setParticipation] = useState({
    totalStudents: "",
    totalEnrolled: "",
    totalPassed: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setParticipation((prevParticipation) => ({
      ...prevParticipation,
      [id]: value,
    }));
  };

  const calculateTotals = useMemo(() => {
    return () => {
      const { totalStudents, totalEnrolled, totalPassed } = participation;
      if (
        totalStudents !== "" &&
        totalEnrolled !== "" &&
        totalPassed !== "" &&
        !isNaN(totalStudents) &&
        !isNaN(totalEnrolled) &&
        !isNaN(totalPassed)
      ) {
        const students = parseInt(totalStudents);
        const enrolled = parseInt(totalEnrolled);
        const passed = parseInt(totalPassed);
        if (students >= enrolled && students >= passed) {
          const unenrolled = students - enrolled;
          const failed = students - passed;
          return { totalUnenrolled: unenrolled, totalFailed: failed };
        }
      }
      return { totalUnenrolled: 0, totalFailed: 0 };
    };
  }, [participation]);

  const totals = calculateTotals();

  useImperativeHandle(ref, () => ({
    participation : ()=>participation,
    totals: totals,
  }));

  return (
    <Box
      sx={{
        width: `${!isSm ?  "30%":"62%"}`,
      }}
    >
      <Typography color={"#222"} align="left" variant="h6" component={"p"}>
        Student Participation
      </Typography>
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "2.2em",
          margin: ".5rem 0",
          height: "84%",
        }}
      >
        <StyledFormGroup>
          <StyledLabel htmlFor="totalStudents">Total Students</StyledLabel>
          <Input
            id="totalStudents"
            fullWidth
            className="borderAfter"
            placeholder="Enter total students"
            type="number"
            value={participation.totalStudents}
            onChange={handleChange}
          />
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel htmlFor="totalEnrolled">Total Enrolled</StyledLabel>
          <Input
            id="totalEnrolled"
            fullWidth
            placeholder="Enter total Enrolled"
            className="borderAfter"
            type="number"
            value={participation.totalEnrolled}
            onChange={handleChange}
          />
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel htmlFor="totalPassed">Total Passed</StyledLabel>
          <Input
            id="totalPassed"
            fullWidth
            placeholder="Enter total Passed"
            className="borderAfter"
            type="number"
            value={participation.totalPassed}
            onChange={handleChange}
          />
        </StyledFormGroup>
        <Typography variant="body1" component={"p"}>
          Total Unenrolled: {totals.totalUnenrolled}
        </Typography>
        <Typography variant="body1" component={"p"}>
          Total Failed: {totals.totalFailed}
        </Typography>
      </form>
    </Box>
  );
});

export default ReportInfo;
