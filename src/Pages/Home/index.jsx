import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import Header from '../../Components/Header'
import MainDrawer from '../../MainDrawer'

const Home = () => {
  const isSm = useMediaQuery((theme)=>theme.breakpoints.down("md"))
  
  return (
    <Box>
    <Header/>
      {!isSm ? 
    <MainDrawer/>
      :""
      }
    
    </Box>
  )
}

export default Home