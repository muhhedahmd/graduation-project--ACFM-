import { Avatar, Box, Button, FormGroup, useMediaQuery } from "@mui/material";
import React, { useImperativeHandle, useState, forwardRef } from "react";
import AccesLevel from "./AccesLevel";
import styled from "@emotion/styled";
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
  ({ validationErrors, setAccessLevel, accessLevel }, ref) => {
    const [avatarImg, setAvatarImg] = useState(null);
    const [resumeImg, setResumeImg] = useState(null);

    const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const [userData, setUserData] = useState({
      AccesLevel: null,
      fName: "",
      lName: "",
      email: "",
      password: "",
      about: "",
      PhoneNumber: "",
      avatarImg: avatarImg,
      creation_date: formattedDate,
      resumeImg: resumeImg,
    });

    useImperativeHandle(
      ref,
      () => ({
        userData: () => userData,
        setUserData: setUserData,
      }),
      [userData]
    );

    const handleChangeAvatar = (e, setState, obj) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.type.startsWith("image/")) {
        setState(URL.createObjectURL(selectedFile));
        setUserData({ ...userData, [obj]: selectedFile });
      }
    };

    const handleChange = (e) => {
      const { id, value } = e.target;
      setUserData((prev) => ({
        ...prev,
        [id]: value,
        AccesLevel: accessLevel,
      }));

      // Extract about and specialize fields using regex
      // if (id === "about") {
      //   const aboutPattern = /(?<=About:)(.*?)(?=Specializes in:)/;
      //   const specializePattern = /(?<=Specializes in:)(.*)/;
      //   const aboutMatch = value.match(aboutPattern);
      //   const specializeMatch = value.match(specializePattern);

      //   const about = aboutMatch ? aboutMatch[0].trim() : "";
      //   const specialize = specializeMatch ? specializeMatch[0].trim() : "";

      //   setUserData((prev) => ({
      //     ...prev,
      //     about: about || prev.about,
      //     specialize: specialize || prev.specialize,
      //   }));
      // }

      console.log(userData);
    };

    return (
      <form
        style={{
          height:"100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <FormGroup sx={{ margin: "0 0 .8rem 0", width: "100%" }}>
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
                  {avatarImg && (
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                      }}
                      src={avatarImg}
                      alt=""
                    />
                  )}
                </Avatar>
              }
              sx={{
                bgcolor: "#fff !important",
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
                onChange={(e) => handleChangeAvatar(e, setAvatarImg, "avatarImg")}
              />
            </Button>
          </Box>
        </FormGroup>
        <FormGroup sx={{ margin: "0 0 .8rem 0", width: "100%" }}>
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
                resumeImg && (
                  <img
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                    src={resumeImg}
                    alt="resumeImg"
                  />
                )
              }
              sx={{
                boxShadow: "none",
                ":hover , :focus": {
                  boxShadow: "none",
                },
              }}
            >
              {resumeImg ? "Change the resume " : "Add Resume"}
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleChangeAvatar(e, setResumeImg, "resumeImg")}
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
            label={"First Name"}
            HandleChange={handleChange}
            validationErrors={validationErrors}
            UserData={userData}
          />
          <SingleUserDetail
            id={"lName"}
            label={"Last Name"}
            HandleChange={handleChange}
            validationErrors={validationErrors}
            UserData={userData}
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
            HandleChange={handleChange}
            validationErrors={validationErrors}
            UserData={userData}
          />
          <SingleUserDetail
            id={"PhoneNumber"}
            HandleChange={handleChange}
            validationErrors={validationErrors}
            UserData={userData}
          />
        </Box>

        <SingleUserDetail
          id={"password"}
          HandleChange={handleChange}
          validationErrors={validationErrors}
          UserData={userData}
        />
        <SingleUserDetail
          id={"about"}
          HandleChange={handleChange}
          validationErrors={validationErrors}
          UserData={userData}
        />
        {/* <SingleUserDetail
          id={"specialize"}
          HandleChange={handleChange}
          validationErrors={validationErrors}
          UserData={userData}
        /> */}
      </form>
    );
  }
);

export default UserDetails;
