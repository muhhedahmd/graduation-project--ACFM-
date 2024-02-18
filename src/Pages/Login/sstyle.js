import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const SyledLoginHolder = styled(Box)(({}) => {
  return {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
    height: "100vh",
    width: "100vw",
  };
});
export const SyledLoginImgHolder = styled(Box)(({}) => {
  return {
    position: "relative",
    height: "100vh",
    width: "65vw",
    img: {
      height: "100vh",
      maxWidth: "100%",
    },
    "::before": {
      content: '""',
      position: "absolute",
      top: "0",
      left: "0",
      backgroundImage: "url(images/Texture.png)",
      width: "100%",
      height: "100%",
    },
  };
});
export const SyledLoginFlyingBox = styled(Box)(({}) => {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50% ,-50%)",
    padding: "1rem",
    width: "auto",

    backgroundColor: "#ffffff82",
    fontWeight: "bold",
  };
});
