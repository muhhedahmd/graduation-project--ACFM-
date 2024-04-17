import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import UserFile from './UserFile'
import ProfileInfo from './ProfileInfo'

const ProfileBody = () => {
  const isSm = useMediaQuery(theme=>theme.breakpoints.down("md")) 
  return (
    <Box
    sx={{
        p:"1rem",
        pt:"3rem",
       display:"flex",
       justifyContent:"flex-start",
       width:"100%",
       alignItems:"flex-start",
       flexDirection:`${isSm?"column": "row"}`,
       gap:"1rem",
       overflow:"auto"
       
    }}
    >
    <ProfileInfo/>

            <UserFile/>

    </Box>
  )
}

export default ProfileBody