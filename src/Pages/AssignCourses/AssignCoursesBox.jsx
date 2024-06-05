import {
  Box,
  FormGroup,
  FormLabel,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { Suspense, useState } from "react";
import CustomAutocomplete from "../../MainDrawer/AutoComplete";
import { StyledMainBtn } from "../../MainDrawer/style";
import { useUserContext } from "../../Components/Contexts/UserContexts";
import { useCourseContext } from "../../Components/Contexts/CourseContexts";
import axios from "axios";
import {AnimatePresence, motion} from 'framer-motion'
import { Button } from "react-bootstrap";
import LevelOptions from "../AdminDashbord/LevelOption";
import AcadamicOptions from "../../MainDrawer/AcadamicOptions";
import Asynchronous from "../../MainDrawer/MainDrawerAysnc";
const AssignCoursesBox = ({ AllCourses , selctedCourse }) => {

  
  const [levelOption, setLevelOption] = useState();
  const [acadamicOptions, setAcadamicOptions] = useState();

  const { users } = useUserContext();
  const { courses  ,fetchAllCourses } = useCourseContext();



  const [selectUser, SetselectUser] = useState([]);
  const [selectCourse, SetselectCourse] = useState([]);

  console.log(selectCourse)
  const [msg, setMsg] = useState();
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(selectCourse)
    
    // try {
    //   const promises = selectCourse.map((course) =>
    //     axios.post(
    //       "https://optima-software-solutions.com/apis/usercourses.php",
    //       {
    //         userId: selectUser.id,
    //         courseId: course.courseid,
    //       }
    //     )
    //   );
  
    //   const responses = await Promise.all(promises);
  
    //   // Check if all responses were successful
    //   const isSuccess = responses.every((res) => res.status === 200);
  
    //   if (isSuccess) {
    //     alert("All courses were successfully added.")
    //   } else {
    //     alert("Some courses could not be added. Please try again later.")
    //     // setMsg("Some courses could not be added. Please try again later.");
    //   }
    // } catch (error) {
    //   setMsg("An error occurred while adding courses. Please try again later.");
    //   console.error(error);
    // }
  };
  const [CompMsg, setCompMsg] = useState("");
  const HandleComplete = (academicyear_id, semester_id) => {
    (async () => {
      try {
          await axios.post(
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

  const HandleDelete =(courseId)=>{
    
  
        (async()=>{
          await axios.delete(`https://optima-software-solutions.com/apis/coursedelete.php?courseid=${courseId}`)
              .then((res)=>{
        fetchAllCourses()
                console.log(res.data)

              })
              .catch((err)=>{console.log(err)})
        })()


  }

  return (
    <Box
      sx={{
        width: "100%",
        transition: ".3s",
      }}
    >
        {msg&&
      <Typography
        sx={{
          color: "#f01",
        }}
      >
      </Typography>
        }
      {CompMsg&& 
      <Typography
        sx={{
          color: "#f01",
        }}
      >
        {CompMsg}
      </Typography>
      }
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
<Box
sx={{
  display:"flex",
  justifyContent:"flex-start",
  alignItems:"center",
  gap:"1rem"
}}
>

              <LevelOptions
                mxwidthprop={"22vw"}
                position={'static'}
                LevelOption={levelOption}
                setLevelOption={setLevelOption}
                left={"0rem"}
              />
              <AcadamicOptions
                mxwidthprop={"22vw"}
                position={true}
                acadamicOptions={acadamicOptions}
                setAcadamicOptions={setAcadamicOptions}
              />
</Box>
            <Asynchronous
          assign={true}
              acadamicOptions={acadamicOptions}
              SetselectCourse={SetselectCourse}
              LevelOption={levelOption}
            />
          


        </FormGroup>
            {selectCourse.map((item)=>{
              return item.coursename

            })}

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
                    <Button
                    width={
                      "50%"
                    }
                    onClick={()=>HandleDelete(Course.courseid)}
                    colorProp={"#f03"}
                    >
                      Delete
                    </Button>
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
