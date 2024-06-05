import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import EditCourseDialog from "./EditPopup";
import axios from "axios";
import qs from 'qs'
import { useCourseContext } from "../../Components/Contexts/CourseContexts";

const CourseList = ({ LoaderSemster, AcdmicCourses }) => {
  const [OpenCollapse, setOpenCollapse] = useState("");
  const [editCourse, setEditCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState(AcdmicCourses);
    const {fetchAllCourses} = useCourseContext()
  useEffect(()=>{
    setCourseData(AcdmicCourses)
  },[AcdmicCourses])
  const handleEdit = async (_, updatedData) => {
    setIsLoading(true);
  
    // Convert updatedData to form data string
    const formData = qs.stringify(updatedData);
  
    try {
      const response = await axios.put(
        'https://optima-software-solutions.com/apis/courseedit.php',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      if (response.status === 200) {
        setEditCourse(null); // Close the dialog
        fetchAllCourses()
        console.log(response)
    } else {
        console.error('Failed to update the course');
      }
    } catch (error) {
      console.error('Error updating the course:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const DeleteCourse =  (id , name) => {
    (async()=>{
       try{
        await axios.delete(`https://optima-software-solutions.com/apis/coursedelete.php?courseid=${id}`)
        fetchAllCourses()
        alert("course " + name +"is deleted sucessfully")
       }catch(err){
        console.log(err)
       }finally{

       } 
    })()
  }


  return (
    <List
      sx={{
        margin: "0  0 .5rem 0",
        display: "flex",
        justifyContent: "flex-start",
        gap: "1rem",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        maxHeight: "60vh",
        overflow: "auto",
      }}
    >
      {LoaderSemster ? (
        <CircularProgress sx={{ color: 'black' }} />
      ) : (
        courseData.map((course) => (
          <ListItem
            key={course.courseid}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                fontSize: '1.1rem',
                color: '#000',
                letterSpacing: '.5px',
                cursor: 'pointer',
              }}
              onClick={() =>
                setOpenCollapse(
                  OpenCollapse === course.courseid ? null : course.courseid
                )
              }
            >
              {course.coursename}
            </Typography>
            <Collapse in={OpenCollapse === course.courseid} timeout="auto" unmountOnExit>
              <Box>
                <Typography>coursename: {course.coursename}</Typography>
                <Typography>academicyear: {course.academicyear}</Typography>
                <Typography>semester: {course.semester}</Typography>
                <Typography>program: {course.general}</Typography>
                <Typography>iscompleted: {course.iscompleted}</Typography>
                <Typography>abbreviation: {course.abbreviation}</Typography>
                <Typography>bylaw: {course.bylaw}</Typography>
                <Typography>credit hour: {course.credit_hour}</Typography>
                <Typography>lab: {course.teaching_hours_training}</Typography>
                <Typography>level: {course.level}</Typography>
                <Typography>lecture: {course.lecture}</Typography>
                <Typography>practical: {course.practical}</Typography>
                <Typography>
                  classwork: {+course.lecture + +course.teaching_hours_training}
                </Typography>
                <Typography>final: {course.final}</Typography>
                <Button
                  sx={{ color: '#0af',
                  padding:".3rem 1rem",
                  textTransform:"capitalize",
                   border: ' 2px solid #0af' }}
                  onClick={() => setEditCourse(course)}
                >
                  Edit
                </Button>
                <Button
                  sx={{margin:"0 0 0 .5rem" , 
                  padding:".3rem .8rem",
                  textTransform:"capitalize",

                   color: '#f03', border: ' 2px solid #f03' }}
                  onClick={() => DeleteCourse(course.courseid , course.coursename)}
                >
                  Delete
                </Button>
              </Box>
            </Collapse>
          </ListItem>
        ))
      )}
      {editCourse && (
        <EditCourseDialog
        isLoading={isLoading}
          open={Boolean(editCourse)}
          onClose={() => setEditCourse(null)}
          course={editCourse}
          onSave={(updatedCourse) => handleEdit(editCourse.courseid, updatedCourse)}
        />
      )}
    </List>
  );
};

export default CourseList;
