import React from 'react'
import StanderdBox from '../../Components/StanderdBox'
import { Box } from '@mui/material'

import HeaderProfile from './HeaderProfile'
import ProfileBody from './ProfileBody'

const ProfilePage = () => {
  return (
    <Box>
    

<StanderdBox

>


    <Box
      className='Main-Holder'
      sx={{
        padding:"0"
      }}
    
    >


  
  {/* <ProfileInfo /> */}
  <HeaderProfile/>

 <ProfileBody/>
  

    </Box>




</StanderdBox>
    </Box>
  )
}

export default ProfilePage