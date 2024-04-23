import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import {  Button, List, ListItem } from "@mui/material";
  import { Delete   } from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import styled from "@emotion/styled";


export default function PopOverMenu({ url, Filename , fileId}) {


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
