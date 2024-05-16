import * as React from "react";
import Popover from "@mui/material/Popover";
import { Button, Checkbox,  FormControlLabel,  List, ListItem } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import styled from "@emotion/styled";

export default function PopOverMenuFilter({filterList, setFilterList}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleCheck = (id) => {
    console.log(filterList)
    
    setFilterList((prev)=>{
      return {...prev ,
        [id]: !prev[id],

      }
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const StyledListItem = styled(ListItem)(({ theme }) => ({
    cursor: "pointer",
    transition: ".3s",
    ":hover , :focus": {
      color: "#333",
    },
  }));

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
        <ListIcon sx={{ color: "inherit" }} fontSize="medium" />
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
        {Object.keys(filterList).map((item)=>
          <StyledListItem>
            <FormControlLabel
              onClick={() => handleCheck(item)}
              control={
                <Checkbox
                  sx={{
                    padding: "0",
                    "&.Mui-checked": {
                      color: "#333",
                    },
                  }}
                  checked={filterList[item]}
                />
              }
              label={item}
            />
          </StyledListItem>
        )}
      </List>
        {/* <List>
         
          <StyledListItem>
            <FormControlLabel
              onClick={() => handleCheck("Second")}
              control={
                <Checkbox
                  sx={{
                    padding: "0",
                    "&.Mui-checked": {
                      color: "#333",
                    },
                  }}
                  checked={filterList.Second}
                />
              }
              label="Second Year"
            />
          </StyledListItem>
          <StyledListItem>
            <FormControlLabel
              onClick={() => handleCheck("Third")}
              control={
                <Checkbox
                  sx={{
                    padding: "0",
                    "&.Mui-checked": {
                      color: "#333",
                    },
                  }}
                  checked={filterList.Third}
                />
              }
              label="Third Year"
            />
          </StyledListItem>
          <StyledListItem>
            <FormControlLabel
              onClick={() => handleCheck("Fourth")}
              control={
                <Checkbox
                  sx={{
                    padding: "0 .2rem 0  0",
                    "&.Mui-checked": {
                      color: "#333",
                    },
                  }}
                  checked={filterList.Fourth}
                />
              }
              label="Fourth Year"
            />
   
          </StyledListItem>
          <Divider />
        </List> */}
      </Popover>
    </div>
  );
}
