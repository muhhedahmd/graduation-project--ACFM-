import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { forwardRef } from "react";
import UseAuth from "../Contexts/Authantication";
import { useCourseContext } from "../Contexts/CourseContexts";
import { useFileContext } from "../Contexts/FileCourseContext";

const Popup = forwardRef(({ Name, file, fileNameObj  , category  } , ref) => {
  const {uploadFile } = useFileContext()
  const {MainDrawerCourse} = useCourseContext()
  const {Data} = UseAuth()
  const isSm = useMediaQuery((theme)=>theme.breakpoints.down("md"))
const [active , setActive] = useState(false)


  useImperativeHandle(ref, () => ({
    open: () => setActive(true),
  }));



  const [FileData, SetFileData] = useState({
    FileName: fileNameObj, // Set file name properly
    Description: "",
  });

  useEffect(() => {
    SetFileData({
      [Name.split(" ").join("")]: fileNameObj,
      Description: "",
    });
  }, [Name, fileNameObj]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    SetFileData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    console.log(FileData);
  };

  const Handleclose = () => {
    setActive((prev) => false);
    SetFileData({
      [Name.split(" ").join("")]: fileNameObj,
      Description: "",
    });
  };

  const HandleSubmit = async (e) => {

    console.log( Data.user.id, MainDrawerCourse?.courseid)
    e.preventDefault();
    Handleclose(); 
  
    if (FileData[Name.split(" ").join("")]) {
      uploadFile(file, FileData.Description, Data.user.id, MainDrawerCourse?.courseid, category)
      // setProgress(progressContext)
    }
  };
  
  return (
    <Box
      className="popup"
      sx={{
        visibility: `${active ? "visible" : "hidden"}`,
        opacity: `${active ? "1" : "0"}`,
        zIndex: `${active ? "9999" : "-100"}`,
        height: "100vh",
        width: "100vw",
        backdropFilter: "brightness(.9) blur(2px)",
        transition: ".3s",
        position: "fixed",

        top: "0",
        left: "0",
        bgcolor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: `${isSm? "80%" : "40%"}`,
          padding: "1.5rem",
          bgcolor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "2rem",
          borderRadius: "0  15px  15px 0 ",

          position: "relative",
          ":before": {
            width: ".9rem",
            height: "100%",
            content: '""',
            position: "absolute",
            top: "0",
            left: "-.7rem",
            background: "linear-gradient(45deg, #FF5E03, #FF9A11)",
            borderRadius: "15px 0 0 15px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h5" component={"div"}>
            File Info
          </Typography>
          <Close onClick={() => Handleclose()} fontSize="medium" />
        </Box>

        <form
          onSubmit={(e) => HandleSubmit(e)}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <FormControl
            fullWidth
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              flexDirection: "column",
              gap: "0",
            }}
          >
            <FormLabel
              sx={{
                padding: "0",
                color: "#6c7571",
                fontWeight: "bold",
                alignSelf: "flex-start",
                justifyContent: "flex-start",
              }}
              aria-label={`${Name} label`}
              htmlfor={`${Name}-label`}
            >
              {Name}
            </FormLabel>

            <Input
            className="borderAfter"
              onChange={(e) => handleChange(e)}
              fullWidth
              variant="standard"
              placeholder="File Name"
              required
              id={Name.split(" ").join("")}
              value={FileData[Name.split(" ").join("")] /* Corrected here */}
              style={{
                width: "100%",
              }}
            />
          </FormControl>
          <FormControl
            fullWidth
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              flexDirection: "column",
              gap: "0",
            }}
          >
            <FormLabel
              sx={{
                padding: "0",
                color: "#6c7571",
                fontWeight: "bold",
                alignSelf: "flex-start",
                justifyContent: "flex-start",
              }}
              aria-label={`${"Description"} label`}
              htmlfor={`${"Description"}-label`}
            >
              {"Description"}
            </FormLabel>
            <Input
            className="borderAfter"
            onChange={(e)=>handleChange(e)}
              multiline
              label="Description"
              variant="standard"
              style={{
                width: "100%",
              }}
              placeholder="Description...."
              id={"Description"}
            />
          </FormControl>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              type="submit"
              sx={{
                margin: ".5rem 0 0 0",
                padding: ".3rem",
                width: "100%",
                transition: ".3s",
                background: "#FF5E23",
                letterSpacing: ".5px",

                ":hover , :focus": {
                  background: "#FF5E23",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
})
export default Popup;
