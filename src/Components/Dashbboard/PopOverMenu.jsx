import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {  Divider, Link, List, ListItem } from "@mui/material";
import { Delete, Download, Edit,  } from "@mui/icons-material";
import PreviewIcon from '@mui/icons-material/Preview';
import ListIcon from "@mui/icons-material/List";
import styled from "@emotion/styled";
export default function PopOverMenu({ url, Filename}) {
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
                  color:"#ff6b81",
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
          <StyledListItem>
            <Edit fontSize=".5rem" />
            <Typography sx={{ ml: ".5rem" }} variant="body2" component={"p"}>
              Edit
            </Typography>
          </StyledListItem>
          <Divider
            

            />
          
          <StyledListItem
           
          >
            <PreviewIcon  fontSize=".5rem" />
            <Typography sx={{ ml: ".5rem" }} variant="body2" component={"p"}>
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
