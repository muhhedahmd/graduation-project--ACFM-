import React from 'react'
import StanderdBox from '../../Components/StanderdBox'
import {Box} from '@mui/material'
import ManageUserHeader from './ManageUserHeader'
import UsersTable from './USersTable'
const Mangeusers = () => {
  return (
    <StanderdBox>
      <Box 
      
      className='Main-Holder'
      >

        <ManageUserHeader/>
      <Box
      sx={{
        padding:"0 1rem"
      }}
      >
        <UsersTable NoSearch={true} />

      </Box>


      </Box>
    </StanderdBox>
  )
}

export default Mangeusers