import { Box, Typography } from '@mui/material'
import React from 'react'

const CourseInfoCard = ({key , courseName , courseCode , creditHours , program }) => {
  return (
    <Box
    key={key}
    margin={"1rem"}
    >
  
    <Typography >
    course Name: {courseName}
  
    </Typography>
  
    <Typography >
    course Code: {courseCode}
  
    </Typography>
  
    <Typography >
    credit Hours: {creditHours}
  
    </Typography>
  
    <Typography >
  
    program: {program}
    </Typography>
    <Typography >
  
    Total Mark: {creditHours === 3  ? 150 :creditHours === 4 ? 200 : 100  }
    </Typography>
    </Box>
  )
}

export default CourseInfoCard