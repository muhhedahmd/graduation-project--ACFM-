import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React from "react";
import UploadSection from "./UploadSection";
import styled from "@emotion/styled";
import DownloadAll from "./DownloadAll";


const StyledUploadAndOptionsSectionDrawer = styled(Box)(({Drawer})=>{
  
    if(Drawer){
      return {
        flexDirection: "column",
        padding: "2rem 1rem",
        display: "flex",
        justifyContent: "flexstart",
        alignItems: "center",
        textAlign:"center"
        
      }
    }
      else{
        return{

          flexDirection: "column",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          height: "100%",
          width: "100%",
        }
      }
    

  }
)


const UploadAndDeleteSection = ({Drawer , FileState , page}) => {
  // const {state} = useFile()
  const theme = useTheme();
  return (
    <StyledUploadAndOptionsSectionDrawer
    Drawer={Drawer}
    
    >
      <UploadSection category={page}/>

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
      <DownloadAll FileState={FileState} page={page}/>
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
      <DownloadAll AllFiles={true} FileState={FileState} page={page}/>


        </Box>
      </Box>

      
   
    </StyledUploadAndOptionsSectionDrawer>
  );
};

export default UploadAndDeleteSection;
