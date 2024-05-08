import React, {  useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Clear,  } from "@mui/icons-material";
// import { v4 as uuid5 } from "uuid";
import { useTheme } from "@emotion/react";
import { StyledFormGroup } from "./Style";
import AutoCompleteUsers from "./AutoCompleteUsers";
// import axios from "axios";
import { processedCourses } from "../../Components/Semsterdata";
import PopOverMenuFilter from "../../Components/Dashbboard/PopOverMenu";

const CoursesOfSemester = ({  setCheckedCourses, setSemesterState  , filterList   , setFilterList}) => {

    const transformedCourses = {
    Fall: [],
    Spring: [],
    Summer: [],
  };

  const transformCourses = (courses) => {
    
      
    courses.forEach((course) => {
      const { semester } = course;

      switch (semester.toLowerCase()) {
        case "fall":
          transformedCourses.Fall.push({ ...course, checked: false });
          break;
        case "spring":
          transformedCourses.Spring.push({ ...course, checked: false });
          break;
        case "summer":
          transformedCourses.Summer.push({ ...course, checked: false });
          break;
        default:
                    break;
      }
    });
    console.log(transformedCourses)
    return transformedCourses;
  };

  const [courses, setCourses] = useState(transformCourses(processedCourses));
  const [isClear, SetIsClear] = useState(false);
  const theme = useTheme();
  const handleCheck = (id) => {
    setCourses((prevCourses) => {
      const updatedCourses = Object.keys(prevCourses).reduce((acc, semester) => {
        acc[semester] = prevCourses[semester].map((course) =>
          course.id === id
            ? { ...course, checked: !course.checked }
            : course
        );
        return acc;
      }, {});

      const flattenedCourses = Object.values(updatedCourses).flat();

      const filteredCourses = flattenedCourses.filter((course) => course.checked);

      // Update checkedCourses state with the filtered courses
      setCheckedCourses(filteredCourses);

      setSemesterState((prev) => ({
        ...prev,
        courses: filteredCourses,
      }));

      return updatedCourses;
    });
  
  };

  return (
    <Box
      sx={{
        height: " 62vh",
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
          setSemesterState={setSemesterState}
          isClear={isClear}
          SetIsClear={SetIsClear}
        />
        <Box
        sx={{
          display:"flex",
          justifyContent:"flex-start",
          alignItems:"center"
        }}
        >

        <Button  
        sx={{ minWidth:0 }}>
            <Clear
              onClick={() => SetIsClear(true)}
              sx={{ color: theme.palette.primary.paper }}
            />
        </Button>
        <Button 
          
        
         onClick={() => SetIsClear(true)} sx={{  }}>
<PopOverMenuFilter filterList={filterList} setFilterList={setFilterList} />
        </Button>
        </Box>
      </Box>
      <StyledFormGroup
        sx={{
          overflow: "auto",

          width: "100% !important",
        }}
      >
        {Object.keys(courses).map((itemC) => (
          <Box
            key={`course-${itemC}`}
            component="div"
            sx={{
              maxWidth: "auto",
              width: "98%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
              flexWrap: "nowrap",
              gap: ".5rem",
            }}
          >
            <Typography variant="subtitle1" component={"p"}>
              {itemC}
            </Typography>
            {courses[itemC].map((item) => (
              <FormControlLabel
                key={item.id}
                id={item.id}
                checked={item.checked}
                onClick={(e) => handleCheck(item.id)}
                sx={{
                  width: "97%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: ".5rem .5rem .5rem 0",
                  gap: "1rem",
                  color: item.checked ? theme.palette.primary.paper : "#333",
                  transition: ".3s",
                  borderRadius: "6px",
                  margin: "0",
                }}
                control={
                  <Box
                    className="item-holder-course"
                    sx={{
                      margin: "0",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: ".5rem",
                      flexWrap: "nowrap",
                      width: "max-content",
                    }}
                  >
                    <Checkbox
                      id={item.id}
                      style={{
                        color: theme.palette.primary.paper,
                        padding: "0",
                        "&.MuiChecked": {
                          color: theme.palette.primary.paper,
                        },
                      }}
                      checked={item.checked}
                    />
                    <Typography
                      id={item.id}
                      sx={{
                        width: "max-content",
                        minWidth: "max-content",
                        cursor: "pointer",
                      }}
                      variant="subtitle2"
                      onClick={(e) => handleCheck(item.id)}
                    >
                      {item.courseTitle} {item.abbreviation}
                    </Typography>
                  </Box>
                }
              />
            ))}
          </Box>
        ))}
      </StyledFormGroup>
    </Box>
  );
};

export default CoursesOfSemester;