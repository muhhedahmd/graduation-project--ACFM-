import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import Header from '../../Components/Header'
import MainDrawer from '../../MainDrawer'
import Dashbboard from '../../Components/Dashbboard'

const Home = () => {
  const isSm = useMediaQuery((theme)=>theme.breakpoints.down("md"))
  
  return (
    <Box
    sx={{

      overflow:"hidden",
      height:"100vh",
    }}
    >
    <Header/>
    <Box 
    className='Main'
    sx={{
      height: "100vh",
      display: "flex",
      justifyContent:"flex-start",
      alignItems:"flex-start",
    
    }}
    >

      {!isSm ? 
    <MainDrawer/>
      :""
      }

      <Dashbboard/>

    </Box>

    </Box>
  )
}

export default Home

