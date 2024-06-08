import { Avatar, Box, Button, CircularProgress, FormGroup, Typography, useMediaQuery } from "@mui/material";
import React, {
  useEffect,
  useState,
} from "react";
import styled from "@emotion/styled";
import SingleUserDetail from "./singleEditUser";
import { StyledMainBtn } from "../../MainDrawer/style";

import { useUserContext } from "../../Components/Contexts/UserContexts";

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
const EditUSerDetails = ({
  about,
  access,
  email,
  id,
  first_name,
  last_name,
  phone_number,
   creation_date,
   resume
   ,avatar
}) => {


  const [accessLevel, ] = useState(access);

  const [avtarImg, setAvatarImg] = useState(null);

  const { loader, editUser} = useUserContext()
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [resumeImg, setResumeImg] = useState(null);

  const [UserData, SetUserData] = useState({
    AccesLevel: access,
    fName: first_name,
    lName: last_name,
    email: email,
    about: about,
    PhoneNumber: "",
    img: avtarImg,
    resumeImg: resumeImg,
  });
  useEffect(()=>{
    setAvatarImg(avatar)
    setResumeImg(resume)
  },[avatar, resume])
  useEffect(() => {
    SetUserData(() => {
      return {
        AccesLevel: accessLevel,
        fName: first_name,
        lName: last_name,
        email: email,
        about: about,
        PhoneNumber:phone_number ,
        creation_date: creation_date,
        resume :resume,
         img: avatar,
      };
    });
  }, [about, accessLevel, avatar,  creation_date, email, first_name, last_name, phone_number, resume]);

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
    console.log(UserData)
  };
      const handleChangeAvatar = (e, setState, obj) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.type.startsWith("image/")) {
        setState(URL.createObjectURL(selectedFile));
        SetUserData({ ...UserData, [obj]: selectedFile });
      }
    };

  const handleSubmit = (e) => {
    const formData = {
      id: parseInt(id),
      first_name: UserData.fName,
      last_name: UserData.lName,
      email: UserData.email,
      about: UserData.about,
      access: accessLevel,
      phone_number: UserData.PhoneNumber,
      "resume": UserData.resumeImg ,
      "avatar": UserData.avtarImg, 

    };
  
    editUser(formData.id , formData)
    e.preventDefault();
    console.log(formData, id);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      style={{
        width: `${isSm ? "80%" : "60%"}`,
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
          <Typography>
            Access : {UserData.AccesLevel}
          </Typography>

          <Button

            component="label"
            variant="contained"
            tabIndex={-1}
            type="reset"
            startIcon={
              <>
                <Avatar
                  sx={{
                    padding:".2rem",
                    border:"3px solid #222",
                    width: "60px",
                    height: "60px",
                  }}
                >
                  {avtarImg ? (
                    <img
                      style={{
                        width: "60px",
                        height: "60px",
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
              bgcolor: "#fff !important",

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
          validationErrors={[]}
          UserData={UserData}
        />
        <SingleUserDetail
          id={"lName"}
          lable={"Last Name"}
          HandleChange={HandleChange}
          validationErrors={[]}
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
            // validationErrors={}
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
          id={"PhoneNumber"}
          HandleChange={HandleChange}
          validationErrors={[]}
          UserData={UserData}
        />
      </Box>

      <SingleUserDetail
        id={"about"}
        HandleChange={HandleChange}
        validationErrors={[]}
        UserData={UserData}
      />
      <StyledMainBtn 
      sx={{
        color:"#fff",
      }}
      
      type="submit">
              {loader ? <CircularProgress
              sx={{

               color:"#333"
               
              }}
                /> : 
              
              "Edit"
              }

      </StyledMainBtn>

    </form>
  );
};

export default EditUSerDetails;