import { Box, FormGroup, FormLabel, Typography} from '@mui/material'
import React, { useState } from 'react'
import CustomAutocomplete from '../../MainDrawer/AutoComplete'
import { StyledMainBtn } from '../../MainDrawer/style'
import { useUserContext } from '../../Components/Contexts/UserContexts'
import { useCourseContext } from '../../Components/Contexts/CourseContexts'
import axios from 'axios'

const AssignCoursesBox = () => {
    const {users } = useUserContext()
    const  {courses}= useCourseContext()
    console.log(courses)
  
    const [selectUser , SetselectUser] = useState([])
    const [selectCourse , SetselectCourse] = useState([])
    const [msg , setMsg] = useState()
    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        if (selectCourse.length && selectUser?.id) {
            const userId = String(selectUser.id);
    
            try {
                for (const course of selectCourse) {
                    await axios.post("https://optima-software-solutions.com/apis/usercourses.php", {
                        'userId': userId,
                        'courseId': course.courseid
                    }).then((res) => setMsg(res.data))
                      .catch((err) => setMsg(err.response.data));
                }
            } catch (error) {
                console.error('Error while posting user courses:', error);
                setMsg('Error while posting user courses')
            }
        } else {
            setMsg("Choose the user and course/s");
        }
    };
    





  return (
    <Box sx={{
        width:"100%",
        transition:".3s"
    }}>
  <Typography
    sx={{
        color:"#f01",
    }}
  >
    {msg}
  </Typography>
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
        <CustomAutocomplete SetselectUser={SetselectUser} id="Users" options={users&&users} isexpand={"true"} />
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
        <CustomAutocomplete SetselectCourse={SetselectCourse} id="Course" options={courses} isexpand={"true"} />
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

export default AssignCoursesBox