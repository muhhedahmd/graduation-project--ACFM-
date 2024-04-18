import { Box, FormGroup, FormLabel} from '@mui/material'
import React, { useState } from 'react'
import CustomAutocomplete from '../../MainDrawer/AutoComplete'
import { useUserContext } from '../../Components/Contexts/UserContext'
import { useSemester } from '../../Components/Contexts/SemesterContext'
import { StyledMainBtn } from '../../MainDrawer/style'

const AssignCourses = () => {
    const [selectUser , SetselectUser] = useState()
    const [selectCourse , SetselectCourse] = useState()

    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        
        // Perform form submission logic here, such as sending data to the server
        
        // Example:
        console.log("Selected user:", selectUser);
        console.log("Selected course:", selectCourse);
    };

  const {state } = useUserContext()
  const  {semesterState}= useSemester()



  return (
    <Box sx={{
        width:"100%",
        transition:".3s"
    }}>
    <form
    onSubmit={handleFormSubmit}
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
        <CustomAutocomplete SetselectUser={SetselectUser} id="Users" options={state} isexpand={"true"} />
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
        <CustomAutocomplete SetselectCourse={SetselectCourse} id="Course" options={semesterState} isexpand={"true"} />
    </FormGroup>
        
            <StyledMainBtn
            type='submit'

            sx={{
                margin: "1rem 0 0 0 !important"
            }}
            >
                Submit
            </StyledMainBtn>
    </form>
        

    </Box>
  )
}

export default AssignCourses