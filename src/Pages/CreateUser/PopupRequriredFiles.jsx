import { Close } from '@mui/icons-material'
import { Box, Button,Typography} from '@mui/material'
import React, { useImperativeHandle, useState } from 'react'
import RequiredFilesSingle from './RequiredFilesSingle';
import { forwardRef } from 'react';

const PopupRequriredFiles = forwardRef(({active , setActive} , ref) => {

  const [files , setFiles] = useState({
    specifc:null,
    syllabus:null,
    resmu:null
  })

  useImperativeHandle(ref, () => ({
    files: () => files
  }), [files]);
  return (
    <Box
    className="popup"
    sx={{
      visibility: `${active ? "visible" : "hidden"}`,
      opacity: `${active ? "1" : "0"}`,
      zIndex: `${active ? "0" : "-100"}`,
      height: "100vh",
      width: "100vw",
      backdropFilter: "brightness(.9) blur(2px)",
      transition: ".3s",
      position: "fixed",

      top: "0",
      left: "0",
      bgcolor: "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Box
      sx={{
        // width: `${isSm ? "%" :"40%"}`,
        width:"36rem",
        padding: "1.5rem",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "1.5rem",
        borderRadius: "0  15px  15px 0 ",

        position: "relative",
        ":before": {
          width: ".9rem",
          height: "100%",
          content: '""',
          position: "absolute",
          top: "0",
          left: "-.7rem",
          background: "linear-gradient(45deg, #FF5E03, #FF9A11)",
          borderRadius: "15px 0 0 15px",
        },
      }}
    >
    <Box
    className="flex-space-between-center"
      
    >   
    <Typography
    variant='h6'
    fontWeight={"bold"}
    sx={{
        letterSpacing:"1px"
    }}
    component={"p"} 
    >
    Required files





    </Typography>


      <Button
        sx={{
            minWidth: "auto",
            color:"#333"
        }}

      >

    <Close
    color='"#333'
        onClick={()=>setActive(false)}

    />
      </Button>



    </Box>


    <RequiredFilesSingle   Done={files.specifc}   type={"specifc"} key={1} setFiles={setFiles} title={"Upload Course Specifc"}/>
    <RequiredFilesSingle Done={files.syllabus} type={"syllabus"}  key={1} setFiles={setFiles} title={"Upload course syllabus" }/>
    <RequiredFilesSingle Done={files.resmu}    type={"resmu"} key={1} setFiles={setFiles} title={"Upload doctor resmu" }/>





    </Box>
  </Box>
  )
})

export default PopupRequriredFiles