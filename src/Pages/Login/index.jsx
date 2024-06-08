import {
  Box,
  Button,
  
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  FormHolderAndHeading,
  StyledLoginHeading,
  StyledLogoAndTitle,
  SyledLoginFlyingBox,
  SyledLoginHolder,
  SyledLoginImgHolder,
} from "./sstyle";

import * as yup from "yup";
import UseAuth from "../../Components/Contexts/Authantication";
import axios from "axios";
const Login = () => {
  const { Login  } = UseAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [ errorLog , setErrorLog] = useState("")
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schema = yup.object().shape({
      email: yup.string().email().required("Email is required"),
      password: yup.string().min(6).required("Password is required"),
      role: yup.string().required("Role is required"),
    });
  
    try {
      await schema.validate(userData, { abortEarly: false });
      setErrors({ email: "", password: "" });
      console.log(userData.email)
      console.log(userData.password)
  
      await axios.post(
        "https://optima-software-solutions.com/apis/login.php",
        {
          email: userData.email,
          password:userData.password

        },

        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
        }
      ).then((res)=> {
        if(res.data.error){
          setErrorLog("Invalid email or password")
        }
        else {
          Login(res.data)
        }
        })
        
      .catch((err)=>setErrorLog("Invalid email or password"))
      // console.log("Response:", response.data);

    } catch (validationErrors) {
      // Validation failed, set the errors
      const errorss = {};
      validationErrors?.inner?.forEach((error) => {
        errorss[error.path] = error.message;
      });
      setErrors(errorss);
      console.log(errors);
    }
  };
  


  return (
    <SyledLoginHolder>
      <SyledLoginImgHolder>
        <SyledLoginFlyingBox>
          <Typography
            className="login-title-textlft"
            sx={{
              color: "#fff",
              fontSize: "1.8rem",
            }}
            variant="h5"
            component={"h4"}
          >
            Academic course file management And collect the data for Semestr
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#3E334E",
            }}
            variant="h5"
            component={"h4"}
          >
            ACFM.
          </Typography>
        </SyledLoginFlyingBox>
      </SyledLoginImgHolder>

      <FormHolderAndHeading>
        <StyledLoginHeading className="loginHeading">
          <StyledLogoAndTitle>
            <img src="/Images/logo-o6u1.png" alt="logo" />

            <Typography variant="body2" component={"p"}>
              6 October university
            </Typography>
          </StyledLogoAndTitle>

          <Typography
            sx={{
              color: "#F57F21",
            }}
            variant="body2"
            component={"p"}
          >
            Welcome Back, Please login to your account
          </Typography>
        </StyledLoginHeading>

        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: ".5rem",
            width: "100%",
          }}
          action="#"
        >
        {errorLog&&<Typography color={"error"}>
            {errorLog}
        </Typography>}
          <FormControl fullWidth={true}>
            <FormLabel
              sx={{ textAlign: "start", color: "#222 !important" }}
              htmlFor="email"
            >
              Email
            </FormLabel>
            <Input
              className="borderAfter"
              name="email"
              onChange={(e) => handleChange(e)}
              id="email"
              placeholder="Enter Your Email...."
              type="email"
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel
              sx={{ textAlign: "start", color: "#222 !important" }}
              htmlFor="password"
            >
              Password
            </FormLabel>
            <Input
              className="borderAfter"
              name="password"
              onChange={(e) => handleChange(e)}
              type="password"
              id="Password"
              placeholder="Enter The Password...."
            />
          </FormControl>
          <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
  <FormControl fullWidth component="fieldset">
      <RadioGroup
      sx={{
        width:"100%",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}
        aria-label="role"
        name="role"
        value={userData.role}
        onChange={handleChange}
        row
      >
        <FormControlLabel
          value="teacher"
          control={<Radio sx={{ color: '#FF5C00 !important' }} />}
          label="Login as Admin"
        />
        <FormControlLabel
          value="student"
          control={<Radio sx={{ color: '#FF5C00 !important' }} />}
          label="Login as teaching Staff"
        />
      </RadioGroup>
    </FormControl>

      </Box>

          <FormControl fullWidth>
            <Button
              sx={{
                background: "linear-gradient(45deg, #5DA9E0, #FF5C00)",
                color: "#fff",
              }}
              type="submit"
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </FormHolderAndHeading>
    </SyledLoginHolder>
  );
};

export default Login;
