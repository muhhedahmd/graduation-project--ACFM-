import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableOfUSersCard from './TableOfUSersCard'
import CourseOptions from './CourseOption'


const TableOFUsers = ( {AcadmicYearData}) => {

  const [  CourseOption , setCourseOption] = useState('')
  useEffect(()=>{
    setCourseOption(Object.keys((reformatData(AcadmicYearData)))[0] &&Object.keys((reformatData(AcadmicYearData)))[0]  )
  },[AcadmicYearData])
  function reformatData(data) {
    // Create an object to store courses and their corresponding users
    const courses = {};
  
    // Iterate over each item in the data array
    data.forEach(item => {
      const { user, course } = item;
      const { coursename } = course;
  
      // If the course already exists in the courses object, add the user to its array
      if (courses[coursename]) {
        courses[coursename].push(user);
      } else {
        // If the course doesn't exist, create a new array with the user and add it to the courses object
        courses[coursename] = [user];
      }
    });
  
    // Convert the courses object into an array of objects
    const coursesArray = Object.keys(courses).map(courseName => ({
      course: courseName,
      users: courses[courseName]
    }));
  
    return coursesArray;
  }

  
  return (
    <Box

    padding={"1rem"}
    sx={{width:"100%",
    position:"relative",
    bgcolor:"#fff",
boxShadow:"3px 3px 4px #dedede",
      display:"flex" , 
    flexDirection:"column" , justifyContent:"flex-start" , alignItems:"center"}}

    >
    <CourseOptions 
      values={ reformatData(AcadmicYearData).map((item)=>{
          return item.course
      })}

      setCourseOption={setCourseOption} 
       CourseOption={CourseOption}
    />
    
    <TableOfUSersCard border={"#FF4F0F"} name={"name"} email={"email" } role={"role"}  type={"type"} optionText={"option"}/>
    <Box
    sx={{
      height: '8rem',
    overflow: 'auto',
    width: '101%',
    padding: '0 0.4rem',
    }}
    >

    { reformatData(AcadmicYearData).map((item)=>
      item.course === CourseOption ? 
      item.users.map((user)=>{
      return <TableOfUSersCard key={user.id} id={user.id} border={"#333"} role={user.access} name={user.firstName + " "+ user.lastName} email={user.email}   option={"option"}/>

      })
        :""
    )}
    </Box>
    </Box>
  )
}

export default TableOFUsers