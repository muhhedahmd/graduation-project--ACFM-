import { Box, FormGroup, FormLabel} from '@mui/material'
import React from 'react'
import CustomAutocomplete from '../../MainDrawer/AutoComplete'
import Btn from '../../Components/Btn'
import { useUserContext } from '../../Components/Contexts/UserContext'
import { useSemester } from '../../Components/Contexts/SemesterContext'

const AssignCourses = () => {
  const {state } = useUserContext()
  const  {semesterState}= useSemester()



  return (
    <Box sx={{
        width:"100%",
        transition:".3s"
    }}>
    <form
    style={{
        width:"100%",
        display:"flex",
        flexDirection:"column",
        gap:"1rem",
    }}
    >
    <FormGroup>

        <FormLabel
        htmlFor='Users'
        variant='body1'
        component={"p"}
        sx={{
            textAlign:"start",
            color:"#6e6e6e"
        }}
        >
        Select a user 

        </FormLabel>   
        <CustomAutocomplete id="Users" options={state} isexpand={"true"} />
    </FormGroup>
    <FormGroup>

        <FormLabel
        htmlFor='Course'
        variant='body1'
        component={"p"}
        sx={{
            textAlign:"start",
            
            color:"#6e6e6e"

        }}
        >
        Select courses

        </FormLabel>   
        <CustomAutocomplete id="Course" options={semesterState} isexpand={"true"} />
    </FormGroup>
        
            <Btn 
            sx={{
                margin: "1rem 0 0 0 !important"
            }}
            >
                Submit
            </Btn>
    </form>
        

    </Box>
  )
}

export default AssignCourses