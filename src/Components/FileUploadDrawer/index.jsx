import { Box, Button, Drawer } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React, { useState } from 'react';

const FileUploadDrawer = () => {
  const [DrawerOpen , setDrawerOpen] =useState(false)
  return (
    <>

    <Box sx={{ overflow: "hidden",
    position:"fixed" ,
    zIndex:1,
    top:"0",
    left:"0",
    width:"100vw",
    height:"100vh"
    
     }}>

     <Box
     sx={{
      transition:".5s",
          cursor: "pointer",
          position: "relative",
          display: "flex",
          transform: "translate(-50% , -50%)",
          padding: "1rem",
          borderRadius: "50%",
          background: "#fff3",
          top:" 50%",
          left: "52.5%;",
          flexDirection: "row-reverse"
        }}
     >
      
    <Box
    sx={{
      position:"relative",
      width: "16rem",
    backgroundColor: "#fff",
    height: "100vh",
    boxShadow: "-4px 0px 10px #e8e8e880"
    }}>


<Button
disableTouchRipple
disableElevation
sx={{
  top: "50%",
    position: "absolute",
    left: "2%",
    padding:" 1rem",
    background: "#ffff",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",

}}
      onClick={()=>setDrawerOpen(prev=>!prev)}
        
      >
        <ArrowBackIosIcon />
      </Button>


    </Box>


     
     </Box>
    </Box>
    </>
  )
};

export default FileUploadDrawer;

{/* <Drawer
transitionDuration={
  start:{
    
  }
}
open={DrawerOpen}
anchor='right'


>
<Box
sx={{
  width:"30rem"
}}
>

</Box>

</Drawer> */}
