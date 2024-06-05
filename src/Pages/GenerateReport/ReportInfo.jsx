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


// [
//   {
//     studentsattending: 0,
//     studentscompleting: 0,
//     passed: 0,
//     totalUnenrolled: 0,
//     failed: 0
// }
//   ,
//     {
//       gradeA: 10,
//       gradeB: 10,
//       gradeC: 10,
//       gradeD: 10,
//       FGrade: 0
//   }
  
// ]
// )
const ReportInfo = forwardRef(({mainReportState ,setMainReportState}, ref) => {
    const isSm = useMediaQuery(theme=>theme.breakpoints.down("md"))

  const [participation, setParticipation] = useState({
    studentsattending: "",
    studentscompleting: "",
    passed: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setParticipation((prevParticipation) => ({
      ...prevParticipation,
      [id]: value,
    }));
    setMainReportState((prev)=>{
      return [
        {
          ...prev[0],
          [id]: value,
          failed: participation.studentscompleting - participation.passed
        },
        {
          ...prev[1],
        }
      ]
 
     })
console.log(mainReportState)


  };

  const calculateTotals = useMemo(() => {
    return () => {
      const { studentsattending, studentscompleting, passed } = participation;
      if (
        studentsattending !== "" &&
        studentscompleting !== "" &&
        passed !== "" &&
        !isNaN(studentsattending) &&
        !isNaN(studentscompleting) &&
        !isNaN(passed)
      ) {
        const students = parseInt(studentsattending);
        const enrolled = parseInt(studentscompleting);
        const passedx = parseInt(passed);
        if (students >= enrolled && students >= passedx) {
          const unenrolled = students - enrolled;
          const failed = enrolled - passedx;
       
          return { totalUnenrolled: unenrolled, failed: failed };


        }
      }

      return { totalUnenrolled: 0, failed: 0 };



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
          <StyledLabel htmlFor="studentsattending">Total Students</StyledLabel>
          <Input
            id="studentsattending"
            fullWidth
            className="borderAfter"
            placeholder="Enter total students"
            type="number"
            value={participation.studentsattending}
            onChange={handleChange}
          />
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel htmlFor="studentscompleting">Total Enrolled</StyledLabel>
          <Input
            id="studentscompleting"
            fullWidth
            placeholder="Enter total Enrolled"
            className="borderAfter"
            type="number"
            value={participation.studentscompleting}
            onChange={handleChange}
          />
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel htmlFor="passed">Total Passed</StyledLabel>
          <Input
            id="passed"
            fullWidth
            placeholder="Enter total Passed"
            className="borderAfter"
            type="number"
            value={participation.passed}
            onChange={handleChange}
          />
        </StyledFormGroup>
        <Typography variant="body1" component={"p"}>
          Total Unenrolled: {totals.totalUnenrolled}
        </Typography>
        <Typography variant="body1" component={"p"}>
          Total Failed: {totals.failed}
        </Typography>
      </form>
    </Box>
  );
});

export default ReportInfo;
