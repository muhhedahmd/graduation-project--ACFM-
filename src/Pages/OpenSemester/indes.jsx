import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Radio,
  Typography,
} from "@mui/material";
import React, { useId, useState } from "react";
import Header from "../../Components/Header";
import { CheckBox } from "@mui/icons-material";
import { orange } from "@mui/material/colors";
import styled from "@emotion/styled";

const StyledFormGroup = styled(FormGroup)(({theme})=>{
    return {
        display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                  overflowY:"auto",
                  maxHeight:"23rem",
                  flexWrap:"nowrap",
                  width:"max-content",
                  '&::-webkit-scrollbar': {
  width: "6px", /* Set the width of the scrollbar */
},

"&::-webkit-scrollbar-thumb" :{
  backgroundColor: "#888", /* Set the color of the scrollbar thumb */
 borderRadius: "3px", /* Set the border radius of the scrollbar thumb */
},

'&::-webkit-scrollbar-thumb:hover': {
  backgroundColor: "#555", /* Set the color of the scrollbar thumb on hover */
},

"&::-webkit-scrollbar-track" :{
  backgroundColor:" #f1f1f1", /* Set the color of the scrollbar track */
  borderRadius: "3px", /* Set the border radius of the scrollbar track */
}
    }
})
const OpenSemester = () => {
  const reset = (obj) => {
    return Object.keys(obj).map((key) => {
      return (obj[key] = false);
    });
  };
  const [Semester, setSemester] = useState({
    Fall: true,
    Spring: false,
    Saummer: false,
  });

  const [users, setUsers] = useState([
    {
      id: useId(),
      Name: "Dr Mohamed ahmed1",
      courses: null,
      Semester: null,
      checked: false,
    },
    {
      Name: "Dr Mohamed ahmed2",
      id: useId(),

      courses: null,
      Semester: null,
      checked: false,
    },
    {
      Name: "Dr Mohamed ahmed3",
      id: useId(),

      courses: null,
      Semester: null,
      checked: false,
    },
    {
      Name: "Dr Mohamed ahmed4",
      id: useId(),

      courses: null,
      Semester: null,
      checked: false,
    },
    {
      Name: "Dr Mohamed ahmed4",
      id: useId(),

      courses: null,
      Semester: null,
      checked: false,
    },
    {
      Name: "Dr Mohamed ahmed4",
      id: useId(),

      courses: null,
      Semester: null,
      checked: false,
    },
    {
      Name: "Dr Mohamed ahmed5",
      id: useId(),
      courses: null,
      Semester: null,
      checked: false,
    },
  ]);

  //

  const handleCheck = (e, setState) => {
    const { id } = e.target;
    setState((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, checked: !user.checked }
          : { ...user, checked: false }
      )
    );
  };

  const handleChange = (e, item, state, setState, onlyOne) => {
    const { checked } = e.target;

    if (onlyOne) {
      const updatedState = {};
      for (const key in state) {
        updatedState[key] = key === item ? checked : false;
      }
      setState(updatedState);
    } else {
      const updatedState = {
        ...state,
        [item]: !state[item],
      };
      setState(updatedState);
    }
  };

  const coursesMock = {
    Fall: [
      {
        id: 1,
        courseName: "Math 1",
        courseCode: "MATH101",
        byLaw: "Required",
        level: "100",
        creditHours: 3,
        semester: "Fall",
        program: "Computer Science",
        instructor: "Dr. Smith",
        schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
        room: "Room 101",
      },
      {
        id: 2,
        courseName: "Physics 1",
        courseCode: "PHY101",
        byLaw: "Required",
        level: "100",
        creditHours: 3,
        semester: "Fall",
        program: "Computer Science",
        instructor: "Dr. Johnson",
        schedule: "Tue, Thu 11:00 AM - 12:30 PM",
        room: "Room 102",
      },
    ],
    Spring: [
      {
        id: 6,
        courseName: "Advanced Programming",
        courseCode: "COMP301",
        byLaw: "Elective",
        level: "300",
        creditHours: 4,
        semester: "Spring",
        program: "Computer Science",
        instructor: "Prof. Brown",
        schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
        room: "Room 201",
      },
      {
        id: 7,
        courseName: "Advanced Software Engineering",
        courseCode: "COMP401",
        byLaw: "Elective",
        level: "400",
        creditHours: 4,
        semester: "Spring",
        program: "Computer Science",
        instructor: "Prof. Davis",
        schedule: "Tue, Thu 11:00 AM - 12:30 PM",
        room: "Room 202",
      },
      // Add more courses here
    ],
    Summer: [
      {
        id: 11,
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
        id: 12,
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
      // Add more courses here
    ],
  };

//   Object.assign({ Summer: { ...coursesMock.Fall, ...coursesMock.Spring } });

const [courses , setCourses] = useState({...coursesMock})

  const theme = useTheme();
  return (
    <Box>
      <Header nosearch={true} bgcolor={"#fff"} />

      <Box
        sx={{
          width: "100vw",
          bgcolor: theme.palette.primary.main,
          padding: "1rem  0 0 0 ",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 7vh)",
          overflow:"hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: "0rem",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <FormGroup
            sx={{
              borderBottom: `2px solid ${theme.palette.primary.paper}`,
              padding: "0 0 .7rem 0",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              margin: "2rem 0 0 0 ",
              gap: "13rem",
            }}
          >
            {Object.keys(Semester).map((ksem) => {
              return (
                <FormControlLabel
                  sx={{
                    display: "flex",
                    flexDirection: "column-reverse",
                  }}
                  key={ksem}
                  control={
                    <Radio
                      checked={Semester[ksem]}
                      id={ksem}
                      component={"p"}
                      onChange={(e) =>
                        handleChange(e, ksem, Semester, setSemester, true)
                      }
                      sx={{
                        fontSize: ".9rem",
                        color: theme.palette.primary.paper,
                        "&.Mui-checked": {
                          color: theme.palette.primary.paper,
                        },
                      }}
                    />
                  }
                  label={ksem}
                />
              );
            })}
          </FormGroup>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "-webkit-fill-available",
            }}
            margin={"1rem  0 0 0"}
            className="HolderUsers&Courses"
          >
            <Box className="Users"
            
            sx={{
                display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                  overflowY:"auto",
                  maxHeight:"23rem",
                  flexWrap:"nowrap",
                  width:"max-content"

            }}
            >
              <StyledFormGroup
             
              >
                {users.map((item) => {
                  return (
                    <FormControlLabel
                      checked={item.checked}
                      id={item.id}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: ".5rem .5rem .5rem  0",
                        gap: "1rem",
                        color: item.checked
                          ? theme.palette.primary.paper
                          : "black", // Change color when checked
                        borderLeft: `3px solid ${
                          item.checked
                            ? theme.palette.primary.paper
                            : "transparent"
                        }`,
                        boxShadow: item.checked
                          ? "2px 4px 5px #dedede"
                          : "none", // Add box shadow when checked
                        transition: ".3s",
                        borderRadius: "6px",
                      }}
                      control={
                        <Box
                          id={item.id}
                          sx={{
                            padding: " 0 .5rem",
                            maxWidth: "auto",
                            width: "max-content",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                          onClick={(e) => handleCheck(e, setUsers)}
                        >
                          <Avatar>
                            <img
                              id={item.id}
                              style={{
                                maxWidth: "2rem",
                              }}
                              src="Images/R.png"
                              alt="R.png"
                            />
                          </Avatar>

                          <Typography
                            id={item.id}
                            sx={{
                              width: "max-content",
                              minWidth: " max-content",
                            }}
                            component={"div"}
                            variant="subtitle2"
                          >
                            {item.Name}
                          </Typography>
                        </Box>
                      }
                    />
                  );
                })}
              </StyledFormGroup>
            </Box>
            <Box className="Courses">
              <StyledFormGroup
          
              >
                {Object.keys(courses).map((itemC) => {
                  return (
                    <FormControlLabel
                      checked={itemC.checked}
                      id={itemC.id}
                      sx={{
                        width: "97%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: ".5rem .5rem .5rem  0",
                        gap: "1rem",
                        color: itemC.checked
                          ? theme.palette.primary.paper
                          : "black", // Change color when checked
                        borderLeft: `3px solid ${
                          itemC.checked
                            ? theme.palette.primary.paper
                            : "transparent"
                        }`,
                        boxShadow: itemC.checked
                          ? "2px 4px 5px #dedede"
                          : "none", // Add box shadow when checked
                        transition: ".3s",
                        borderRadius: "6px",
                      }}
                      control={

                        <Box
                          id={itemC.id}
                          sx={{
                            padding: " 0 .5rem",
                            maxWidth: "auto",
                            width: "98%",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexDirection:"column",
                            flexWrap:"nowrap",
                            gap: "1rem",
                          }}
                          onClick={(e) => handleCheck(e)}
                        >

                          <Typography
                          variant="subtitle1"
                          component={"p"}
                          >
                          {itemC}
                          </Typography>
                          {coursesMock[itemC].map((item) => {
                            return (
                              <Box
                              key={item.item}
                                        sx={{
                                            display:"flex",
                                            justifyContent:"flex-start",
                                            alignItems:"flex-start",
                                            gap:".5rem",
                                            flexWrap:"nowrap",
                                            width:"max-content",
                                        }}
                              >
                              <CheckBox   

                              />
                                <Typography
                                  id={item.id}
                                  sx={{
                                    width: "max-content",
                                    minWidth: " max-content",
                                  }}
                                  component={"div"}
                                  variant="subtitle2"
                                >
                            
                                  {item.courseName} {item.courseCode}
                                </Typography>
                              </Box>
                            );
                          })}
                        </Box>
                      }
                    />
                  );
                })}
              </StyledFormGroup>
            </Box>
          </Box>

          <Button
          sx={{
            
            margin:"1rem  0 2rem 0",
            width:"100%",
            bgcolor:orange[900]
            ,':hover':{

            bgcolor:orange[400]
            }
          }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OpenSemester;
