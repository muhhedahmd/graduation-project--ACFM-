import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import FilesTable from './FilesTable'
import UploadAndDeleteSection from './UploadAndDeleteSection'
import Watch from './Watch'
import { useTheme } from '@emotion/react'


const Dashbboard = () => {
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
    margin:" 2rem 1rem   0rem 1rem",
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

{/* <InfoBoxes/> */}
<FilesTable/>

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
<UploadAndDeleteSection/>

</Box>
</Box>

  )
}

export default Dashbboard