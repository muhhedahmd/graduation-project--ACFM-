import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box, Button, FormControlLabel, Radio, RadioGroup, Typography, Checkbox } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { useCourseContext } from "../../Components/Contexts/CourseContexts";
import { useAcademicYear } from "../../Components/Contexts/AcadmicYearContext";



export default function SortPopoverGlobal({ AllCoursesStateCheced,setSelectedSate, SelectedSate }) {
    const {academicYears} =useAcademicYear()
  const { AllCourses } = useCourseContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedLevel, setSelectedLevel] = React.useState("");
  const [selectedSemesters, setSelectedSemesters] = React.useState([]);
  const [selectedYear, setSelectedYear] = React.useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRadioChange = (event) => {
    const level = event.target.value;
    setSelectedLevel(level);
    setSelectedSemesters([]);

    filterCourses(level, selectedSemesters, selectedYear);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    let updatedSemesters = [...selectedSemesters];

    if (checked) {
      if (!updatedSemesters.includes(name)) {
        updatedSemesters.push(name);
      }
    } else {
      updatedSemesters = updatedSemesters.filter((semester) => semester !== name);
    }

    setSelectedSemesters(updatedSemesters);

    filterCourses(selectedLevel, updatedSemesters, selectedYear);
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);

    filterCourses(selectedLevel, selectedSemesters, year);
  };

  const filterCourses = (level, semesters, year) => {
    let filteredCourses = AllCourses;
    const semesterMapping = {
      semesterFall: "Fall",
      semesterSpring: "Spring",
    };

    if (level && level !== "All") {
      filteredCourses = filteredCourses.filter((item) => +item.level === +level);
    }

    if (semesters.length > 0) {
      filteredCourses = filteredCourses.filter((item) =>
        semesters.some((semester) => item.semester === semesterMapping[semester])
      );
    }

    if (year && year !== "All") {
      filteredCourses = filteredCourses.filter((item) => item.academicyear === year);
    }

    filteredCourses = filteredCourses.map((course) => {
        const originalCourse = AllCoursesStateCheced.find((c) => c.courseid === course.courseid);
        return {
          ...course,
          checked: originalCourse?.checked || false,
        };
      })
    setSelectedSate(filteredCourses);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        disableRipple
        disableFocusRipple
        sx={{
          margin: "0 1.5rem",
          minWidth: "0",
          justifyContent: "flex-end",
          boxShadow: "none",
          color: "#666",
          bgcolor:"#fff !important",

          p: "0",
          width: "min-content",
          ":hover, :focus": {
            background: "#fff00000",
            boxShadow: "none",
            color: "#333",
          },
        }}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <ListIcon
          sx={{
            color: "inherit",
          }}
          fontSize="medium"
        />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            background: "#fff00000",
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
          }}
        >
          <Box mb={2}>
            <Typography>Level</Typography>
            <RadioGroup
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              aria-label="level"
              name="level"
              value={selectedLevel}
              onChange={handleRadioChange}
              row
            >
              <FormControlLabel
                value="All"
                control={<Radio sx={{ color: "#FF5C00 !important" }} />}
                label="All levels"
              />
              <FormControlLabel
                value="1"
                control={<Radio sx={{ color: "#FF5C00 !important" }} />}
                label="First level"
              />
              <FormControlLabel
                value="2"
                control={<Radio sx={{ color: "#FF5C00 !important" }} />}
                label="Second level"
              />
              <FormControlLabel
                value="3"
                control={<Radio sx={{ color: "#FF5C00 !important" }} />}
                label="Third level"
              />
              <FormControlLabel
                value="4"
                control={<Radio sx={{ color: "#FF5C00 !important" }} />}
                label="Fourth level"
              />
            </RadioGroup>
          </Box>

          <Box mb={2}>
            <Typography>Semester</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "#FF5C00 !important" }}
                  checked={selectedSemesters.includes("semesterFall")}
                  onChange={handleCheckboxChange}
                  name="semesterFall"
                />
              }
              label="Fall"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "#FF5C00 !important" }}
                  checked={selectedSemesters.includes("semesterSpring")}
                  onChange={handleCheckboxChange}
                  name="semesterSpring"
                />
              }
              label="Spring"
            />
          </Box>

          <Box>
            <Typography>Academic Year</Typography>
            <RadioGroup
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              aria-label="academicYear"
              name="academicYear"
              value={selectedYear}
              onChange={handleYearChange}
              row
            >
              <FormControlLabel
                value="All"
                control={<Radio sx={{ color: "#FF5C00 !important" }} />}
                label="All years"
              />
              {academicYears.map((year) => (
                <FormControlLabel
                  key={year.name}
                  value={year.name}
                  control={<Radio sx={{ color: "#FF5C00 !important" }} />}
                  label={year.name}
                />
              ))}
            </RadioGroup>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
