
import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import Header from '../../Components/Header'
import MainDrawer from '../../MainDrawer'
import Dashbboard from '../../Components/Dashbboard'

const MaterailPage = ({page}) => {
  const isSm = useMediaQuery((theme)=>theme.breakpoints.down("lg"))
  
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

      <Box
      sx={{
        padding:".5rem",
        gap:".5rem",
        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        // gap:".5rem"
      }}
      >
  <Typography
  variant='h5'
  component={"p"}
  >
      {page}
  </Typography>
      <Dashbboard page={page}/>
      </Box>

    </Box>

    </Box>
  )
}

export default MaterailPage