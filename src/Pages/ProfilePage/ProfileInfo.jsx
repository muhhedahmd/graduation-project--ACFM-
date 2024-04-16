import { Avatar, Box,Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import InfoSection from './InfoSection'
import UserFile from './UserFile'

const ProfileInfo = () => {
  const   AssignedCourse = ["math1 " , "math2" , "math3" , "physics2" ] 
  const isMd = useMediaQuery((theme)=> theme.breakpoints.down('md'))
  return (
    <Box
    className="MainContainer"
    sx={{
        width:"100%",
        display:"flex",
        justifyContent:"space-between"
        ,alignItems:"flex-start",
        flexDirection:`${isMd ? "column" : "row"}`
        
    }}
    
    >

    <Box

    sx={{
        width:"50%",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        
        gap:"2rem",
        padding:"1rem",
        flexDirection:"column"
    }}
    >
    <Box
    
    sx={{
      width:"100%",
      
          display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        
        gap:"2rem",
        padding:"1rem",

    }}
    >
    <Typography
    variant='subtitle2'
    component={"p"}
    >
      Profile image

    </Typography>

    <Avatar
    sx={{
      width:"2rem",
      height:"2rem"
    }}
    
    >
      
    </Avatar>
    </Box>
    
    <InfoSection Title={"About :"} info={"loremmponwniwpn knoeniwqio inpnip"} />
    <InfoSection Title={"First Name :"} info={"Khaled"} />
    <InfoSection Title={"Access :"} info={"Instractor"} />
    <InfoSection Title={"Secound Name :"} info={"Mohamed"} />
    <InfoSection Title={"Email :"} info={"123@gmail.com"} />
    <InfoSection Title={"Password :"} info={"*****"} />
    
    <InfoSection Title={"Courses :"} info={AssignedCourse} />



    </Box>
   <UserFile/>
    </Box>
  )
}

export default ProfileInfo