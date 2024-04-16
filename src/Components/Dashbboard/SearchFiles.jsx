import { useTheme } from '@emotion/react'
import { Box, Button, Drawer, FormControl, Input, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import UploadAndDeleteSection from './UploadAndDeleteSection';
import Watch from './Watch';

const SearchFiles = () => {
    const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
const [open , setOpen] = useState(false)

  return (
    <Box
    sx={{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:".5rem",
    }}
    >

    <form
    style={{
      display:"flex",
      justifyContent:"flex-start",
      alignItems:"center",
      background: theme.palette.background.paper,

      padding: ".5rem .5rem .5rem .7rem",
width: "100%",
margin: "0 0 .5rem  0px",
boxShadow: "rgb(222, 222, 222) 3px 3px 4px",
height: "12%",
borderRadius: "9px",

    }}
    action="#"
    onSubmit={(e) => e.preventDefault()}
  >
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "nowrap",
        flexDirection: "row",
      }}
    >
      <FormControl
        sx={{
          width: "100%",
        }}
      >
        <Input fullWidth type="text" placeholder="Search files" />
      </FormControl>
      <Button

      sx={{
        padding:"0",
        minWidth:"fit-content",
      color: theme.palette.primary.paper,
      }}
       type="submit">
        <SearchRoundedIcon />
      </Button>
      <Button
                sx={{
                  minWidth:"fit-content",

      color: theme.palette.primary.paper,
      }}
       type="Button">
        <SortRoundedIcon />
      </Button>
    </Box>
  </form>
  {
    isSm ?

  <Box>
  <Button
  onClick={() => setOpen(true)}
  sx={{

    bgcolor:"#fff",
    color:"#333",
    padding: ".9rem",
width: "100%",
margin: "0 .5rem .5rem  0px",
boxShadow: "rgb(222, 222, 222) 3px 3px 4px",
borderRadius: "9px",
height:"100%"
  }}
  >
    Upload
  </Button>
  </Box> :""
  }

  <Drawer
  open={open}
  anchor='right'
  onClose={()=>setOpen(false)}

  
  >
  <Box 
  
  sx={{
    display:"flex",
    flexDirection:"column",
    alignItems:"flex-start"
    ,justifyContent:"flex-start",
    gap:"1rem",
    margin:"1rem 0 0 .5rem ",
    padding:"0rem"
  }}
  >

  <Typography
   variant='h5' component={"p"}>
  Upload And Options
  </Typography>

  <UploadAndDeleteSection Drawer={true}/>
  <Watch/>

  </Box>

  </Drawer>

  </Box>

  )
}

export default SearchFiles