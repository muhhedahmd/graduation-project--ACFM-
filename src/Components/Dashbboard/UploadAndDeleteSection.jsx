import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import UploadSection from "./UploadSection";
import styled from "@emotion/styled";
import DownloadAll from "./DownloadAll";
import { useFile } from "../Contexts/FileContext";
import TimeDisplay from "../../utiles/timedifferance";


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


const UploadAndDeleteSection = ({Drawer , page}) => {
  const {state} = useFile()
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
      <DownloadAll page={page}/>
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
  {state && state.uploadedFiles.length > 0 && state.uploadedFiles[0].file && state.uploadedFiles[0].file.lastModifiedDate
    ? <TimeDisplay  lastModifiedDate={(state.uploadedFiles[0].file.lastModifiedDate)}/>
    : 'No files uploaded yet'}
</Typography>

        </Box>
      </Box>

      
   
    </StyledUploadAndOptionsSectionDrawer>
  );
};

export default UploadAndDeleteSection;
