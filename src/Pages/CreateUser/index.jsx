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
import { AnimatePresence , motion } from 'framer-motion';
import { useUserContext } from '../../Components/Contexts/UserContext';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import {  StyledMainBtn } from '../../MainDrawer/style';

const validationSchema = Yup.object().shape({
  AccesLevel: Yup.string().required('Access level is required'),
  fName: Yup.string().min(4 , "The first name should be more than 4").max(10 ,"The first name should be less than 10").required('First name is required'),
  lName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  about: Yup.string().required('About is required'),
  img: Yup.string().required('Image is required'),
});

const CreateUser = ({page}) => {

  const [validationErrors, setValidationErrors] = useState([]);


  const {setUserData   ,state} = useUserContext()
  const requiredFilesRef = useRef(null)
  const userDetailsRef= useRef(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  
  const handleClick = () => {
    validationSchema.validate(userDetailsRef.current.UserData(), { abortEarly: false })
      .then(validData => {
        if (userDetailsRef.current.UserData().AccesLevel === "Instructor") {
          const EveryFilesExisit = Object.values(requiredFilesRef.current.files()).every((item) => item !== null);
          console.log(EveryFilesExisit);
          if (EveryFilesExisit) {
            setUserData({ id: uuidv4(), ...requiredFilesRef.current.files(), creationDate: formattedDate, ...userDetailsRef.current.UserData() });
          }
        } else {
          console.log("added", state); // <-- This line doesn't seem to do anything
          setUserData({ id: uuidv4(), creationDate: formattedDate, ...userDetailsRef.current.UserData() });
        }
      })
      .catch(errors => {
        // Data is invalid, update validation errors state
        const formattedErrors = [];
        errors?.inner?.forEach(err => {
          // Check if the field already exists in formattedErrors
          const existingError = formattedErrors.find(error => error.field === err.path);
          if (!existingError) {
            formattedErrors.push({ field: err.path, message: err.message });
          }
        });
        setValidationErrors(formattedErrors);
      });
    // console.log("USER DATA", state);
  }
  


const  {viewFile  ,setViewFile } = UseView()

  const [accessLevel, setAccessLevel] = useState('');

  const isMD = useMediaQuery((theme)=>theme.breakpoints.down("md"))
  return (
    <StanderdBox>
      <CssBaseline />
      <Box 
      
      className="Main-Holder"
      sx={{
        // overflow:"hidden",
        marginTop: "1rem",
        borderRadius: "6px",
        padding: "1rem",
        width: "90%",
        height: "88vh",
        bgcolor: "#fff",
        boxShadow: "3px 3px 4px #dedede"
      }}>
      <Typography
      textAlign={"left"}
      variant='h5'
      component={"p"}
      >
        {page}
      </Typography>
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
            <UserDetails validationErrors={validationErrors} accessLevel={accessLevel}  setAccessLevel={setAccessLevel} ref={userDetailsRef} />
          <StyledMainBtn  onClick={handleClick}  width='100%' sx={{
            bgcolor:"#ff5c00"
          }} children={""} >Create user</StyledMainBtn>
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

            <AssignCourses />
          <AnimatePresence>

           {accessLevel === "Instructor" && (
              <motion.div
              style={{
                width:"100%",
                height:"100%",
              }}
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              transition={{duration:.4}}
              >

                <RequiredFiles   requiredFilesRef={requiredFilesRef} />

              </motion.div>
            )}
            </AnimatePresence>
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
