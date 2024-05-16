import { Box,Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import InfoSection from './InfoSection'
import UseAuth from '../../Components/Contexts/Authantication'

const ProfileInfo = () => {
  const {Data} = UseAuth()
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

    
    <InfoSection Title={"First Name :"} info={Data.user.first_name} />
    <InfoSection Title={"Secound Name :"} info={Data.user.last_name} />
    <InfoSection Title={"Email :"} info={Data.user.email} />
    <InfoSection Title={"Access :"} info={Data.user.access} />
    <InfoSection Title={"Phone number :"} info={Data.user.phone_number} />
    
    {/* <InfoSection Title={"Courses :"} info={AssignedCourse} /> */}
    <InfoSection Title={"About :"} info={Data.user.about} />



    </Box>
    </Box>
  )
}

export default ProfileInfo