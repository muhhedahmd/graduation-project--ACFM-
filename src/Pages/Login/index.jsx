import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import React from "react";
import { FormHolderAndHeading, StyledLoginHeading, StyledLogoAndTitle, SyledLoginFlyingBox, SyledLoginHolder, SyledLoginImgHolder } from "./sstyle";

const Login = () => {
  return (
    <SyledLoginHolder>
      <SyledLoginImgHolder
      

      >
        {/* <img src="" alt="BackImg" /> */}

        <SyledLoginFlyingBox>
          <Typography
          className="login-title-textlft"
          sx={{
            color:"#fff",
            fontSize:"1.8rem",

          }}
           variant="h5" component={"h4"}
           
           >
            Academic course file management And collect the data for Semestr
          </Typography>
          <Typography
          sx={{
            fontSize:"2rem",
            fontWeight:"bold",
            color:"#3E334E"
          }}
           variant="h5" component={"h4"}>
            ACFM.
          </Typography>
        </SyledLoginFlyingBox>
      </SyledLoginImgHolder>

      <FormHolderAndHeading>
        <StyledLoginHeading className="loginHeading">

          <StyledLogoAndTitle 

          >
            <img src="/Images/logo-o6u 1.png" alt="logo" />

            <Typography variant="body2" component={"p"}>
              6 October university
            </Typography>
          </StyledLogoAndTitle>

          <Typography
            sx={{
              color:"#F57F21"
            }}
          
           variant="body2" component={"p"}>
            Welcome Back, Please login to your account
          </Typography>
        </StyledLoginHeading>

        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: ".5rem",
            width:"100%"
          }}
          action="#"
        >
          <FormControl
          fullWidth={true}
          >
            <FormLabel
            htmlFor="email"
            >Email</FormLabel>
            <Input
              id="email"
              placeholder="Enter Your Email...."
             type="text" />
          </FormControl>
          <FormControl
          fullWidth
          >
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input type="text" id="Password" placeholder="Enter The Password...." />
          </FormControl>
          <FormControl
          fullWidth
          >
            <FormControlLabel label="Rember me" control={<Checkbox />} />
          </FormControl>
          <FormControl
          fullWidth
          >
            <Button

            sx={{
              background:"linear-gradient(45deg, #5DA9E0, #FF5C00)",
              color:"#fff",
            }}
             type="submit">Submit</Button>
          </FormControl>
        </form>
      </FormHolderAndHeading>
    </SyledLoginHolder>
  );
};

export default Login;
