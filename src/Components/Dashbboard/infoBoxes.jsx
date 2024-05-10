import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";

const InfoBoxes = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "1rem",
        padding: "1rem 0 ",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Box
        sx={{
          width: "20rem",
          height: "7rem",
          background: "#ff5c0033",
          boxShadow: "1px 4px 3px #ddd",
          padding: "1rem .5rem",
          color: "inherit",
          display:"flex",
          justifyContent:"flex-start",
        }}
      >
        <Typography variant="subtitle1" component={"p"}>
          You in Week
          <Typography
          Typography variant="subtitle2" component={"p"}
          
          >No: 1 - 2</Typography>
        </Typography>
      </Box>
      <Box
        sx={{
          boxShadow: "1px 4px 3px #ddd",

          background: "#02133e38",
          width: "20rem",
          height: "7rem",
          color: "inherit",
        }}
      ></Box>
      <Box
        sx={{
          boxShadow: "1px 4px 3px #ddd",

          background: " #004bff29",

          width: "20rem",
          height: "7rem",
          color: "inherit",
        }}
      ></Box>
    </Box>
  );
};

export default InfoBoxes;

