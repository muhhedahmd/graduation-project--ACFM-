import { Avatar, Box, Button, FormGroup, useMediaQuery } from "@mui/material";
import React, { useImperativeHandle, useState } from "react";
import AccesLevel from "./AccesLevel";
import styled from "@emotion/styled";
import { forwardRef } from "react";
import SingleUserDetail from "./SingleUserDetail";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; 

const UserDetails = forwardRef(
  ({ validationErrors, profile, setAccessLevel, accessLevel }, ref) => {
    const [avtarImg, setAvatarImg] = useState(null);
    const [ResmImg, setResmuIng] = useState(null);

    const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const [UserData, SetUserData] = useState({
      AccesLevel: null,
      fName: "",
      lName: "",
      email: "",
      password: "",
      about: "",
      PhoneNumber: "",
      avtarImg: avtarImg,
      creation_date: formattedDate,
      resumeImg: ResmImg,
    });

    useImperativeHandle(
      ref,
      () => ({
        UserData: () => UserData,
      }),
      [UserData]
    );

    const handleChangeAvtar = (e ,setState , obj ) => {
      const selectedFile = e.target.files[0];
      if (e.target.files[0]) {
        if (selectedFile.type.startsWith("image/")) {
          console.log(selectedFile)
          setState(URL.createObjectURL(selectedFile));
          SetUserData({ ...UserData, [obj]: selectedFile});
        }
      }
    };

    const HandleChange = (e) => {
      const { id, value } = e.target;
      SetUserData((prev) => {
        return { ...prev, [id]: value, AccesLevel: accessLevel };
      });

      console.log(UserData)
    };

    return (
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: " flex-start",
          gap: "2.2em",
          margin: ".5rem 0",
          height: "auto",
        }}
      >
        <FormGroup
          sx={{
            margin: "0 0 -.8rem 0",

            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <AccesLevel
              error={validationErrors[0]}
              setAccessLevel={setAccessLevel}
              id="Access"
            />

            <Button
              component="label"
              role={"button"}
              variant="contained"
              tabIndex={-1}
              startIcon={
                <>
                  <Avatar
                    sx={{
                      width: "50px",
                      height: "50px",

                      background: `${
                        validationErrors[6]
                          ? "linear-gradient(180deg, #f00111, #fffbfb)"
                          : "linear-gradient(180deg, #ff7100, #fffbfb)"
                      }`,
                    }}
                  >
                    {avtarImg ? (
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                        }}
                        src={avtarImg}
                        alt=""
                      />
                    ) : null}
                  </Avatar>
                </>
              }
              sx={{
                boxShadow: "none",
                padding: "0",
                ":hover , :focus": {
                  bgcolor: "#fff",
                  boxShadow: "none",
                },
              }}
            >
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleChangeAvtar(e , setAvatarImg , 'avtarImg')}
              />
            </Button>
          </Box>
        </FormGroup>
        <FormGroup
          sx={{
            margin: "0 0 -.8rem 0",

            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2rem",
            }}
          >
        

            <Button
              component="label"
              role={"button"}
              variant="contained"
              tabIndex={-1}
              startIcon={
                <>    
                
              
                {ResmImg&& 
                    <img  
                    style={{
                      width:"60px",
                      height:"60px"
                    }}
                    src={ResmImg} alt="resumeImg" />
                }
                </>
              }
              sx={{
                boxShadow: "none",
                padding: "0",
                ":hover , :focus": {
                  bgcolor: "#fff",
                  boxShadow: "none",
                },
              }}
            >
           {ResmImg? "Change the resmu ": 'Add Resmu'}
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleChangeAvtar(e , setResmuIng ,'resumeImg')}
              />
            </Button>
          </Box>
        </FormGroup>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
            flexDirection: `${isSm ? "column" : "row"}`,
            width: "100%",
          }}
        >
          <SingleUserDetail
            id={"fName"}
            lable={"First Name"}
            HandleChange={HandleChange}
            validationErrors={validationErrors}
            UserData={UserData}
          />
          <SingleUserDetail
            id={"lName"}
            lable={"Last Name"}
            HandleChange={HandleChange}
            validationErrors={validationErrors}
            UserData={UserData}
          />
        </Box>
        <Box
   sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
            flexDirection: `${isSm ? "column" : "row"}`,
            width: "100%",
          }}
        >

        <SingleUserDetail
          id={"email"}
          HandleChange={HandleChange}
          validationErrors={validationErrors}
          UserData={UserData}
        />
        <SingleUserDetail
          id={"PhoneNumber"}
          HandleChange={HandleChange}
          validationErrors={validationErrors}
          UserData={UserData}
        />
        </Box>

        <SingleUserDetail
          id={"password"}
          HandleChange={HandleChange}
          validationErrors={validationErrors}
          UserData={UserData}
        />
        <SingleUserDetail
          id={"about"}
          HandleChange={HandleChange}
          validationErrors={validationErrors}
          UserData={UserData}
        />
       
      </form>
    );
  }
);

export default UserDetails;
