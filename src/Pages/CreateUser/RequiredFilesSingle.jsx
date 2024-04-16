import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { UseView } from "../../Components/Contexts/viewedFileContext";
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

const StyledBtn = styled(Button)(({ costumColor }) => {
  return {
    margin: "0 0 0 1rem !important",
    width: " 7rem",
    backgroundColor: " #fff ",
    boxShadow: "none ",
    padding: "0.2rem 2rem",
    fontSize: ".8rem ",
    letterSpacing: "1px",
    color: `${costumColor ? costumColor : "#ff5c00"}`,
    borderRadius: "7px !important",
    border: `3px solid ${costumColor ? costumColor : "#ff5c00 "} !important`,
  };
});

const RequiredFilesSingle = ({ title, Done, setFiles, type }) => {
  const { setViewFile } = UseView();
  const [file, setPdfFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile?.type === "application/pdf") {
      setPdfFile(selectedFile);
      console.log(selectedFile);

      setFiles((prev) => {
        return {
          ...prev,
          [type]: selectedFile,
        };
      });
    }
  };

  const handleDelete = () => {
    setFiles((prev) => {
      return {
        ...prev,
        [type]: null,
      };
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Box className="flex-space-between-center">
        <Typography variant="body1" component={"p"}>
          {title}
        </Typography>

        <div className="not-Submited-required-single-file">
          <DoneIcon
            sx={{
              opacity: `${Done ? 1 : 0}`,

              color: "#ff5c00",
            }}
            color="#ff5c00"
            fontSize="large"
          />
        </div>
      </Box>

      {Done ? (
        <Box>
          <StyledBtn costumColor={"#28b7af"} onClick={() =>{
            
            const blob = new Blob([file ], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

             setViewFile(url)}}>
            View
          </StyledBtn>

          <StyledBtn onClick={handleDelete} costumColor={"#ff0000"}>
            Delete
          </StyledBtn>
        </Box>
      ) : (
        <StyledBtn
          className="Defult-btn"
          role={"button"}
          variant="contained"
          component="label"
        >
          Upload
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => handleFileChange(e)}
          />
        </StyledBtn>
      )}
    </Box>
  );
};

export default RequiredFilesSingle;
