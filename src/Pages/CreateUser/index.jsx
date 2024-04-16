// CreateUser.js
import React, {  useRef, useState } from 'react';
import StanderdBox from '../../Components/StanderdBox';
import { Box, Button, CssBaseline, Typography, useMediaQuery } from '@mui/material';
import UserDetails from './UserDetails';
import RequiredFiles from './RequiredFiles';
import AssignCourses from './AssignCourses';
import PDFViewer from '../../Components/PDFViewer';
import { UseView } from '../../Components/Contexts/viewedFileContext';
import { Close } from '@mui/icons-material';

const CreateUser = () => {
const  {viewFile  ,setViewFile } = UseView()

  const [accessLevel, setAccessLevel] = useState('');

  const isMD = useMediaQuery((theme)=>theme.breakpoints.down("md"))
  const ref= useRef(null);
  return (
    <StanderdBox>
      <CssBaseline />
      <Box 
      
      className="Main-Holder"
      sx={{
        marginTop: "1rem",
        borderRadius: "6px",
        padding: "1rem",
        width: "90%",
        height: "88vh",
        bgcolor: "#fff",
        boxShadow: "3px 3px 4px #dedede"
      }}>
        <Box className='Holder-CreateUser' 
        
        sx={{
          gap: "3rem",
          height: "100%",
          width: "100%",
          display: 'flex',
          flexDirection: `${isMD ? "column" : "row"}`,
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}>
          <Box className="Users-Holder" 
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: ".5rem",
            height: "100%",
            width: `${isMD ? "100%" : "45%"}`
          }}>
            <Typography variant='h6' component={"div"} sx={{ margin: "0 0 .7rem 0 " }}>1.User Information</Typography>
            <UserDetails accessLevel={accessLevel}  setAccessLevel={setAccessLevel} ref={ref} />
          </Box>
          <Box className="Addtional-Info"
           sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            width: `${isMD ? "100%" : "45%"}`,
            gap: ".5rem",
            height: "100%",
          }}>
           {accessLevel !== "Admin" && (
              <>
                <Typography variant='h6' component={"div"} sx={{ margin: "0 0 .7rem 0 " }}>2.Required Files</Typography>

                <RequiredFiles   />

              </>
            )}
            <Typography variant='h6' component={"div"} sx={{ margin: "0 0 .7rem 0 " }}>4.Assign Course</Typography>
            <AssignCourses />
          </Box>
        </Box>
      </Box>
      {
        viewFile ? 
        <>
      <Box
      className="flex-space-between-center"
      sx={{
        position:"fixed",
        justifyContent:"center",
        gap:"3rem"
      }}
      >

        <Button
        onClick={()=>setViewFile(null)}
        sx={{
          color:"#333 !important",
          fontSize:" 2rem",
    transform:" translateX(6rem)",
    cursor:"pointer",
    zIndex:"100"
        }}
        >
        <Close
        fontSize='2rem'
        sx={{
          fontSize:" 2rem",
          color:"#333"
        }}
      

        />

        </Button>
      <PDFViewer pdfData={viewFile} />
      </Box>
        </>
      :
      null
      }

    </StanderdBox>
  );
}


export default CreateUser;
