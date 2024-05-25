import React, { useEffect, useState, lazy, Suspense } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useAcademicYear } from "../../Components/Contexts/AcadmicYearContext";
import { useUserContext } from "../../Components/Contexts/UserContexts";
import StanderdBox from "../../Components/StanderdBox";
import SemsterOptions from "./SemsterOptions";
import LevelOptions from "./LevelOption";

const AcdamicYear = lazy(() => import("./AcdamicYear"));
const CoursesGraph = lazy(() => import("./CoursesGraph"));
const TableOFUsers = lazy(() => import("./TableOFUsers"));

const StyledMainBox = {
  margin: ".5px 0 0 0 ",
  boxShadow: "none",
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: ".5rem",
  overflow: "hidden",
  bgcolor: "transparent",
  flexDirection: "column",
};

const AllCatagories = [
  "lecture notes",
  "books",
  "Attendance",
  "ExamsAndSolutions",
  "Assignments",
  "GenerateReport",
  "Final Exams",
  "Student Survey",
];

const StyledAcdamicYearHolder = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(22rem, 1fr))",
  gridAutoFlow: "column",
  gap: "2rem",
  overflowX: "auto",
  overflowY: "hidden",
  maxWidth: "100%",
  height: "20%",
  width: "max-content",
};

const AdminDashbord = () => {
  const { users } = useUserContext();
  const { academicYears } = useAcademicYear();
  const [AcadmicSelect, setAcadmicSelect] = useState(null);
  const [staticsData, setStaticsData] = useState({});
  const [semsterOption, setsemsterOption] = useState("Fall");
  const [testData, setTestData] = useState({});
  const [AcadmicYearData, setAcadmicYearData] = useState([]);
  const [LevelOption, setLevelOption] = useState(null);

  useEffect(() => {
    if (AcadmicSelect && semsterOption && testData[AcadmicSelect] && testData[AcadmicSelect][semsterOption]) {
      const Updated = testData[AcadmicSelect][semsterOption].filter(item => +item.course.level === +LevelOption);
      setAcadmicYearData(Updated);
    }
  }, [AcadmicSelect, LevelOption, semsterOption, testData]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("https://optima-software-solutions.com/apis/statistics.php");
        setStaticsData(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const HandleClick = async (item) => {
    try {
      const academicYearData = {};
      await Promise.all(
        users.map(async (user) => {
          if (user.access !== "user") {
            const userData = {
              id: user.id,
              firstName: user.first_name,
              lastName: user.last_name,
              access: user.access,
              creation_date: user.creation_date,
              email: user.email,
              courses: [],
            };

            try {
              const coursesResponse = await axios.get(
                `https://optima-software-solutions.com/apis/courseshow.php?userid=${user.id}`
              );
              const courses = coursesResponse.data;

              await Promise.all(
                courses.map(async (course) => {
                  const academicYear = academicYears.find(
                    (item) => item.id === course.academicyear
                  );

                  if (academicYear) {
                    const semester = course.semester === "1" ? "Fall" : course.semester === "2" ? "Spring" : "Summer";
                    if (!academicYearData[academicYear.name]) {
                      academicYearData[academicYear.name] = {};
                    }
                    if (!academicYearData[academicYear.name][semester]) {
                      academicYearData[academicYear.name][semester] = [];
                    }

                    const courseData = {
                      courseid: course.courseid,
                      coursename: course.coursename,
                      academicyearname: academicYear.name,
                      semester: semester,
                      iscompleted: course.iscompleted,
                      status: course.status,
                      level: course.level,
                      program: course.program,
                      files: {},
                    };

                    await Promise.all(
                      AllCatagories.map(async (category) => {
                        try {
                          const res = await axios.post(
                            "https://optima-software-solutions.com/apis/filesshow.php",
                            {
                              userid: user.id,
                              courseid: course.courseid,
                              category: category,
                            }
                          );
                          courseData.files[category] = res.data;
                        } catch (err) {
                          console.log(err);
                          courseData.files[category] = [];
                        }
                      })
                    );

                    let fileCounter = 0;
                    Object.values(courseData.files).forEach((fileList) => {
                      fileCounter += fileList.length;
                    });
                    courseData.fileCount = fileCounter;

                    academicYearData[academicYear.name][semester].push({
                      user: userData,
                      course: courseData,
                    });
                  }
                })
              );
            } catch (error) {
              console.error("Error fetching courses:", error);
            }
          }
        })
      );

      academicYears.forEach((academicYear) => {
        if (!academicYearData[academicYear.name]) {
          academicYearData[academicYear.name] = {};
        }
      });

      Object.keys(academicYearData).forEach((academicYear) => {
        const semesters = ["Fall", "Spring", "Summer"];
        semesters.forEach((semester) => {
          if (!academicYearData[academicYear][semester]) {
            academicYearData[academicYear][semester] = [];
          }
        });
      });

      setTestData(academicYearData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setAcadmicSelect(item);
  };

  return (
    <StanderdBox>
      <Box sx={StyledMainBox} className="Main-Holder">
        <Box sx={StyledAcdamicYearHolder}>
          {Object.keys(staticsData).map((item, i) => (
            <motion.div key={i} onClick={() => HandleClick(item)}>
              <Suspense fallback={<div>Loading...</div>}>
                <AcdamicYear AcadmicSelect={AcadmicSelect} onClick={HandleClick} title={item} />
              </Suspense>
            </motion.div>
          ))}
        </Box>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#fff",
            height: "49%",
            boxShadow: "3px 3px 4px #dedede",
          }}
        >
          <SemsterOptions semsterOption={semsterOption} setsemsterOption={setsemsterOption} />
          <LevelOptions LevelOption={LevelOption} setLevelOption={setLevelOption} />
          {AcadmicYearData.length ? (
            <Suspense fallback={<div>Loading...</div>}>
              <CoursesGraph AcadmicYearData={AcadmicYearData} semsterOption={semsterOption} />
            </Suspense>
          ) : null}
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#fff",
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <TableOFUsers AcadmicYearData={AcadmicYearData} />
          </Suspense>
        </Box>
      </Box>
    </StanderdBox>
  );
};

export default AdminDashbord;
