import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
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
const Login = () => {

  const {Login } = UseAuth()
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    checkBox: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    passwoard: "",
  });
  const HandleChange = (e) => {
    // console.log(e.target.checked)
    const { name, value, checked } = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
        checkBox: checked,
      };
    });

    console.log(userData);
  };

  const schema = yup.object().shape({
    email: yup.string().email().required("").required(""),
    passwoard: yup.string().max(16).min(6).required(""),

    // passwoard:yup.string().matches(/(^(?=.*[a-zA-Z]+)(?=.*(\d+){3,})(?=.*(\W+){3,})).*$/g).min(6).max(16).min(6).required(""),
  });

  const handleSubmit = (e) => {
    schema
      .validate(
        {
          email: userData.email,
          passwoard: userData.password,
        },
        { abortEarly: false }
      )
      .then((isValid) => {
        setErrors({
          email: "",
          passwoard: "",
        });
        Login()

 

        // console.log(isValid);
      })
      .catch((validationErrors) => {
        const errorss = {};

        validationErrors.inner.forEach((error) => {
          errorss[error.path] = error.message;
          setErrors((prev) => {
            return {
              ...prev,
              ...errorss,
            };
          });
        });
      });


    return e.preventDefault();
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
            <img src="/Images/logo-o6u 1.png" alt="logo" />

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
          <FormControl
            color={`${errors.email === "" ? "primary" : "error"}`}
            fullWidth={true}
          >
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              name="email"
              onChange={(e) => HandleChange(e)}
              id="email"
              placeholder="Enter Your Email...."
              type="email"
            />
          </FormControl>
          <FormControl
            fullWidth
            color={`${errors.passwoard === "" ? "primary" : "error"}`}
          >
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              name="password"
              onChange={(e) => HandleChange(e)}
              type="password"
              id="Password"
              placeholder="Enter The Password...."
            />
          </FormControl>
          <FormControl fullWidth>
            <FormControlLabel
              label="Rember me"
              control={
                <Checkbox name="checkBox" onChange={(e) => HandleChange(e)} />
              }
            />
          </FormControl>
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
