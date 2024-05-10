// CreateUser.js
import React, {  useRef, useState } from 'react';
import StanderdBox from '../../Components/StanderdBox';
import { Box,  CssBaseline, Typography, useMediaQuery } from '@mui/material';
import UserDetails from './UserDetails';

import * as Yup from 'yup';
import {  StyledMainBtn } from '../../MainDrawer/style';
import axios from 'axios';
import { useUserContext } from '../../Components/Contexts/UserContexts';



const validationSchema = Yup.object().shape({
  AccesLevel: Yup.string().required('Access level is required'),
  fName: Yup.string().min(4, "The first name should be more than 4").max(10, "The first name should be less than 10").required('First name is required'),
  lName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  PhoneNumber: Yup.string().required('Phone number is required'),
  about: Yup.string(),
  avtarImg: Yup.mixed().required('Avatar image is required'), // Allow any type of value (string, file, etc.)
  creation_date: Yup.date().required('Creation date is required'),
  resumeImg:  Yup.mixed().required('resmue image is required'), 
});
const CreateUser = ({page}) => {

  const [validationErrors, setValidationErrors] = useState([]);


  const {users} = useUserContext()

  const userDetailsRef= useRef(null);


  const handleClick = () => {
    const FindUser = users.some((item) => item.email === userDetailsRef.current.UserData().email);

    if(!FindUser){

      validationSchema.validate(userDetailsRef.current.UserData(), { abortEarly: false })
      .then(validData => {
        
          console.log("added", validData);
        
          (async ()=>{
        try {
          const formData = new FormData();
          
          // Append all fields to the FormData object
          formData.append("access", validData.AccesLevel);
          formData.append("first_name", validData.fName);
          formData.append("last_name", validData.lName);
          formData.append("email", validData.email);
          formData.append("password", validData.password);
          formData.append("about", validData.about);
          formData.append("avatar", validData.avtarImg); 
          formData.append("phone_number", validData.PhoneNumber);
          formData.append("creation_date", validData.creation_date);
          formData.append("resume", validData.resumeImg); 
          
          
          await axios.post("http://optima-software-solutions.com/apis/useradd.php", 
          formData
            ,{
              headers : {
                "Content-Type": "multipart/form-data", 
              },
            }).then((res)=>{console.log(res)
            }).catch(err=>console.log(err))
          }catch(err){
            console.log(err)
          }
        }
      )()

      // setUserData({ id: uuidv4(), creationDate: formattedDate, ...userDetailsRef.current.UserData() });
        }
      )
      .catch(errors => {
        const formattedErrors = [];
        errors?.inner?.forEach(err => {
          const existingError = formattedErrors.find(error => error.field === err.path);
          if (!existingError) {
            formattedErrors.push({ field: err.path, message: err.message });
          }
        });
        setValidationErrors(formattedErrors);
        console.log(formattedErrors)
      });
      
    }
  }

  const [accessLevel, setAccessLevel] = useState('');

  const isMD = useMediaQuery((theme)=>theme.breakpoints.down("md"))
  return (
    <StanderdBox>
      <CssBaseline />
      <Box 
      
      className="Main-Holder"
      sx={{
        borderBottom:"2px solid #ff5c00",

        overflow:"auto",
        borderRadius: "6px",
        width: "90%",
        alignItems:"center",
        justifyContent:"center",
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
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Box className="Users-Holder" 
          sx={{
            // background:"#fff",
            // boxShadow:"3px 3px 4px #dedede",
            padding:"1rem",
            borderRadius:"6px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: ".5rem",
            height: "100%",
            transition:".3s",
            width: `${isMD ? "100%" : "80%"}`
          }}>
            <UserDetails validationErrors={validationErrors} accessLevel={accessLevel}  setAccessLevel={setAccessLevel} ref={userDetailsRef} />
          <StyledMainBtn  onClick={handleClick}  width='100%' sx={{
            bgcolor:"#ff5c00"
          }} children={""} >Create user</StyledMainBtn>
          </Box>

      </Box>
        </Box>
  
    </StanderdBox>
  );
}


export default CreateUser;

     