import { Box } from '@mui/material'
import React from 'react'
import UserFile from './UserFile'
import CourseProgress from './CourseProgress'

const ProfileBody = () => {
  return (
    <Box
    sx={{
        p:"1rem",
        pt:"4rem",
       display:"flex",
       justifyContent:"space-between",
       width:"100%",
       alignItems:"flex-start",
       flexWrap:"wrap",
       flexDirection:"column"
       
    }}
    >

            <UserFile/>

            <CourseProgress/>
    </Box>
  )
}

export default ProfileBody