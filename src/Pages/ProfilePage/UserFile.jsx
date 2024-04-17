import { Box,  Typography } from '@mui/material'
import React from 'react'
import { StyledOptionButton, WrapperFlexBox } from './Style'

const UserFile = () => {
  return (
    <Box
    className='Files'
    sx={{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"flex-start"
        ,gap:"2rem",
        flexDirection:"column",

    }}
    

   
    >
    <Typography 
    role='button'
    sx={{
        color:"#333"
    }}
    variant="h6">
        Files
    </Typography>
   


        
    <WrapperFlexBox
    gap={"2rem"}
    
    
    >
    <Typography
     align='left'
    sx={{
        width:"10rem",
        alignSelf:"flex-start"
    }}
     variant="subtitle1">
        Course Specific
    </Typography>
        <WrapperFlexBox
        className='btnOptions'
        >


    <StyledOptionButton colorTheme={"#ff5c00"}
    >
        show
    </StyledOptionButton>

   <StyledOptionButton
   colorTheme={"#28b7af"}
   >

        Change
   </StyledOptionButton>

        </WrapperFlexBox>
    
    </WrapperFlexBox>
    <WrapperFlexBox
    gap={"2rem"}
    
    
    >
    <Typography
    align='left'
    sx={{
        width:"10rem",
        alignSelf:"flex-start"
    }}
     variant="subtitle1">
    User Resmu
    </Typography>
        <WrapperFlexBox
        className='btnOptions'
        >


    <StyledOptionButton colorTheme={"#ff5c00"}
    >
        show
    </StyledOptionButton>

   <StyledOptionButton
   colorTheme={"#28b7af"}
   >

        Change
   </StyledOptionButton>

        </WrapperFlexBox>
    
    </WrapperFlexBox>
    <WrapperFlexBox
    gap={"2rem"}
    
    
    >
    <Typography
     align='left'
    sx={{
        width:"10rem",
        alignSelf:"flex-start"
    }}
     variant="subtitle1">
        Course syllabus
    </Typography>
        <WrapperFlexBox
        className='btnOptions'
        >


    <StyledOptionButton colorTheme={"#ff5c00"}
    >
        show
    </StyledOptionButton>

   <StyledOptionButton
   colorTheme={"#28b7af"}
   >

        Change
   </StyledOptionButton>

        </WrapperFlexBox>
    
    </WrapperFlexBox>



    </Box>
  )
}

export default UserFile