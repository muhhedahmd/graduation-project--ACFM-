import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import StanderdBox from "../../Components/StanderdBox";
import CoursesOfSemester from "./CoursesOfSemester";
import AcadmicYear from "./AcadmicYear";
import axios from "axios";
import { useCourseContext } from "../../Components/Contexts/CourseContexts";

const OpenSemester = ({ page }) => {
const { fetchAllCourses}= useCourseContext()
  const [ChecedCourses, setCheckedCourses] = useState([]);
  const [AcadmicYearState, setAcadmicYearState] = useState("");
  console.log(AcadmicYearState)
  const [Semester, setSemester] = useState({
    Fall: true,
    Spring: false,
    Saummer: false,
  });

  const [looding  , setLooding]  = useState(false)
  const [SemesterState, setSemesterState] = useState({
    Semester: "Fall",
  });
  const handleChange = (e, item, state, setState, onlyOne) => {
    const { checked } = e.target;

    if (onlyOne) {
      const updatedState = {};
      for (const key in state) {
        updatedState[key] = key === item ? checked : false;
      }
      setState(updatedState);
      setSemesterState((prev) => ({ ...prev, Semester: item }));
    } else {
      const updatedState = {
        ...state,
        [item]: !state[item],
      };
      setState(updatedState);
    }
  };



  const HandleClick = () => {
    const SemsterNum =
      SemesterState.Semester === "Fall"
        ? "1"
        : SemesterState.Semester === "Spring"
        ? "2"
        : "3";

    const postRequests = ChecedCourses.map(async (item) => {
      setLooding(true)
      try {
        const response = await axios.post(
          "https://optima-software-solutions.com/apis/courseadd.php",
          {
            coursename: item.name,
            academicyear: AcadmicYearState[0].id,
            semester: SemsterNum,
            abbreviation: item.code,
            bylaw: item.byLaw,
            general: item.program,
            lecture:item.MT,
            classwork:+item.ClassWork + item.MT,
            final:item.FinalWritten,
            practical: item.Lab ? item.Lab  :"No practical",
            teaching_hours_lecture:'',
            teaching_hours_practical: "Teaching Hours Practical",
            teaching_hours_training:item.ClassWork ,
            level: item.level,
            credit_hour: item.credit_hours,
          }
        );
        fetchAllCourses()

        return response;
      } catch (error) {
        throw error;
      }
    });

    // Wait for all requests to complete
    Promise.all(postRequests)
      .then((responses) => {
        setLooding(false)
        // If all requests are successful, show an alert
        alert("All courses have been added.");
        console.log(responses);
      })
      .catch((error) => {
        setLooding(false)
        // If any request fails, log the error
        console.error("Error adding courses:", error);
      });
  };

  const theme = useTheme();
  return (
    <StanderdBox>
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          height: "calc(100vh - 7vh)",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Typography padding={"0 1rem"} variant="h5" component={"p"}>
          {page}
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            padding: "1rem",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              bgcolor: "#fff",
              boxShadow: "3px 3px 4px #dedede",
              flexWrap: "nowrap",
              width: "100%",
              borderRadius: "6px",
              padding: ".5rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              margin: "0rem 0 0 0 ",
              gap: "3rem",
              overflow: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                pb: ".7rem",
              }}
            >
              <AcadmicYear setAcadmicYearState={setAcadmicYearState} />
            </Box>
            {Object.keys(Semester).map((ksem) => {
              return (
                <FormControlLabel
                  sx={{
                    transition: ".4s",
                    padding: ".2rem 1rem",
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                  key={ksem}
                  control={
                    <Box
                      sx={{
                        width: "10rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <Radio
                        checked={Semester[ksem]}
                        id={ksem}
                        component={"p"}
                        onChange={(e) =>
                          handleChange(e, ksem, Semester, setSemester, true)
                        }
                        sx={{
                          fontSize: ".9rem",
                          color: "#ff5c00 !important",
                        }}
                      />

                      <Typography variant="body2" component={"p"}>
                      {AcadmicYearState[0]?.name&&AcadmicYearState[0]?.name }
                      </Typography>
                    </Box>
                  }
                  label={ksem}
                />
              );
            })}
          </Box>

          <Box
            sx={{
              height:"100%",
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              gap: "1rem",

              overflow: "auto",
            }}
          >

            <Box
              sx={{
                width: "100%",
              }}
            >
              <CoursesOfSemester
                ChecedCourses={ChecedCourses}
                setCheckedCourses={setCheckedCourses}
    
                setSemesterState={setSemesterState}
              />
              {looding  ? 
                <>
                  looding...
                </>
              : 
              <Button
                sx={{
                  padding: ".5rem  0 .5rem 0 ",
                  margin: "1rem 0 ",
                  width: "100%",
                  bgcolor: theme.palette.primary.paper,
                  ":hover": {
                    bgcolor: theme.palette.primary.paper,
                  },
                }}
                onClick={HandleClick}
                width="100%"
              >
                Submit
              </Button>
              
              }

            </Box>
          </Box>
        </Box>
      </Box>
    </StanderdBox>
  );
};

export default OpenSemester;
