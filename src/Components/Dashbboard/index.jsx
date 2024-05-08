import { Box, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FilesTable from './FilesTable'
import UploadAndDeleteSection from './UploadAndDeleteSection'
import Watch from './Watch'
import { useTheme } from '@emotion/react'
import { useFile } from '../Contexts/FileContext'
import axios from 'axios'
import UseAuth from '../Contexts/Authantication'
import { useCourseContext } from '../Contexts/CourseContexts'


const Dashbboard = ({page}) => {
  const {Data} = UseAuth()
  const {MainDrawerCourse} = useCourseContext()
  const [FilesState , setFilesState] = useState()
    useEffect(()=>{
      (async ()=>{
        try {
            const response = await axios.post("https://optima-software-solutions.com/apis/filesshow.php" , 
              {
                "userid": Data.user.id,
                "courseid":  MainDrawerCourse.courseid,
                "category": "notes"
            }
            )
            setFilesState(response.data)
            console.log( "Files"+ page ,response.data)

        } catch (error) {
          console.log( "Files"+ page ,error)

            console.log(error)
        }
      })()
    },[Data.user.id, MainDrawerCourse.courseid, page])
  const {state} = useFile()

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  return (
<Box
sx={{
  width:"100%",
  display:"flex",
            overflow: "hidden",
            maxHeight:"85vh",
            // margin:"1rem 0  0 0 ",
    borderRadius: "4px",
    flexDirection:"row",
    height:"-webkit-fill-available"

}}
>
<Box
sx={{
  height:"100%",
  width:`${isSm ? "100%": "75%"}`,
}}
>



<Box
sx={{

height:"100%",

  
  m: `${isSm ? "0": "0 1rem 0 0 "}`
}}
>

<FilesTable state={[]}/>

</Box>

</Box>

<Box
sx={{
  
  margin:"0 0  0 .4rem",

    flexDirection:"column",
    display:`${isSm ? "none": "flex"}`,
    justifyContent:"flex-end",
    alignItems:"flex-end",
    height:"100%",
    width:"25%"
}}
>


<Watch/>

<UploadAndDeleteSection page={page}/>

</Box>
  
</Box>

  )
}

export default Dashbboard