import React from 'react'
import StanderdBox from '../../Components/StanderdBox'
import { Box, } from '@mui/material'
import AcdamicYear from './AcdamicYear'
import CoursesGraph from './CoursesGraph'
import TableOFUsers from './TableOFUsers'
import SemsterOptions from './SemsterOptions'

const AdminDashbord = () => {
  
  return (
    <StanderdBox>
        <Box    className='Main-Holder'
        sx={{
          margin:".5px 0 0 0 ",
          boxShadow:"none",
          width:"100%",
          display:"flex",
          justifyContent:"flex-start",
          alignItems:"flex-start",
          gap:".5rem",
            bgcolor:"transparent",
            flexDirection:"column"
        }}
        >
   
        <Box
        sx={{
          gap:"1rem",
          overflow:"auto",
          display:"flex",
          justifyContent:"flex-start",
          alignItems:"flex-start",
          width:"100%",
          borderRadius: "20px",
        }}
        >
        <AcdamicYear
          title="2020/2021"
        />
        <AcdamicYear
        selected={true}
          title="2021/2022"
        />
        <AcdamicYear
          title="2022/2023"
        />
        <AcdamicYear
          title="2023/2024"
        />
        <AcdamicYear
          title="2024/2025"
        />

        </Box>
        <Box 
        sx={{
          position:"relative",
          width:"100%",
          display:"flex",
          justifyContent:"center"
          ,alignItems:"center",
          bgcolor:"#fff",
          boxShadow:"3px 3px 4px #dedede"

          
                  }}
        >
        <SemsterOptions/>
          <CoursesGraph/>
        </Box>
        <Box 
        sx={{
          width:"100%",
          display:"flex",
          justifyContent:"center"
          ,alignItems:"center",
          bgcolor:"#fff"
          
                  }}
        >
          <TableOFUsers/>
        </Box>
        </Box>


    </StanderdBox>
  )
}

export default AdminDashbord