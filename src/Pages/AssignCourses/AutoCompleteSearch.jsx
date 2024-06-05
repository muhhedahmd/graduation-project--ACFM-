import { Box, Input } from "@mui/material"
import { useEffect, useState } from "react"


import React from 'react'
import { Button, FormControl } from '@mui/material'
import { useTheme } from "@emotion/react"
import SortPopergolabal from "./SortPopergolabal"
const AutoCompleteSearch = ({
    
    AllUsersStateCheced,
    AllUsersState,
setAllUsersState,
    
    isClear ,AllCoursesState  , AllCoursesStateCheced , setAllCoursesState , HandleSelectAll , user}) => {

    const theme = useTheme()
    const [inpVal ,setInpVal] = useState("")

    useEffect(()=>{
        setInpVal('')
    },[isClear])


    const handleChange = (e) => {
      const { value } = e.target;
        setInpVal(value);

        if(user){
            const regex = new RegExp(value, "i");
            const filteredData = AllUsersState.filter((item) => regex.test(item.first_name) || regex.test(item.last_name));
            if (value) {
                setAllUsersState(filteredData);
            } else {
                setAllUsersState(AllUsersStateCheced);
            }
        }
        else {

            const regex = new RegExp(value, "i");
            const filteredData = AllCoursesState.filter((item) => regex.test(item.coursename) || regex.test(item.abbreviation));
            if (value) {
                setAllCoursesState(filteredData);
            } else {
                setAllCoursesState(AllCoursesStateCheced);
            }
        }
    };

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
      disableRipple
      disableTouchRipple
                sx={{
                  bgcolor:"#fff !important",

      }}
      color="secondary"
       type="Button">
       

        <SortPopergolabal 
        AllCoursesStateCheced={AllCoursesStateCheced}
SelectedSate={AllCoursesState}
 setSelectedSate={setAllCoursesState}

        />
      </Button>
      </>

       }
    </Box>
  </form>
  </Box>

  )
}

export default AutoCompleteSearch

  
