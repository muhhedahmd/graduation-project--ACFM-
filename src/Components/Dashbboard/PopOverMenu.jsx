import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import {  Button, Divider, Link, List, ListItem } from "@mui/material";
import { Delete, Download, Edit,  } from "@mui/icons-material";
import PreviewIcon from '@mui/icons-material/Preview';
import ListIcon from "@mui/icons-material/List";
import styled from "@emotion/styled";
import { UseView } from "../Contexts/viewedFileContext";


export default function PopOverMenu({ url, Filename}) {
  const { setViewFile } = UseView();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // return{
      
      
      const StyledListItem = styled(ListItem)(({theme})=>{
          return{
              
              cursor:"pointer",
              transition:".3s",
              ':hover , :focus':{
                  color:"#333",
                }
        }
      })
  return (
    <div>
      <Button
        disableRipple
        disableFocusRipple
        sx={{
          justifyContent: "flex-end",
          boxShadow: "none",
          color: "#666",
          p: "0",
          width: "min-content",
          ":hover ,:focus": {
            background: "#fff",
            boxShadow: "none",
            color: "#333",
          },
        }}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <ListIcon
          sx={{
            color: "inherit",
          }}
          fontSize="medium"
        />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <List>
          <StyledListItem
            
          
       
          >
      <Link
      onClick={()=>   setAnchorEl(null)}
      sx={{
        width:"max-content",
        color:"inherit",
        p:"0",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        textDecoration:"none"
        
      }}
      
       download={Filename} href={url}>


            <Download fontSize=".5rem" />
            <Typography sx={{ ml: ".5rem" }} variant="body2" component={"p"}>
              Download
            </Typography>
      </Link>
          </StyledListItem>
          <Divider
            

          />
          <StyledListItem
      onClick={()=>   setAnchorEl(null)}
          
          >
            <Edit fontSize=".5rem" />
            <Typography sx={{ ml: ".5rem" }} variant="body2" component={"p"}>
              Edit
            </Typography>
          </StyledListItem>
          <Divider
            

            />
          
          <StyledListItem

          role="button"
       
          onClick={()=>{
         setAnchorEl(null)
            
            setViewFile(url)}}
           
          >
          
          
  

            <PreviewIcon  fontSize=".5rem" />
            <Typography sx={{ ml: ".5rem" }} variant="body2" component={"p"}
            
            
            >
              View
            </Typography>
      
          </StyledListItem>
          <Divider
            

            />
          <StyledListItem
           
          >
          
            <Delete fontSize=".5rem" />
            <Typography sx={{ ml: ".5rem" }} variant="body2" component={"p"}>
              Delete
            </Typography>
          </StyledListItem>
      
        </List>
      </Popover>
    </div>
  );
}
