import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

const HeaderProfile = () => {
  return (
   <Box
   sx={{
    position:"relative",

    height:"20vh",
    width:"100%",
    backgroundColor:" #FBAB7E",
backgroundImage: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",

   }}
   >
    <Box
    sx={{
        padding:"1rem",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        borderRadius:"7px",
        width:"95%",
        position:"absolute",
        top:"75%",
        height:"20vh",
        boxShadow:"3px 3px 4px #3434",
        bgcolor:"#fff",
        left:"50%",
        transform:"translate(-50% , -50%)"
    }}
    >
    <Box
    sx={{
        
            flexDirection:"row",
            display:"flex",
            justifyContent:"flex-start",
            alignItems:"flex-start",
            gap:".7rem"

    }}
    className='nameAndImage'
    >

        <Avatar
        sx={{
            width:"5rem",
            height:"5rem",
            
        }}
        >

        </Avatar>
        <Box
        sx={{
            display:"flex",
            alignItems:"flex-start",
            flexDirection:"column",
        }}
        
        >

        <Typography
        sx={{
            
            fontWeight:"800"
        }}
        variant='subtitle1'
        component={"p"}
        >
    Dr: {"khaled Elmenshawy"}


        </Typography>
        <Typography
        sx={{

            fontWeight:"800"
        }}
        variant='subtitle1'
        component={"p"}
        >
    123@o6u.eg.edu


        </Typography>
        <Typography
        sx={{

            fontWeight:"800"
        }}
        variant='subtitle1'
        component={"p"}
        >


    Instractor
        </Typography>
        </Box>
    </Box>

    <Box
    
    
    >



    </Box>
  

        
    </Box>
   </Box>
  )
}

export default HeaderProfile