import {
  Box,
  Divider,
  FormGroup,
  FormLabel,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomAutocomplete from "../../MainDrawer/AutoComplete";
import { StyledMainBtn } from "../../MainDrawer/style";
import { useUserContext } from "../../Components/Contexts/UserContexts";
import { useCourseContext } from "../../Components/Contexts/CourseContexts";
import axios from "axios";
import { useAcademicYear } from "../../Components/Contexts/AcadmicYearContext";
import {AnimatePresence, motion} from 'framer-motion'
const AssignCoursesBox = ({ AllCourses , selctedCourse }) => {

  const { users } = useUserContext();
  const { courses } = useCourseContext();
  // console.log(courses);

  const { academicYears } = useAcademicYear();


  const [selectUser, SetselectUser] = useState([]);
  const [selectCourse, SetselectCourse] = useState([]);
  const [msg, setMsg] = useState();
  const handleFormSubmit = (event) => {
    console.log(selectCourse, selectUser);
    event.preventDefault();

    selectCourse.map((course) =>
      (async () => {
        try {
          const res = await axios.post(
            "https://optima-software-solutions.com/apis/usercourses.php",
            {
              userId: selectUser.id,
              courseId: course.courseid,
            }
          );
          // setMsg(res.data)
          // console.log(msg)
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      })()
    );
    // if (selectCourse?.length && selectUser?.id) {
    //     const userId = String(selectUser.id);

    //     try {
    //         for (const course of selectCourse) {
    //             await axios.post("https://optima-software-solutions.com/apis/usercourses.php", {
    //                 'userId': userId,
    //                 'courseId': course.courseid
    //             }).then((res) => setMsg(res.data))
    //               .catch((err) => setMsg(err.response.data));
    //         }
    //     } catch (error) {
    //         console.error('Error while posting user courses:', error);
    //         setMsg('Error while posting user courses')
    //     }
    // } else {
    //     setMsg("Choose the user and course/s");
    // }
  };
  const [CompMsg, setCompMsg] = useState("");
  const HandleComplete = (academicyear_id, semester_id) => {
    (async () => {
      try {
        const res = await axios.post(
          "https://optima-software-solutions.com/apis/completesemester.php",
          {
            academicyear_id: academicyear_id,
            semester_id: semester_id,
          }
        );
        setCompMsg("Semster is Completed Sucessfully");
      } catch (err) {
        setCompMsg("Some thing went wrong");
        console.error(err);
      }
    })();
  };
  const HandleDelete = (id)=>{
    (async()=>{
      await axios.post(`https://optima-software-solutions.com/apis/coursedelete.php?courseid=${id}`)
      .then((res)=>console.log(res.data))
      .catch((err)=>console.log(err.data))
      
    })()
  } 

  return (
    <Box
      sx={{
        width: "100%",
        transition: ".3s",
      }}
    >
      <Typography
        sx={{
          color: "#f01",
        }}
      >
        {msg}
      </Typography>
      <form
        onSubmit={handleFormSubmit}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <FormGroup>
          <FormLabel
            htmlFor="Users"
            variant="body1"
            component={"p"}
            sx={{
              textAlign: "start",
              color: "#6e6e6e",
            }}
          >
            Select a user
          </FormLabel>
          <CustomAutocomplete
            SetselectUser={SetselectUser}
            id="Users"
            options={users && users}
            isexpand={"true"}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel
            htmlFor="Course"
            variant="body1"
            component={"p"}
            sx={{
              textAlign: "start",

              color: "#6e6e6e",
            }}
          >
            Select courses
          </FormLabel>
          <CustomAutocomplete
            SetselectCourse={SetselectCourse}
            id="Course"
            key={"coursesAssign"}
            options={AllCourses}
            isexpand={"true"}
          />
        </FormGroup>

        <StyledMainBtn
          type="submit"
          sx={{
            margin: "1rem 0 0 0 !important",
          }}
        >
          Submit
        </StyledMainBtn>
      </form>

      <Box>
        <Typography variant="h6" align="left" margin={"1rem 0 "}>
          Course Details and Semster
        </Typography>
        <Box>

        <AnimatePresence>
          {Object.values(selctedCourse).length && 
          
          <motion.div
          initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}


            style={{
              width: "100%",
              height: "34vh",
              padding: ".5rem",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap:"1rem",
            }}
          >
            {selctedCourse?.map((Course) => {
      
                return (
                  <Box
                    key={Course.id}
                    sx={{
                      display:"flex",
                      justifyContent:"flex-start",
                      alignItems:"flex-start",
                      gap:"2rem"
                    }}
                  
                  >

                  <Box
                    sx={{
                      height:"98%",
                      width: "max-content",
                      padding: ".5rem",
                      bgcolor: "",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      gap: ".5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "max-content",
                      }}
                    >
                      coursename: {Course.coursename}
                    </Typography>
                    <Typography
                      sx={{
                        width: "max-content",
                      }}
                    >
                      semester:
                      {Course.semester }
                    </Typography>
                    <Typography
                      sx={{
                        width: "max-content",
                        color: `${Course.iscompleted  !== "In progress"? "green" : "#f01"} `,
                      }}
                    >
                      Status:{" "}
                      {Course.iscompleted }
                    </Typography>
                    <StyledMainBtn
                    width={
                      "50%"
                    }
                    onClick={HandleDelete(Course.courseid)}
                    colorProp={"#f03"}
                    >
                      Delete
                    </StyledMainBtn>
                  </Box>
                      <Box>

                    <Typography
                      sx={{
                        width: "max-content",
                      }}
                    >
                      academic year {Course.academicyear}


                    </Typography>
                    {Course.iscompleted  === "In progress" && 
                    
                      <StyledMainBtn 
                      onClick={HandleComplete(0
                      , courses.semester === "fall" 
                      ?1 : courses.semester === "spring"? 2 : 3 )}
                      sx={{

                        margin:"1rem 0"
                      }}>
                          finish this semster : {courses.semester}

                      </StyledMainBtn>
                    }
                      </Box>
                        
                      </Box>
                );
              } )}
          </motion.div>
        }

        </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};

export default AssignCoursesBox;
