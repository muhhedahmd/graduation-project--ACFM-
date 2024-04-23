import styled from '@emotion/styled';
import { Box, Typography, Button } from '@mui/material';
import React, {  useRef, useState } from 'react';
import uploadIcon from "./file-add.svg";
import { useTheme } from '@emotion/react';
import Popup from '../Popup';
import WarningPopup from '../WarningPopup';

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

const UploadSection = () => {
  const ref = useRef(null)

  const [file, setFile] = useState(null);
  const [isInvalid , setIsInValid] = useState(false)
  const theme = useTheme();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if(selectedFile?.type === "application/pdf")
    {
      setFile(selectedFile);
      ref.current.open()
    }
   else if(selectedFile?.type !== "application/pdf") {

      setIsInValid(true)

    }


    



  };

  return (
    <Box
      sx={{
        width: "100%",
      height: "72%",
        position: "relative",
        boxShadow: "3px 3px 4px #dedede",
        margin: "0 8px 5px 3px",
      }}
    >
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={
          <>
            <Box>
              <img src={uploadIcon} alt="" />
              <Typography p={"0 .3rem"} variant="caption" component={"P"} color={"#888"}>
                click here to upload or drag and drop files here
              </Typography>
            </Box>
          </>
        }
        sx={{
          borderRadius: "11px",
          position: "relative",
          width: "100%",
          height: "100%",
          boxShadow: "3px 3px 5px #dedede",
          background: theme.palette.background.paper,
          p: "0",
          ":hover , :focus": {
            bgcolor: "#fff",
          },
        }}
      >
        <VisuallyHiddenInput type="file" onChange={(e)=>handleFileChange(e)} />

        <Typography
          sx={{
            position: "absolute",
            color: "#333",
            top: "1rem",
            left: "1rem",
            fontSize: ".8rem",
            fontWeight: "bold",
            letterSpacing: ".5px",
          }}
          variant="caption"
          component={"p"}
        >
          Upload Files
        </Typography>
      </Button>
     
    <Popup ref={ref}  fileNameObj={file?.name}  file={file}  Name={"File Name"}/>
    <WarningPopup isInvalid={isInvalid} setIsInvalid={setIsInValid}/>
    </Box>
  );
};

export default UploadSection;
