import { Box, Input } from "@mui/material"
import { useEffect, useState } from "react"

// import {SortRoundedIcon} from '@mui/icons-material'

import React from 'react'
import { Button, FormControl } from '@mui/material'
import { useTheme } from "@emotion/react"
import SortPopup from "./SortPopup"
import { SelectAll } from "@mui/icons-material"
import { processedCourses } from "../../Components/Semsterdata"
const AutoCompleteUsers = ({ isClear , setSelectedSate , SelectedSate , HandleSelectAll , user}) => {

    const theme = useTheme()
    const [inpVal ,setInpVal] = useState("")

    useEffect(()=>{
        setInpVal('')
    },[isClear])


    const handleChange = (e) => {
      try {
          const { value } = e.target;
          setInpVal(value);
          const regex = new RegExp(value, "i");
          const filteredData = SelectedSate.filter((item) => regex.test(item.code) || regex.test(item.name));
          setSelectedSate(value ? filteredData : processedCourses);
      } catch (error) {
          console.error(`Error occurred: ${error.message}`);
          // You can customize the error handling here (e.g., show a user-friendly message)
      }
  }

  return (

        <Box
    sx={{
        width:"100%",
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
        <Input
        value={inpVal}
         onChange={handleChange} fullWidth type="text" placeholder="Search Courses" />
      </FormControl>
      <Button

      sx={{
        padding:"0",
        minWidth:"fit-content",
      color: theme.palette.primary.paper,
      }}
       type="submit">
      </Button>
       {!user&&
       <>

      <Button

      onClick={()=>HandleSelectAll()}
       sx={{
                  minWidth:"0",

      color: theme.palette.primary.paper,
      }}
      >

       <SelectAll/>
      </Button>
      <Button
      disableRipple
      disableTouchRipple
                sx={{
                  minWidth:"0",

      color: theme.palette.primary.paper,
      }}
       type="Button">
       

        <SortPopup 
SelectedSate={SelectedSate}
 setSelectedSate={setSelectedSate}

        />
      </Button>
      </>

       }
    </Box>
  </form>
  </Box>

  )
}

export default AutoCompleteUsers

  
