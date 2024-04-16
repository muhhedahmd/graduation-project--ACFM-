import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, SvgIcon, Typography } from "@mui/material";
import { Clear } from "@mui/icons-material";
import AsynchronousAutoCompete from "./AutoCompleteUsers";
import { v4 as uuid5 } from "uuid";
import { useTheme } from "@emotion/react";
import {StyledFormGroup} from  './Style'
const Users = () => {
  const ref = useRef();
  const theme = useTheme()
  const [courses, setCourses] = useState({
    Fall: [
      {
        checked: false,
        id: uuid5(),
        courseName: "Math 1",
        courseCode: "MATH101",
        byLaw: "Required",
        level: "100",
        creditHours: 3,
        semester: "Fall",
        program: "Computer Science",
        schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
        room: "Room 101",
      },
      {
        checked: false,
        id: uuid5(),
        courseName: "Physics 1",
        courseCode: "PHY101",
        byLaw: "Required",
        level: "100",
        creditHours: 3,
        semester: "Fall",
        program: "Computer Science",
        schedule: "Tue, Thu 11:00 AM - 12:30 PM",
        room: "Room 102",
      },
    ],
    Spring: [
      {
        checked: false,
        id: uuid5(),
        courseName: "Advanced Programming",
        courseCode: "COMP301",
        byLaw: "Elective",
        level: "300",
        creditHours: 4,
        semester: "Spring",
        program: "Computer Science",
        schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
        room: "Room 201",
      },
      {
        checked: false,
        id: uuid5(),
        courseName: "Advanced Software Engineering",
        courseCode: "COMP401",
        byLaw: "Elective",
        level: "400",
        creditHours: 4,
        semester: "Spring",
        program: "Computer Science",
        schedule: "Tue, Thu 11:00 AM - 12:30 PM",
        room: "Room 202",
      },
    ],
    Summer: [
      {
        checked: false,
        id: uuid5(),
        courseName: "Database Management Systems",
        courseCode: "COMP201",
        byLaw: "Elective",
        level: "200",
        creditHours: 3,
        semester: "Summer",
        program: "Computer Science",
        instructor: "Dr. White",
        schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
        room: "Room 301",
      },
      {
        checked: false,
        id: uuid5(),
        courseName: "Network Security",
        courseCode: "COMP501",
        byLaw: "Elective",
        level: "500",
        creditHours: 4,
        semester: "Summer",
        program: "Computer Science",
        instructor: "Dr. Black",
        schedule: "Tue, Thu 11:00 AM - 12:30 PM",
        room: "Room 302",
      },
    ],
  });

  const [SelectedItem, setSelectedItem] = useState(null);

  const handleCheck = (e) => {
    const courseId = e.target.id; // Get the ID of the clicked checkbox

    setCourses((prevCourses) => {
      const entries = Object.entries(prevCourses);

      return Object.fromEntries(
        entries.map(([semester, courses]) => [
          semester,
          courses.map((course) =>
            course.id === courseId ? { ...course, checked: !course.checked } : course
          )
        ])
      );
    });
  };

  useEffect(() => {
    const selectedFromRef = ref?.current?.selected;
    if (selectedFromRef !== null && selectedFromRef !== undefined) {
      setSelectedItem(selectedFromRef);
    }
  }, [ref.current.selected]);
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
        <AsynchronousAutoCompete ref={ref} />

        <Button sx={{ padding: "1rem 0 " }}>
          <SvgIcon color={theme.palette.primary.paper}>
            <Clear onClick={ref?.current?.HandleClear()} sx={{ color: theme.palette.primary.paper }} />
          </SvgIcon>
        </Button>
      </Box>
      <StyledFormGroup
        sx={{
          margin: ".5rem 0 0 0 ",

          // overflow: "visible !important",
          width: "100% !important",
        }}
      >
        {SelectedItem ?
         (
          <>
            <Typography variant="subtitle1" component={"p"}>
              Selected Courses: 
            </Typography>
            {Object.keys(courses).map((semester) =>
              courses[semester].map((item) => (
                item.courseName === SelectedItem.courseName ? 
                <>
                <Typography
                align="start" 
                variant="h6" 
                component={"div"}
                >

                {semester}
                </Typography>
                  <FormControlLabel
                    key={item.id}
                    id={item.id}
                    checked={item.checked}
                    onClick={(e) => handleCheck(e, setCourses)}
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
                    }}
                    control={
                      <Box
                        sx={{
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
                            '&.Mui-checked': {
                              color: theme.palette.primary.paper,
                            }
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
                          onClick={(e) => handleCheck(e, setCourses)}
                        >
                          {item.courseName} {item.courseCode}
                        </Typography>
                      </Box>
                    }
                  />
                </>

                  :null
                
              ))
            )}
          </>
        ) : (
          Object.keys(courses).map((itemC) => (
            <Box
              key={`course-${itemC}`}
              component="div"
              id={itemC.id}
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
                    onClick={(e) => handleCheck(e, setCourses)}
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
                    }}
                    control={
                      <Box
                        sx={{
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
                            '&.Mui-checked': {
                              color: theme.palette.primary.paper,
                            }
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
                          onClick={(e) => handleCheck(e, setCourses)}
                        >
                          {item.courseName} {item.courseCode}
                        </Typography>
                      </Box>
                    }
                  />
                
              ))}
            </Box>
          ))
        )}
      </StyledFormGroup>
    </Box>
  );
};

export default Users;
