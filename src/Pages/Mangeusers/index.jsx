import React from 'react'
import StanderdBox from '../../Components/StanderdBox'
import {Box, Typography} from '@mui/material'
import ManageUserHeader from './ManageUserHeader'
import { useUserContext } from '../../Components/Contexts/UserContext'
import UsersTable from './USersTable'
const Mangeusers = ({page}) => {

  const {state} = useUserContext()
  console.log(state)
  return (
    <StanderdBox>
      <Box 
      
      className='Main-Holder'
      >
      <Typography
      align='left'
      variant='h5'
      component={"p"}
      >
{page} & Courses
      </Typography>
        <ManageUserHeader/>
      <Box

      >
  <UsersTable state={state} NoSearch={true}/>

      </Box>


      </Box>
    </StanderdBox>
  )
}

export default Mangeusers