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

const ReportGrades = forwardRef((props, ref) => {
    const isSm = useMediaQuery(theme=>theme.breakpoints.down("md"))

  const [grades, setGrades] = useState({
    AGrade: "",
    BGrade: "",
    CGrade: "",
    DGrade: "",
    FGrade: "",
  });


  const handleChange = (e) => {
    const { id, value } = e.target;
    setGrades((prevGrades) => ({
      ...prevGrades,
      [id]: value,
    }));
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
          <StyledLabel htmlFor="AGrade">A Grade</StyledLabel>
          <Input
            id="AGrade"
            fullWidth
            className="borderAfter"
            placeholder="Enter total A Grade students"
            type="number"
            value={grades.AGrade}
            onChange={handleChange}
          />
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel htmlFor="BGrade">B Grade</StyledLabel>
          <Input
            id="BGrade"
            fullWidth
            className="borderAfter"
            placeholder="Enter total B Grade students"
            type="number"
            value={grades.BGrade}
            onChange={handleChange}
          />
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel htmlFor="CGrade">C Grade</StyledLabel>
          <Input
            id="CGrade"
            fullWidth
            className="borderAfter"
            placeholder="Enter total C Grade students"
            type="number"
            value={grades.CGrade}
            onChange={handleChange}
          />
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel htmlFor="DGrade">D Grade</StyledLabel>
          <Input
            id="DGrade"
            fullWidth
            className="borderAfter"
            placeholder="Enter total D Grade students"
            type="number"
            value={grades.DGrade}
            onChange={handleChange}
          />
        </StyledFormGroup>
   
      </form>
    </Box>
  );
});

export default ReportGrades;
