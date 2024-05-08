import React, { createContext, useRef, useState } from 'react'
import StanderdBox from '../../Components/StanderdBox'
import {Box, Typography} from '@mui/material'
import ManageUserHeader from './ManageUserHeader'
import { useUserContext } from '../../Components/Contexts/UserContext'
import UsersTable from './USersTable'

export const SearchContext = createContext();

const Mangeusers = ({page}) => {
  const [searchResults, setSearchResults] = useState("");


  const SearchRef = useRef()

  const {state} = useUserContext()
  return (
    <SearchContext.Provider value={{searchResults}}>

    <StanderdBox>
      <Box 
      sx={{
        position:"relative"
      }}
      className='Main-Holder'
      >

      <Typography
      align='left'
      variant='h5'
      component={"p"}
      >
{page} & Courses
      </Typography>
        <ManageUserHeader setSearchResults={setSearchResults}  ref={SearchRef}/>
      <Box

      >
  <UsersTable    SearchRef={SearchRef}  state={state} NoSearch={true}/>

      </Box>


      </Box>
    </StanderdBox>
    </SearchContext.Provider>
  )
}

export default Mangeusers