import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box, Button, FormControlLabel, Radio, RadioGroup, Typography, Checkbox } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { processedCourses } from "../../Components/Semsterdata";

export default function SortPopup({  setSelectedSate, SelectedSate }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedLevel, setSelectedLevel] = React.useState("");
  const [selectedSemesters, setSelectedSemesters] = React.useState([]);

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

    if (level === "All") {
      setSelectedSate(processedCourses);
    } else {
      const filteredByLevel = processedCourses.filter((item) => item.level === +level);
      setSelectedSate(filteredByLevel);
    }
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

    let filteredCourses = processedCourses;
    const semesterMapping = {
      semesterFall: 1,
      semesterSpring: 2,
    };

    if (updatedSemesters.length > 0) {
      filteredCourses = processedCourses.filter((item) =>
        updatedSemesters.some((semester) => item.semester === semesterMapping[semester])
      );
    }

    if (selectedLevel !== "All" && selectedLevel !== "") {
      filteredCourses = filteredCourses.filter((item) => item.level === +selectedLevel);
    }

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
          margin:"0 1.5rem",
          minWidth:"0",
          
          justifyContent: "flex-end",
          boxShadow: "none",
          color: "#666",
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
                label="All level"
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

          <Box>
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
        </Box>
      </Popover>
    </>
  );
}
