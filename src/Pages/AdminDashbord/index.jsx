import React, { useEffect, useState } from "react";
import StanderdBox from "../../Components/StanderdBox";
import { Box } from "@mui/material";
import AcdamicYear from "./AcdamicYear";
import CoursesGraph from "./CoursesGraph";
import TableOFUsers from "./TableOFUsers";
import SemsterOptions from "./SemsterOptions";
import { useAcademicYear } from "../../Components/Contexts/AcadmicYearContext";
import { motion } from "framer-motion";
import axios from "axios";
import { useUserContext } from "../../Components/Contexts/UserContexts";
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
  "Admin files",
  "Final Exams",
  "Student Survey",
];

const StyledAcdamicYearHolder = {
  // padding:"1rem 0 ",
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
  const {users} = useUserContext()
  const { academicYears } = useAcademicYear();
  const [AcadmicSelect, setAcadmicSelect] = useState();
  const [staticsData, setStaticsData] = useState({});
  const [semsterOption, setsemsterOption] = useState("Fall");
  const [testData, setTestData] = useState();
  const [AcadmicYearData , setAcadmicYearData] = useState([])

  useEffect(()=>{
    if(AcadmicSelect && semsterOption  && testData[AcadmicSelect&&AcadmicSelect][semsterOption&&semsterOption]){

      setAcadmicYearData(testData[AcadmicSelect&&AcadmicSelect][semsterOption&&semsterOption])
    }
  },[AcadmicSelect, semsterOption,  testData])
  useEffect(() => {
    (async () => {
      await axios
        .get("https://optima-software-solutions.com/apis/statistics.php")
        .then((res) => {
          setStaticsData(res.data);
        })
        .catch((err) => console.log(err));
    })();
  }, []);
  const HandleClick = async (item) => {
    try {

  
      const academicYearData = {};
  
      await Promise.all(
        users.map(async (user) => {
          if ( user.access !== "user") {
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
                    const semester =
                      course.semester === "1"
                        ? "Fall"
                        : course.semester === "2"
                        ? "Spring"
                        : "Summer";
  
                    // Create the structure if not exists
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
          {Object?.keys(staticsData && staticsData)?.map((item, i) => {
            return (
              <motion.div key={i} onClick={() => HandleClick(item)}>
                <AcdamicYear  AcadmicSelect={AcadmicSelect} onClick={HandleClick} title={item} />
              </motion.div>
            );
          })}
        </Box>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#fff",
            height: '43%',
            boxShadow: "3px 3px 4px #dedede",
          }}
        >
          <SemsterOptions
            semsterOption={semsterOption}
            setsemsterOption={setsemsterOption}
          />
          {AcadmicYearData?.length  ?
          <CoursesGraph 
          AcadmicYearData={AcadmicYearData}
           semsterOption={semsterOption} />
          :"" 
          }
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
          <TableOFUsers   AcadmicYearData={AcadmicYearData}/>
        </Box>
      </Box>
    </StanderdBox>
  );
};

export default AdminDashbord;
