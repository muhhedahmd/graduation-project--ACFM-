import { Avatar, Box, Button, FormGroup, useMediaQuery } from "@mui/material";
import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import styled from "@emotion/styled";
import AccessLevel from "../CreateUser/AccesLevel";
import SingleUserDetail from "./singleEditUser";
import { StyledMainBtn } from "../../MainDrawer/style";
import axios from "axios";
import qs from "qs";
import LinearWithValueLabel from "../../Components/ProgreessBar";

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
  setOpenDrawer,
}) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [accessLevel, setAccessLevel] = useState(access);

  const [avtarImg, setAvatarImg] = useState(null);

  const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [UserData, SetUserData] = useState({
    AccesLevel: access,
    fName: first_name,
    lName: last_name,
    email: email,
    about: about,
    PhoneNumber: "",
    img: avtarImg,
  });
  useEffect(() => {
    SetUserData(() => {
      return {
        AccesLevel: accessLevel,
        fName: first_name,
        lName: last_name,
        email: email,
        about: about,
        PhoneNumber: "",
        img: avtarImg,
      };
    });
  }, [about, accessLevel, avtarImg, email, first_name, last_name]);

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

  const handleSubmit = (e) => {
    const formData = {
      id: parseInt(id),
      first_name: UserData.fName,
      last_name: UserData.lName,
      email: UserData.email,
      about: UserData.about,
      access: accessLevel,
      phone_number: UserData.PhoneNumber,
      user_img: UserData.img,
    };

    (async () => {
      setLoading(true);
      try {
        await axios.put(
          "http://optima-software-solutions.com/apis/useredit.php",
          qs.stringify(formData),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(progress);
            },
          }
        );
      } catch (error) {
        console.log(error.response.data);
      } finally {
        setLoading(false);
      }
    })();
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
          <AccessLevel
            initialValue={access}
            setAccessLevel={setAccessLevel}
            error={false}
            id="Access"
          />

          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            type="reset"
            startIcon={
              <>
                <Avatar
                  sx={{
                    width: "50px",
                    height: "50px",
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
      <StyledMainBtn type="submit">Edit</StyledMainBtn>
      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        {loading && <LinearWithValueLabel value={progress} />}
      </Box>
    </form>
  );
};

export default EditUSerDetails;
