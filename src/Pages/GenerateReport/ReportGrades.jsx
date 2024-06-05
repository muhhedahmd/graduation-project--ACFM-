import { Box, Input, FormGroup, FormLabel, Typography, useMediaQuery } from "@mui/material";
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
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

const ReportGrades = forwardRef(({mainReportState , setMainReportState}, ref) => {
    const isSm = useMediaQuery(theme=>theme.breakpoints.down("md"))

  const [grades, setGrades] = useState({
    gradeA: "",
    gradeB: "",
    gradeC: "",
    gradeD: "",
    gradeF: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setGrades((prevGrades) => ({
      ...prevGrades,
      [id]: value,
    }));
    setMainReportState((prev)=>{
      return [
        {
          ...prev[0]
        },
        {
          ...prev[1],
          [id]: value,
        }
      ]
 
     })
console.log(mainReportState)

  };

  useImperativeHandle(
    ref,
    () => {
      return {
        getReportData: () => grades,
      };
    },
    [grades]
  );

  return (
    <Box
      sx={{
      
        width: `${!isSm ?  "30%":"62%"}`,
      }}
    >
      <Typography color={"#222"} align="left" variant="h6" component={"p"}>
        Students Grade
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
          <StyledLabel htmlFor="gradeA">A Grade</StyledLabel>
          <Input
            id="gradeA"
            fullWidth
            className="borderAfter"
            placeholder="Enter total A Grade students"
            type="number"
            value={grades.gradeA}
            onChange={handleChange}
          />
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel htmlFor="gradeB">B Grade</StyledLabel>
          <Input
            id="gradeB"
            fullWidth
            className="borderAfter"
            placeholder="Enter total B Grade students"
            type="number"
            value={grades.gradeB}
            onChange={handleChange}
          />
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel htmlFor="gradeC">C Grade</StyledLabel>
          <Input
            id="gradeC"
            fullWidth
            className="borderAfter"
            placeholder="Enter total C Grade students"
            type="number"
            value={grades.gradeC}
            onChange={handleChange}
          />
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel htmlFor="gradeD">D Grade</StyledLabel>
          <Input
            id="gradeD"
            fullWidth
            className="borderAfter"
            placeholder="Enter total D Grade students"
            type="number"
            value={grades.gradeD}
            onChange={handleChange}
          />
        </StyledFormGroup>
   
      </form>
    </Box>
  );
});

export default ReportGrades;
