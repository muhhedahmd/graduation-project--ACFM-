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
import { SyledLoginFlyingBox, SyledLoginHolder, SyledLoginImgHolder } from "./sstyle";

const Login = () => {
  return (
    <SyledLoginHolder>
      <SyledLoginImgHolder>
        <img src="/Images/BackLogin.png" alt="BackImg" />

        <SyledLoginFlyingBox>
          <Typography
          sx={{
            color:"#fff",
            fontSize:"1.8rem",

          }}
           variant="h5" component={"h4"}>
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

      <Box>
        <Box className="loginHeading">
          <Box>
            <img src="/Images/logo-o6u 1.png" alt="logo" />

            <Typography variant="body2" component={"p"}>
              6 October university
            </Typography>
          </Box>

          <Typography variant="body2" component={"p"}>
            Welcome Back, Please login to your account
          </Typography>
        </Box>

        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: "1rem",
          }}
          action="#"
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormControlLabel label="Parent" control={<Checkbox />} />
          </FormControl>
          <FormControl>
            <Button type="submit">Submit</Button>
          </FormControl>
        </form>
      </Box>
    </SyledLoginHolder>
  );
};

export default Login;
