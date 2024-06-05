import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,

  

  Typography,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { StyledFormGroup } from "./Style";
import { processedCourses } from "../../Components/Semsterdata";
import AutoCompleteUsers from "./AutoCompleteUsers";

const CoursesOfSemester = ({
  setCheckedCourses,
  setSemesterState,
}) => {
  const [SelectedSate, setSelectedSate] = useState(processedCourses);

  const [isClear, SetIsClear] = useState(false);

  const handleCheck = (code) => {
    setSelectedSate((prevCourses) => {
      const updatedCourses = prevCourses.map((item) =>
        item.code === code ? { ...item, checked: !item.checked } : item
      );

      const filteredCourses = updatedCourses.filter((course) => course.checked);

      setCheckedCourses(filteredCourses);

      setSemesterState((prev) => ({
        ...prev,
        courses: filteredCourses,
      }));

      return updatedCourses;
    });
  };
  const handleSelectAll = () => {
    const allChecked = SelectedSate.every((item) => item.checked); // Check if all items are already checked
  
    const updatedCourses = SelectedSate.map((item) => ({
      ...item,
      checked: !allChecked, // Toggle the checked property based on whether all are already checked or not
    }));
  
    // Filter out the courses that are checked
    const filteredCourses = updatedCourses.filter((course) => course.checked);
  
    // Update the state with the checked courses
    setCheckedCourses(filteredCourses);
  
    setSelectedSate(updatedCourses);
  };
  
  

  const theme = useTheme();
  return (
    <Box
      sx={{
        height: " 60vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        width: "100%",
        borderRadius: "6px",

        bgcolor: "#fff",
        boxShadow: "3px 3px 3px #dedede",
        padding: "1rem",
        overflow: "auto",
      }}
      margin={"1rem  0 0 0"}
      className="HolderUsers&Courses"
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <AutoCompleteUsers
          HandleSelectAll={handleSelectAll}
          SelectedSate={SelectedSate}
          setSelectedSate={setSelectedSate}
          isClear={isClear}
          SetIsClear={SetIsClear}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Button sx={{ minWidth: 0 }}>
            <Clear
              onClick={() => SetIsClear(true)}
              sx={{ color: theme.palette.primary.paper }}
            />
          </Button>
        </Box>
      </Box>
      <StyledFormGroup
        sx={{
          overflow: "auto",

          width: "100% !important",
        }}
      >
{SelectedSate?.map((itemC) => (
  <Box
    key={`course-${itemC.code}`}
    sx={{
      width: "98%",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    }}
  >
    <FormControlLabel
  onChange={() => handleCheck(itemC.code)} // Correctly calling handleCheck

      control={
 <Checkbox 
 type="checkbox"
  id={itemC.code}
  checked={itemC.checked}

  style={{
    transition:".3s",
    color: itemC.checked ? "#ff5c00" : "#545454",


  }}
/> 

      }
      label={
        <Typography
          variant="subtitle2"
          sx={{
    transition:".3s",

            cursor: "pointer",
            color: itemC.checked ? "#ff5c00" : "#545454",
          }}
          // onClick={() => handleCheck(itemC.code)}
        >
          {`${itemC.name} ${itemC.code}`}
        </Typography>
      }
    />
  </Box>
))}


      </StyledFormGroup>
    </Box>
  );
};

export default CoursesOfSemester;

