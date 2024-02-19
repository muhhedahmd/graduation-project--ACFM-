import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const SyledLoginHolder = styled(Box)(({theme}) => {
  return {
    [theme.breakpoints.down("sm")]:{
flexDirection:"column",
    },
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
    width: "100vw",
};
});
export const SyledLoginImgHolder = styled(Box)(({theme}) => {
    return {
          backgroundPosition:"center",
        backgroundSize:"cover !important",
        background:"url(/Images/BackLogin.png)",

        [theme.breakpoints.down("sm")]:{
            width: "100vw",
            height:"34vh"
        },
        position: "relative",
        height: "100vh",
        width: "65vw",
       
        "::before": {
        [theme.breakpoints.down("sm")]:{
            height: "98%",
            
        },
        
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
export const SyledLoginFlyingBox = styled(Box)(({theme}) => {
    return {
        [theme.breakpoints.down("md")]:{
            
            
            width: "calc(100% - 4rem)",
            height: "auto",
        },
        '.login-title-textlft':{
            [theme.breakpoints.down("sm")]:{
                
        fontSize:"1.25rem"
          },
          
        },
        backdropFilter:"blur(2px)",
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
export const FormHolderAndHeading = styled(Box)(({theme}) => {
    return {
        [theme.breakpoints.down("sm")]:{
        
            
            width: "max-content",
        },
        
        padding:"1rem",
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"center",
        gap:"1.25rem"
    };
});
export const StyledLoginHeading = styled(Box)(({theme}) => {
    return {
        
        [theme.breakpoints.down("sm")]:{    
            width: "max-content",
        },
    display:"flex",
    flexDirection:"column",
    alignItems:"flex-start",
    justifyContent:"flex-start",
    gap:"1rem"
    
   
  };
});
export const StyledLogoAndTitle = styled(Box)(({theme}) => {
  return {

    display:"flex",
        alignItems:"center",
    justifyContent:"flex-start",
    gap:"1rem",

    'img':{
        maxWidth:"2.1rem"
    }



   
  };
});
