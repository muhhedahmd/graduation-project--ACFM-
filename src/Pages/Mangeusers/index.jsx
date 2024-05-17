import React, { createContext, useRef, useState } from 'react'
import StanderdBox from '../../Components/StanderdBox'
import {Box, Typography} from '@mui/material'
import ManageUserHeader from './ManageUserHeader'
import UsersTable from './USersTable'

export const SearchContext = createContext();

const Mangeusers = ({page}) => {
  const [searchResults, setSearchResults] = useState("");


  const SearchRef = useRef()


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
  <UsersTable    SearchRef={SearchRef}  NoSearch={true}/>

      </Box>


      </Box>
    </StanderdBox>
    </SearchContext.Provider>
  )
}

export default Mangeusers