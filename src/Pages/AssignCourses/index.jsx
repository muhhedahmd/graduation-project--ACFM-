import React, { useEffect, useState } from "react";
import StanderdBox from "../../Components/StanderdBox";
import {
  Box,
  Checkbox,
  CircularProgress,
  CssBaseline,
  FormControlLabel,
  List,
  ListItem,
  Typography,

} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


import { useCourseContext } from "../../Components/Contexts/CourseContexts";

import { useUserContext } from "../../Components/Contexts/UserContexts";
import { StyledFormGroup } from "../OpenSemester/Style";
import AutoCompleteSearch from "./AutoCompleteSearch";
import { StyledMainBtn } from "../../MainDrawer/style";
import axios from "axios";
const AssignCourses = ({ page }) => {
  const { users } = useUserContext();

  const { AllCourses } = useCourseContext();
  const [ChecedCourses, setCheckedCourses] = useState([]);
  const [AllCoursesState, setAllCoursesState] = useState(AllCourses);
  const [AllCoursesStateCheced, setAllCoursesStateCheced] = useState();
 
  
  
  const [ChecedUsers, setCheckedUsers] = useState([]);
  const [AllUsersState, setAllUsersState] = useState(AllCourses);
  const [AllUsersStateCheced, setAllUsersStateCheced] = useState();

  useEffect(() => {
    setAllCoursesStateCheced(AllCourses);
    setAllCoursesState(AllCourses);
  }, [AllCourses]);

  useEffect(() => {
    setAllUsersStateCheced(users);
    setAllUsersState(users);
  }, [users]);

  const handleCheckUSers = (id) => {
    setAllUsersState((prevCourses) => {
      // Update the checked status of the course
      const updatedusers = prevCourses.map((user) =>
        user.id === id
          ? { ...user, checked: !user.checked }
          : user
      );

      // Filter the courses that are checked
      const filteredCourses = updatedusers.filter((user) => user.checked);

      // Update the checked courses state
      setCheckedUsers(filteredCourses);

      // Return the updated state for the courses
      setAllUsersStateCheced(updatedusers);
      return updatedusers;
    });
  };
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if(ChecedUsers.length > 0  && ChecedCourses.length > 0)
      {

        (async () => {
          setLoading(true);
          try {
            const requests = ChecedUsers.flatMap((user) =>
              ChecedCourses.map((course) =>
                axios.post("https://optima-software-solutions.com/apis/usercourses.php", {
                  userId: user.id,
                  courseId: course.courseid
                })
              )
            );
    
            await Promise.all(requests);
            alert("All requests completed successfully!");
          } catch (error) {
            console.log(error);
            alert(error.response.data.error );
          } finally {
            setLoading(false);
          }
        })();
      }
      else{

        alert('choose course and users') 
      }

    console.log(ChecedCourses, ChecedUsers);
  };

  const handleCheck = (courseCode) => {
    setAllCoursesState((prevCourses) => {
      // Update the checked status of the course
      const updatedCourses = prevCourses.map((course) =>
        course.courseid === courseCode
          ? { ...course, checked: !course.checked }
          : course
      );

      // Filter the courses that are checked
      const filteredCourses = updatedCourses.filter((course) => course.checked);

      // Update the checked courses state
      setCheckedCourses(filteredCourses);

      // Return the updated state for the courses
      setAllCoursesStateCheced(updatedCourses);
      return updatedCourses;
    });
  };
  const hndleRemove = (id, type) => {
    if (type === "course") {
      setCheckedCourses((prev) => {
        return prev.filter((course) => course.courseid !== id);
      });
  
      setAllCoursesState((prev) => {
        return prev.map((course) => {
          return course.courseid === id ? { ...course, checked: false } : course;
        });
      });
  
      setAllCoursesStateCheced((prev) => {
        return prev.map((course) => {
          return course.courseid === id ? { ...course, checked: false } : course;
        });
      });

    } else {
      setCheckedUsers((prev) => {
        return prev.filter((user) => user.id !== id);
      });
  
      setAllUsersStateCheced((prev) => {
        return prev.map((user) => {
          return user.id === id ? { ...user, checked: false } : user;
        });
      });
  
      setAllUsersState((prev) => {
        return prev.map((user) => {
          return user.id === id ? { ...user, checked: false } : user;
        });
      });
    }
  };
  
  return (
    <StanderdBox
      sx={{
        bgcolor: "#fff",
        borderRadius: "10px",
        width: "100%",
        height: "60%",
        overflow:"auto"
      }}
    >
      <CssBaseline />
     <Box sx={{
      margin:"0 1rem",
      display: "flex",
      flexDirection:"column",
      justifyContent:"flex-start",
      alignItems:"flex-start",
      width:"100%"
     }}>
<Typography
 component={"p"}
 variant="h4"
 >
  {page}
</Typography>
      <Box
        className="Holder"
        sx={{
          width:"100%",
          gap: "1rem",
          borderRadius: "10px",
          margin: "0px auto",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            height: " 60vh",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            width: "40%",
            borderRadius: "6px",

            bgcolor: "#fff",
            boxShadow: "3px 3px 3px #dedede",
            padding: "1rem",
            overflow: "auto",
          }}
          margin={".2rem  0 0 0"}
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
            <AutoCompleteSearch
            AllUsersStateCheced={AllUsersStateCheced}
                AllUsersState={AllUsersState}
                setAllUsersState={setAllUsersState}

               user={true}
            />
    

          </Box>
          <StyledFormGroup
            sx={{
              overflow: "auto",

              width: "100% !important",
            }}
          >
            {AllUsersState?.map((itemC) => (
              (itemC.access === "instructor" ||itemC.access === "Instructor" || itemC.access === "Staff"  ||  itemC.access ===  "Staff")&&<Box
                key={`user-${itemC.id}`}
                sx={{
                  width: "98%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <FormControlLabel
                      onClick={() => handleCheckUSers(itemC?.id, "user")}

                  sx={{
                    textAlign: "left",
                    width: "100%",
                  }}
                  control={
                    <Checkbox
                      id={itemC?.id}
                      checked={itemC?.checked}
                      style={{
                        transition: ".3s",
                        color: itemC?.checked ? "#ff5c00" : "#545454",
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="subtitle2"
                      sx={{
                        transition: ".3s",

                        cursor: "pointer",
                        color: itemC?.checked ? "#ff5c00" : "#545454",
                      }}
                      onClick={() => handleCheckUSers(itemC?.id, "user")}
                    >
                      {`${itemC.first_name} ${itemC.last_name}`}
                    </Typography>
                  }
                />
              </Box>
            ))}
          </StyledFormGroup>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: " 60vh",
          }}
          className="Courses"
        >
          <Box
            sx={{
              width: "100%",

              height: " 60vh",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
              borderRadius: "6px",

              bgcolor: "#fff",
              boxShadow: "3px 3px 3px #dedede",
              padding: "1rem",
              overflow: "auto",
            }}
            margin={".2rem  0 0 0"}
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
              <AutoCompleteSearch
                AllCoursesStateCheced={AllCoursesStateCheced}
                AllCoursesState={AllCoursesState}
                setAllCoursesState={setAllCoursesState}
              />
            </Box>
            <StyledFormGroup
              sx={{
                overflow: "auto",
                textAlign: "left",
                width: "100% !important",
              }}
            >
              {AllCoursesState.map((itemC) => (
                (itemC.iscompleted !== "Course completed")&&<Box
                  key={`course-${itemC.courseid}`}
                  sx={{
                    width: "98%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <FormControlLabel
                        onClick={() => handleCheck(itemC.courseid)}

                    sx={{
                      textAlign: "left",
                      width: "98%",
                    }}
                    control={
                      <Checkbox
                        id={itemC.courseid}
                        checked={itemC.checked}
                sx={{ color: "#111", '&.Mui-checked': { color: "#ff5c00" } }}

                        style={{
                          transition: ".3s",
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="subtitle2"
                        sx={{
                          transition: ".3s",
                          cursor: "pointer",
                          color: itemC.checked ? "#ff5c00" : "#545454",
                        }}
                        onClick={() => handleCheck(itemC.courseid)}
                      >
                        {`${itemC.coursename} ${itemC.abbreviation}`}
                      </Typography>
                    }
                  />
                </Box>
              ))}
            </StyledFormGroup>
          </Box>
        </Box>

      </Box>
      <Box
      sx={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        gap:"2rem",
                bgcolor:"#fff",
margin:" .5rem 0 ",
width:"100%",

                boxShadow:"3px 3px 1px #dedede",
      }}
      >
           
              <List
              sx={{
                borderRadius:"10px",
                display:"flex",
        justifyContent:"flex-start",
        alignItems:"flex-start",
                overflow:"auto",
                height:"10rem",
               width:"25em",
                
                flexDirection:"column",
              }}
              >
        {ChecedUsers.map((item) => {
        
          return <ListItem key={item.id}>
          <Typography
          sx={{
            width:"100%",
            margin:" 0 .5rem 0 0 "
          }}
          >
  { item.first_name + " " + item.last_name}

          </Typography>
          <StyledMainBtn
          width = "fit-content"
          colorProp = "#f02"
          sx={{
            color:"#fff",
          }}
          onClick={()=>hndleRemove(item.id , 'user')}
          >
      Delete
          </StyledMainBtn>
          </ListItem>
        
        
        })}
               
              </List>


              <ArrowForwardIosIcon
        sx={{
          alignSelf:"center",
          color:"#ff5c00",
          fontSize:"2.4rem",
        }}

              />
              <List
              sx={{
                borderRadius:"10px",


                display:"flex",
        justifyContent:"flex-start",
        alignItems:"flex-start",
                overflow:"auto",
                height:"10rem",
               width:"30rem",
                flexDirection:"column",
              }}
              >
        {ChecedCourses.map((item) => {
        
          return <ListItem key={item.courseid}>
          <Typography
          sx={{
            width:"100%",
            margin:" 0 .5rem 0 0 "
          }}
          >
  {  item.coursename}

          </Typography>
          <StyledMainBtn
          width = "fit-content"
          colorProp = "#f02"
          sx={{
            color:"#fff"
          }}
          onClick={()=> hndleRemove(item.courseid , "course")}
          >
      Delete
          </StyledMainBtn>
          </ListItem>
        
        
        })}
               
              </List>
              <Box
              sx={{
                margin:"1rem 0 ",
                gap:"1rem",
                display:"flex",
                justifyContent:"flex-start",
                alignItems:"flex-start",
                alignSelf:"flex-start",
                flexDirection:"column"
              }}
              >


<StyledMainBtn
colorProp={"#fff"}
onClick={()=> handleClick()}
sx={{
  color:"#ff5c00",
    border:"2px solid #ff5c00",
  alignSelf:"flex-start",
  padding:".5rem .8rem",
  
}}

width={"8rem"}
>
{loading ? 
  <CircularProgress 
    sx={{
      color:"#ff5c00"
    }}
  />
:"submit"
 }
  
</StyledMainBtn>


              </Box>
      </Box>
      </Box>

    </StanderdBox>
  );
};

export default AssignCourses;
