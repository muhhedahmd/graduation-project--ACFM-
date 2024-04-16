import {
  Avatar,
  Box,
  Button,
  FormGroup,
  Input,
  InputLabel,
  
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import AccesLevel from "./AccesLevel";
import styled from "@emotion/styled";
import { forwardRef } from "react";

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
const UserDetails = forwardRef(({ profile, setAccessLevel, accessLevel }) => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [UserData, SetUserData] = useState({
    AccesLevel: null,
    fName: "",
    lName: "",
    email: "",
    password: "",
    about: "",
  });
  const [avtarImg, setAvatarImg] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (e.target.files[0]) {
      if (selectedFile.type.startsWith("image/")) {
        setAvatarImg(URL.createObjectURL(selectedFile));
      }
    }
  };

  const HandleChange = (e) => {
    console.log(UserData);
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
          justifyContent: "space-around",
          gap: "1rem",
          height: "100%",
        }}
      >
        <FormGroup
          sx={{
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
            <AccesLevel setAccessLevel={setAccessLevel} id="Access" />

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
                      background: "linear-gradient(180deg, #ff7100, #fffbfb)",
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

                ":hover , :focus": {
                  bgcolor: "#fff",
                  boxShadow: "none",
                },
              }}
            >
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleChange(e)}
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
            flexDirection: `${profile || isSm ? "column" : "row"}`,
            width: "100%",
          }}
        >
          <FormGroup
            sx={{
              width: "100%",
            }}
          >
            <InputLabel
              sx={{
                textAlign: "left",
                color: "#6e6e6e",
              }}
              htmlFor="fName"
            >
              First Name
            </InputLabel>
            <Input
              className="borderAfter"
              onChange={(e) => HandleChange(e)}
              value={UserData.fName}
              id="fName"
              placeholder="Enter your first name"
              fullWidth
              color="secondary"
              variant="standard"
              sx={{
                width: `${profile || isSm ? "100%" : "15rem"}`,
                fontSize: ".8rem",
                paddingTop: "0",
              }}
              type="text"
              InputProps={{
                classes: {
                  notchedOutline: {
                    borderWidth: "1px",
                    borderColor: "yellow !important",
                  },
                },
              }}
            />
          </FormGroup>
          <FormGroup
            sx={{
              width: "100%",
            }}
          >
            <InputLabel
              sx={{
                textAlign: "left",
                color: "#6e6e6e",
              }}
              htmlFor="lName"
            >
              Last Name
            </InputLabel>
            <Input
              className="borderAfter"
              onChange={(e) => HandleChange(e)}
              value={UserData.lName}
              id="lName"
              placeholder="Enter your last name"
              fullWidth
              color="secondary"
              variant="standard"
              sx={{
                width: `${profile || isSm ? "100%" : "15rem"}`,
                fontSize: ".8rem",
                paddingTop: "0",
              }}
              type="text"
              InputProps={{
                classes: {
                  notchedOutline: {
                    borderWidth: "1px",
                    borderColor: "yellow !important",
                  },
                },
              }}
            />
          </FormGroup>
        </Box>

        <FormGroup
          style={{
            width: "100%",
          }}
        >
          <InputLabel
            sx={{
              textAlign: "left",
              color: "#6e6e6e",
            }}
            htmlFor="email"
          >
            Email
          </InputLabel>
          <Input
            className="borderAfter"
            onChange={(e) => HandleChange(e)}
            value={UserData.email}
            id="email"
            placeholder="Email..."
            fullWidth
            color="secondary"
            variant="standard"
            sx={{
              fontSize: ".8rem",
              paddingTop: "0",
            }}
            type="email"
            InputProps={{
              classes: {
                notchedOutline: {
                  borderWidth: "1px",
                  borderColor: "yellow !important",
                },
              },
            }}
          />
        </FormGroup>
        <FormGroup
          style={{
            width: "100%",
          }}
        >
          <InputLabel
            sx={{
              textAlign: "left",
              color: "#6e6e6e",
            }}
            htmlFor="password"
          >
            Password
          </InputLabel>
          <Input
            className="borderAfter"
            onChange={(e) => HandleChange(e)}
            value={UserData.password}
            id="password"
            placeholder="Password...."
            fullWidth
            color="secondary"
            variant="standard"
            sx={{
              fontSize: ".8rem",
              paddingTop: "0",
            }}
            type="password"
            InputProps={{
              classes: {
                notchedOutline: {
                  borderWidth: "1px",
                  borderColor: "yellow !important",
                },
              },
            }}
          />
        </FormGroup>

        <FormGroup
          style={{
            width: "100%",
          }}
        >
          <InputLabel
            sx={{
              textAlign: "left",
              color: "#6e6e6e",
            }}
            htmlFor="about"
          >
            About
          </InputLabel>

          <Input
            className="borderAfter"
            value={UserData.about}
            multiline
            rows={4}
            id="about"
            placeholder="Password...."
            fullWidth
            variant="standard"
            sx={{
              fontSize: ".8rem",
              paddingTop: "0",
            }}
            type="text"
            InputProps={{
              classes: {
                notchedOutline: {
                  borderWidth: "1px",
                  borderColor: "yellow !important",
                },
              },
            }}
          />
        </FormGroup>
      </form>
  );
});

export default UserDetails;
