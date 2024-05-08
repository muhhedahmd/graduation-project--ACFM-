import React from 'react'
import StanderdBox from '../../Components/StanderdBox'
import { Box, CssBaseline, Typography } from '@mui/material'
import AssignCoursesBox from './AssignCoursesBox'

const AssignCourses = ({page}) => {
  return (
    <StanderdBox>
      <CssBaseline />
      <Box     className="Main-Holder"
      sx={{
        borderBottom:"2px solid #ff5c00",

        overflow:"auto",
        borderRadius: "6px",
        width: "90%",
        alignItems:"center",
        justifyContent:"center",
      }}>
      <Typography
      textAlign={"left"}
      variant='h5'
      component={"p"}
      >
        {page}
      </Typography>

<AssignCoursesBox/>
</Box>



    </StanderdBox>
  )
}

export default AssignCourses