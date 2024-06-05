import React, { useEffect, useState } from "react";
import StanderdBox from "../../Components/StanderdBox";
import { Box, Button, Input, List, ListItem, Typography } from "@mui/material";
import CreateAcadmicYear from "../OpenSemester/CreateAcadmicYear";
import { useCourseContext } from "../../Components/Contexts/CourseContexts";
import { StyledMainBtn } from "../../MainDrawer/style";
import { useAcademicYear } from "../../Components/Contexts/AcadmicYearContext";
import CourseList from "./CourseList";
import LevelOptions from "../AdminDashbord/LevelOption";
import SemsterOptions from "../AdminDashbord/SemsterOptions";
import GradingIcon from '@mui/icons-material/Grading';
const StaticalAndalalysis = ({ page }) => {
  const [SelectedAcdmic, setSelectedAcdamic] = useState();
  const { AllCourses } = useCourseContext();
  const { CloseSemster, LoaderSemster } = useAcademicYear();
  const [AcdmicCourses, setAcdmicCourses] = useState([]);
 const [SesterSataus, setSesterSataus] = useState({
    Fall: "not Exisit",
    Spring: "not Exisit",
    Summer: "not Exisit",
  });
  const [inpVal, setinpVal] = useState("");
  const [LevelOption, setLevelOption] = useState();
  const [semsterOption, setsemsterOption] = useState();

  const HandleChange = (e) => {
    const { value } = e.target;
    setinpVal(value);

    try{

      const filteredAcdmic = AllCourses.filter((course) => {
        return course?.academicyear === SelectedAcdmic?.name;
      });
      
      if (filteredAcdmic.length === 0) {
        console.error("No courses found for the selected academic year.");
      setAcdmicCourses([]);
      return;
    }
    
    const regex = new RegExp(value, "i");
    const filteredCourses = filteredAcdmic.filter((course) =>
      regex.test(course.coursename)
  );
  
  if (value === "") {
    setAcdmicCourses(filteredAcdmic);
  } else {
    setAcdmicCourses(filteredCourses);
  }
}catch(err){
  console.log(err)
}
};

  useEffect(() => {
    if (SelectedAcdmic) {
      const FilteredAcdmic = AllCourses.filter((course) => {
        return course?.academicyear === SelectedAcdmic?.name;
      });

      const FallSataus = FilteredAcdmic.find((course) => {
        return course?.semester === "Fall" && course?.iscompleted;
      })?.iscompleted;
      const SpringSataus = FilteredAcdmic.find((course) => {
        return course?.semester === "Spring" && course?.iscompleted;
      })?.iscompleted;
      const SummerSataus = FilteredAcdmic.find((course) => {
        return course?.semester === "Summer" && course?.iscompleted;
      })?.iscompleted;

      setSesterSataus({
        Fall: FallSataus,
        Spring: SpringSataus,
        Summer: SummerSataus,
      });

      setAcdmicCourses(FilteredAcdmic);
    }
  }, [AllCourses, SelectedAcdmic]);




  useEffect(() => {
    if (SelectedAcdmic) {
      let filteredCourses = AllCourses.filter((course) => course.academicyear === SelectedAcdmic.name);
  
      if (LevelOption) {
        const level = parseInt(LevelOption);
        filteredCourses = filteredCourses.filter((course) => +course.level === level);
      }
  
      if (semsterOption) {
        filteredCourses = filteredCourses.filter((course) => course.semester === semsterOption);
      }
  
      setAcdmicCourses(filteredCourses);
    }

  }, [AllCourses, SelectedAcdmic, LevelOption, semsterOption]);
  

  const HandleCloseSemster = (academicyear_id, semester_id) => {
    return CloseSemster(academicyear_id, semester_id);
  };


  const viewAll = ()=>{
    setLevelOption('')
    setsemsterOption('')
    const FilteredAcdmic = AllCourses.filter((course) => {
      return course?.academicyear === SelectedAcdmic?.name;
    });
    setAcdmicCourses(FilteredAcdmic)
  }

  return (
    <StanderdBox>
      <Box
        className="Main-Holder"
        sx={{
          overflow: "none",
        }}
      >
        <Typography variant="h5" component={"p"} align="left">
          Manage Acdamic year & semsters
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "1rem",
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
          }}
        >
          <CreateAcadmicYear setSelectedAcdamic={setSelectedAcdamic} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                gap: "1rem",
              }}
            >
              <Input
                className="borderAfter"
                sx={{
                  width: "100%",
                  padding: ".3rem",
                  margin: ".5rem 0 ",
                }}
                value={inpVal}
                type="text"
                onChange={(e) => HandleChange(e)}
                placeholder="Search Courses"
              />

              <LevelOptions
                mxwidthprop={"90px"}
                position={"relative"}
                top={"0rem"}
                LevelOption={LevelOption}
                setLevelOption={setLevelOption}
                left={"0rem"}
              />
              <SemsterOptions
                mxwidthprop={"90px"}
                position={"relative"}
                semsterOption={semsterOption}
                setsemsterOption={setsemsterOption}
                left={"0rem"}
              />
          <Button

          onClick={()=>viewAll()}
          sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            minHeight:"0"
          }}
          >

              <GradingIcon/> 
          </Button>
            </Box>
            <CourseList
              AcdmicCourses={AcdmicCourses}
              LoaderSemster={LoaderSemster}
            />

            <List
              disablePadding
              sx={{
                width: "100%",
                borderTop: "1px solid #dedede",
              }}
            >
              <ListItem>
                {SelectedAcdmic?.name} Fall Semster status:
                <Typography
                  sx={{
                    width: "6rem",
                    marginLeft: ".5rem",
                    color: `${
                      SesterSataus.Fall === "In progress" ? "#00830ae0" : "#f01"
                    }`,
                  }}
                >
                  {SesterSataus.Fall ? SesterSataus.Fall : "not Exisit"}
                </Typography>
                <StyledMainBtn
                  onClick={() => HandleCloseSemster(SelectedAcdmic?.id, 1)}
                  disabled={SesterSataus.Fall === "In progress" ? false : true}
                  width="7rem"
                  sx={{
                    padding: ".2rem .5rem",
                    borderRadius: "6px",
                    border: `${
                      SesterSataus.Fall === "In progress"
                        ? "2px solid #ff5c00 "
                        : "2px solid #ddd "
                    }`,
                    color: "#ff5c00",
                    marginLeft: ".5rem",
                  }}
                  colorProp={"#fff"}
                >
                  close
                </StyledMainBtn>
              </ListItem>

              <ListItem>
                {SelectedAcdmic?.name} Spring Semster status:
                <Typography
                  sx={{
                    width: "6rem",
                    marginLeft: ".5rem",
                    color: `${
                      SesterSataus.Spring === "In progress"
                        ? "#00830ae0"
                        : "#f01"
                    }`,
                  }}
                >
                  {SesterSataus.Spring ? SesterSataus.Spring : "not Exisit"}
                </Typography>
                <StyledMainBtn
                  onClick={() => HandleCloseSemster(SelectedAcdmic?.id, 2)}
                  disabled={
                    SesterSataus.Spring === "In progress" ? false : true
                  }
                  width="7rem"
                  sx={{
                    padding: ".2rem .5rem",
                    borderRadius: "6px",
                    border: `${
                      SesterSataus.Spring === "In progress"
                        ? "2px solid #ff5c00 "
                        : "2px solid #ddd "
                    }`,
                    color: "#ff5c00",
                    marginLeft: ".5rem",
                  }}
                  colorProp={"#fff"}
                >
                  close
                </StyledMainBtn>
              </ListItem>

              <ListItem>
                {SelectedAcdmic?.name} Summer Semster status:
                <Typography
                  sx={{
                    width: "6rem",
                    marginLeft: ".5rem",
                    color: `${
                      SesterSataus.Summer === "In progress"
                        ? "#00830ae0"
                        : "#f01"
                    }`,
                  }}
                >
                  {SesterSataus.Summer ? SesterSataus.Summer : "not Exisit"}
                </Typography>
                <StyledMainBtn
                  disabled={
                    SesterSataus.Summer === "In progress" ? false : true
                  }
                  onClick={() => HandleCloseSemster(SelectedAcdmic?.id, 3)}
                  width="7rem"
                  sx={{
                    padding: ".2rem .5rem",
                    borderRadius: "6px",
                    border: `${
                      SesterSataus.Summer === "In progress"
                        ? "2px solid #ff5c00 "
                        : "2px solid #ddd "
                    }`,
                    color: "#ff5c00",
                    marginLeft: ".5rem",
                  }}
                  colorProp={"#fff"}
                >
                  close
                </StyledMainBtn>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </StanderdBox>
  );
};

export default StaticalAndalalysis;
