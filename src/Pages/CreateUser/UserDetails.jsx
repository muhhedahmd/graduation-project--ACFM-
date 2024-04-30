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
const UserDetails = forwardRef(
  ({ validationErrors, profile, setAccessLevel, accessLevel }, ref) => {
    const [avtarImg, setAvatarImg] = useState(null);

    const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const [UserData, SetUserData] = useState({
      AccesLevel: null,
      fName: "",
      lName: "",
      email: "",
      password: "",
      about: "",
      PhoneNumber: "",
      img: avtarImg,
    });

    useImperativeHandle(
      ref,
      () => ({
        UserData: () => UserData,
      }),
      [UserData]
    );

    const handleChangeAvtar = (e) => {
      const selectedFile = e.target.files[0];
      if (e.target.files[0]) {
        if (selectedFile.type.startsWith("image/")) {
          setAvatarImg(URL.createObjectURL(selectedFile));
          SetUserData({ ...UserData, img: URL.createObjectURL(selectedFile) });
        }
      }
    };

    const HandleChange = (e) => {
      const { id, value } = e.target;
      SetUserData((prev) => {
        return { ...prev, [id]: value, AccesLevel: accessLevel };
      });
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
                onChange={(e) => handleChangeAvtar(e)}
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
