import { Box, SvgIcon, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

const InfoBoxes = ({title , icon ,value , percent}) => {

    console.log( title, value , percent)
  const isSm = useMediaQuery((theme)=> theme.breakpoints.down("md"))

  return (
    <Box
    sx={{
        display:"flex",
        flexDirection:"column",
        gap:".5rem",
        textAlign:"start",
        height:"6rem",
        borderRadius:"5px",
      width:`${isSm ?"100%" :"20%" }`,


    padding: '1rem 1rem 1rem 1rem',
        boxShadow:"4px 2px 4px #dedede",
        bgcolor:"#fff",
    }}
     >

     <Box
     sx={{
        width:"100%",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
     }}
     >
        <Typography
        variant='body2'
        component={"p"}
        >
            {title}
        </Typography>
        <SvgIcon
        sx={{
            padding:"0",
            margin:"0"
        }}
        variant='body2'
        component={"p"}
        >
            {icon}
        </SvgIcon>
     </Box>
     <Box
     className='Value'
     sx={{
      display:"flex",
      width:"100%",
      justifyContent:"space-between",
      alignItems:"center",
      // padding:" 0 .5rem",
     }}
     >
     <Typography
        variant='body2'
        component={"p"}

        sx={{
            fontSize:" 1rem",
    fontWeight: "500",
        }}
     
     >
     {value}

     </Typography>
     <Typography
        variant='body2'
        component={"p"}

        sx={{
            fontSize:" .9rem",
    fontWeight: "600",
        }}
     
     >
     {(+percent)  ? percent+"%":  "0%"} 

     </Typography>

     </Box>


    </Box>
  )
}

export default InfoBoxes