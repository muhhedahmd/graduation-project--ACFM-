import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import UploadSection from "./UploadSection";



const UploadAndDeleteSection = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        height: "100%",
        width: "100%",
      }}
    >
      <UploadSection/>

      <Box
        className="Download"
        sx={{
          background: theme.palette.background.paper,

          boxShadow: "3px 3px 5px #dedede",
          padding: ".5rem",
          width: "100%",
    margin: "0 8px 5px 3px",
    borderRadius:"11px",
          

        }}
      >
        <Button
          color="primary"
          variant="contained"
          sx={{
            padding: ".2rem .7rem",
            width: "100%",
            boxShadow: "none",
            bgcolor: theme.palette.primary.paper,
            color: "#fff",
            textTransform:"capitalize",

            ":hover , :focus": {
              bgcolor: theme.palette.primary.paper,
              color: "#fff",
              boxShadow: "4px 4px 0px #000",
            },
          }}
        >
          Download All
        </Button>
        <Box
          className="last-active"
          sx={{
            m: ".7rem  0 0 0 ",
            p: ".4rem",
            borderRadius: "4px",
            fontSize: ".8rem",
            color: "#fff",
            bgcolor: theme.palette.text.primary,
          }}
        >
          <Typography variant="caption" component={"p"}>
            Last edit at 2023 / 9 / 10 at 7:21
          </Typography>
        </Box>
      </Box>

      
   
    </Box>
  );
};

export default UploadAndDeleteSection;