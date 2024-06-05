// CreateUser.js
import React, { useRef, useState } from 'react';
import StanderdBox from '../../Components/StanderdBox';
import { Box, CircularProgress, CssBaseline, Typography, useMediaQuery } from '@mui/material';
import UserDetails from './UserDetails';
import * as Yup from 'yup';
import { StyledMainBtn } from '../../MainDrawer/style';
import axios from 'axios';
import { useUserContext } from '../../Components/Contexts/UserContexts';

const validationSchema = Yup.object().shape({
  AccesLevel: Yup.string(),
  // .required('Access level is required')
  fName: Yup.string().min(4, "The first name should be more than 4").max(10, "The first name should be less than 10").required('First name is required'),
  lName: Yup.string(),
  // .required('Last name is required'),
  email: Yup.string().email('Invalid email'),
  // .required('Email is required'),
  password: Yup.string(),
  // .required('Password is required'),
  PhoneNumber: Yup.string(),
  // .required('Phone number is required'),
  about: Yup.string(),
  specialize: Yup.string(),
  avtarImg: Yup.mixed(),
  creation_date: Yup.date(),
  // .required('Creation date is required'),
  resumeImg: Yup.mixed(),
  // .required('Resume image is required'),
});

const CreateUser = ({ page }) => {
  const [validationErrors, setValidationErrors] = useState([]);
  const { users  ,fetchUsers , loader} = useUserContext();
  const userDetailsRef = useRef(null);
  const [accessLevel, setAccessLevel] = useState('');
  const isMD = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleClick = () => {
 
    console.log( userDetailsRef.current.userData())
    const FindUser = users.some((item) => item.email === userDetailsRef.current.userData().email);

    if (!FindUser) {
      validationSchema.validate(userDetailsRef.current.userData(), { abortEarly: false })
        .then(validData => {
          console.log("added", validData);

          (async () => {
            try {
              const formData = new FormData();
              
              formData.append("access", validData.AccesLevel);
              formData.append("first_name", validData.fName);
              formData.append("last_name", validData.lName);
              formData.append("email", validData.email);
              formData.append("password", validData.password);
              formData.append("about", validData.about+ validData.specialize);
              formData.append("specialize", validData.specialize);
              formData.append("avatar", validData.avtarImg);
              formData.append("phone_number", validData.PhoneNumber);
              formData.append("creation_date", validData.creation_date);
              formData.append("resume", validData.resumeImg);

              await axios.post("http://optima-software-solutions.com/apis/useradd.php",
                formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }).then((res) => {
                  alert('User is created');
                  console.log(res);
                  fetchUsers()
                }).catch(err => {
                  console.log(err);
                });
            } catch (err) {
              console.log(err);
            }
          })();
        })
        .catch(errors => {
          const formattedErrors = [];
          errors?.inner?.forEach(err => {
            const existingError = formattedErrors.find(error => error.field === err.path);
            if (!existingError) {
              formattedErrors.push({ field: err.path, message: err.message });
            }
          });
          setValidationErrors(formattedErrors);
          console.log(formattedErrors);
        });
    } else {
      alert('This user already exists with the same email');
    }
    console.log(users)
  }

  return (
    <StanderdBox>
      <CssBaseline />
      <Box className="Main-Holder" sx={{ borderBottom: "2px solid #ff5c00", overflow: "auto", borderRadius: "6px", width: "90%", alignItems: "center", justifyContent: "center" }}>
        <Typography textAlign={"left"} variant='h5' component={"p"}>
          {page}
        </Typography>
        <Box className='Holder-CreateUser' sx={{ gap: "3rem", height: "100%", width: "100%", display: 'flex', flexDirection: `${isMD ? "column" : "row"}`, justifyContent: "center", alignItems: "center" }}>
          <Box className="Users-Holder" sx={{  margin :".5rem" ,padding: "1rem", borderRadius: "6px", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", gap: ".5rem", height: "100%", transition: ".3s", width: `${isMD ? "100%" : "80%"}` }}>
            <UserDetails validationErrors={validationErrors} accessLevel={accessLevel} setAccessLevel={setAccessLevel} ref={userDetailsRef} />
            <StyledMainBtn
       
             onClick={handleClick} width='100%' sx={{ bgcolor: "#ff5c00", color:"#fff" }}>
             
             {
            loader ? 

            <CircularProgress
                sx={{
                  color:"#fff",
                }}

            />:
                "Create user"
            }
             </StyledMainBtn>
          </Box>
        </Box>
      </Box>
    </StanderdBox>
  );
}

export default CreateUser;
