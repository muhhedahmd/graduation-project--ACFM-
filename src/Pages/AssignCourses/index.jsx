import React, { useEffect, useState } from "react";
import StanderdBox from "../../Components/StanderdBox";
import {
  Box,
  CssBaseline,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import AssignCoursesBox from "./AssignCoursesBox";
import axios from "axios";
import { useAcademicYear } from "../../Components/Contexts/AcadmicYearContext";

import {motion} from 'framer-motion';
const AssignCourses = ({ page }) => {
  const [selctedCourse , SetSelectedCourse] = useState([])

  const [AllCourses, setAllCourses] = useState();
  useEffect(() => {
    (async () => {
      await axios
        .get("https://optima-software-solutions.com/apis/courseshowall.php")
        .then((res) => {setAllCourses(res.data)
        console.log( "res.data", res.data)
        })
        .catch((err) => console.error(err));
    })();
    console.log("all" , AllCourses)
  }, []);

  return (
    <StanderdBox
      style={{
        width: "56%",
      }}
    >
      <CssBaseline />
      <Box
        className="Main-Holder"
        sx={{
          borderBottom: "2px solid #ff5c00",

          overflow: "auto",
          borderRadius: "6px",
          width: "58%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography textAlign={"left"} variant="h5" component={"p"}>
          {page}
        </Typography>

        <AssignCoursesBox selctedCourse={selctedCourse} AllCourses={AllCourses} />
      </Box>

      <Box
        sx={{
          boxShadow: "1px 3px 4px #dedede",
          bgcolor:"#fff00000",
          margin: ".5rem .5rem",
          maxHeight: "91vh",
          overflow: "auto",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <List
          sx={{
            display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    
}}
        >
          {AllCourses?.map((Course) => {
            
             return (
                <motion.div
                onClick={()=>SetSelectedCourse([{...Course}])}
           
           whileHover={{
                  background:"rgb(225 225 225)"
                }}
                whileTap={{
                  background:"rgb(245 245 245)"
                  
                }}

                style={{
                  cursor:"pointer",
                  width:"100%",
                  boxShadow:"3px 3px 4px #fff",
                    background:"#fff",
           
                    
                }}
                key={Course.id}

                >

                <ListItem
                
                  sx={{
                    
                    boxShadow:"3px 3px 4px #ddeded",
                    borderRadius:"6px",
                    padding: ".5rem",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    gap: ".5rem",
                    width:"100%"
                  }}
                >
                  <Typography>coursename: {Course.coursename}</Typography>
                  <Typography>
                  semester: {Course.semester }
                  </Typography>
                  <Typography>
                    Status:{" "}
                    {Course.iscompleted === "1" ? "completed" : "incomplete"}
                  </Typography>
                  <Typography>academic year :{Course.academicyear}</Typography>
                               </ListItem>
                </motion.div>

              );
            } 
          )}
        </List>
      </Box>
    </StanderdBox>
  );
};

export default AssignCourses;
