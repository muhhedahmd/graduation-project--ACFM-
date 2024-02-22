import {
  Autocomplete,
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Bullets from "./Bullets";
import { Close } from "@mui/icons-material";
import CustomAutocomplete from "./AutoComplete";
import { StyledMainDrawer } from "./style";
import SegmentIcon from "@mui/icons-material/Segment";
import { MainDrawerData } from "../Components/Data/Data";
import MenuCollapse from "./MenuCollapse";

const MainDrawer = () => {
  // const options = ['Option 1', 'Option 2', 'Option 3'];
  const ismd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const theme = useTheme();
  const [isExpand, setIsExpand] = useState(false);
  const handleClouseDrawer = () => {
    setIsExpand((prev) => !prev);
  };
  return (
    <StyledMainDrawer
      isExpand={isExpand}
      sx={{
        overflow:"hidden",
        transition: ".4s",
        padding: "1rem",
        width: `${!isExpand ? "14rem" : "8rem"}`,

        height: " 86vh",
        borderRadius: "27px",
        margin: ".7rem 0 0 1.4rem",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Bullets />
      <List>
        <ListItem
          disablePadding
          sx={{
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
            }}
            variant="h6"
            component={"p"}
          >
            ACFM
          </Typography>
          <Button
            onClick={() => handleClouseDrawer()}
            disableRipple
            sx={{
              width: "fit-content",
              color: "#ffff",
              padding: 0,
              display: "flex",
              justifyContent: `${isExpand ? "center" : "flex-end"}`,
              cursor: "pointer",
            }}
          >
            {!isExpand ? (
              <Close
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                }}
              />
            ) : (
              <SegmentIcon
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                }}
              />
            )}
          </Button>
        </ListItem>
      </List>

      <List className="Choose-course">
        <ListItem
          disablePadding
          sx={{
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                transition:".4s",

                
                display: "flex",
                justifyContent: `${isExpand?  "center":"flex-start"}`,
                alignItems: "flex-start",
                gap: ".5rem",
                p: " 0 0 .5rem 0 ",
              }}
            >
              <img
              style={{
                transition:".4s"
              }}
               src="images/main course.png" alt="" />

              <Typography
                className={`${!isExpand ? "" : "isNotExpandText"}`}
                variant="subtitle2"
                component={"p"}
              >
                Courses
              </Typography>
            </Box>

            <CustomAutocomplete
              isExpand={!isExpand}
              //  className={`${!isExpand ?  "" : "isNotExpand" }`}
            />
          </Box>
        </ListItem>
      </List>
<MenuCollapse isExpand={isExpand}/>
    </StyledMainDrawer>
  );
};

export default MainDrawer;
