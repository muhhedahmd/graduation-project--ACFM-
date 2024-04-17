import { Box,Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import InfoSection from './InfoSection'

const ProfileInfo = () => {
  const   AssignedCourse = ["math1 " , "math2" , "math3" , "physics2" ] 
  const isMd = useMediaQuery((theme)=> theme.breakpoints.down('md'))
  return (
    <Box
    className="MainContainer"
    sx={{
        width:"auto",
        display:"flex",
        justifyContent:"space-between"
        ,alignItems:"flex-start",
        flexDirection:`${isMd ? "column" : "row"}`
        
    }}
    
    >

    <Box

    sx={{
        width:"auto",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        
        gap:"1rem",
        flexDirection:"column"
    }}
    >

    <Typography
    variant='h6'
    fontWeight={"bold"}
    >
    User Info

    </Typography>

    
    <InfoSection Title={"First Name :"} info={"Khaled"} />
    <InfoSection Title={"Secound Name :"} info={"Mohamed"} />
    <InfoSection Title={"Email :"} info={"123@gmail.com"} />
    <InfoSection Title={"Password :"} info={"*****"} />
    <InfoSection Title={"Access :"} info={"Instractor"} />
    
    <InfoSection Title={"Courses :"} info={AssignedCourse} />
    <InfoSection Title={"About :"} info={"loremmponwniwpn knoeniwqio inpnip"} />



    </Box>
    </Box>
  )
}

export default ProfileInfo