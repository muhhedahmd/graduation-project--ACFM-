import { useTheme } from '@emotion/react'
import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import uploadIcon from '../../Components/Dashbboard/file-add.svg';
import PopupRequriredFiles from './PopupRequriredFiles';


const RequiredFiles = () => {
  const [active , setActive] = useState(false)
    const theme = useTheme()

  
      
  return (
<>

    <Button
    

      onClick={()=>setActive(()=>true)}
    component="label"
    role="button"
    variant="contained"
    tabIndex={-1}
    startIcon={
      <>
        <Box>
          <img src={uploadIcon} alt="" />
          <Typography p={"0 .3rem"} variant="caption" component={"P"} color={"#888"}>
            click here to upload or drag and drop files here
          </Typography>
        </Box>
      </>
    }
    sx={{
      minHeight:"7rem",
      borderRadius: "11px",
      position: "relative",
      width: "100%",
      height: "40%",
      boxShadow: "3px 3px 5px #dedede",
      background: theme.palette.background.paper,
      p: "0",
      ":hover , :focus": {
        bgcolor: "#fff",
      },
    }}
  >

    <Typography
      sx={{
        position: "absolute",
        color: "#333",
        top: "1rem",
        left: "1rem",
        fontSize: ".8rem",
        fontWeight: "bold",
        letterSpacing: ".5px",
      }}
      variant="caption"
      component={"p"}
    >
      Upload Files
    </Typography>
  </Button>
  <PopupRequriredFiles setActive={setActive} active={active}/>
  
</>
  )
}

export default RequiredFiles