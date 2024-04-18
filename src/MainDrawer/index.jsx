import {
  Box,
  Button,
  List,
  ListItem,
  SvgIcon,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Bullets from "./Bullets";
import { Close } from "@mui/icons-material";
import { StyledMainDrawer } from "./style";
import SegmentIcon from "@mui/icons-material/Segment";
import MenuCollapse from "./MenuCollapse";
import { useTheme } from "@emotion/react";

const MainDrawer = ({ isMD, area, setMenuDrawer }) => {
  const theme = useTheme();
  const [isexpand, setIsexpand] = useState(false);
  const handleClouseDrawer = () => {
    setIsexpand((prev) => !prev);
    
  };
  return (
    <StyledMainDrawer isMD={isMD} area={area} isexpand={isexpand}>
      <Bullets />
      <List>
        <ListItem
          disablePadding
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: ".6rem",
            }}
          >
            <img
              style={{
                maxWidth: "2.2rem",
              }}
              src="Images/logo-o6u 1.png"
              alt=""
            />

            <Typography
              sx={{
                visibility: `${!isexpand ? "visible" : "hidden"}`,
                opacity: `${!isexpand ? "1" : "0"}`,
                fontSize: `${!isexpand ? "1.25rem" : "0rem"}`,
                cursor: "none",
                zIndex: "-1",

                transition: ".3s opacity",
                color: theme.palette.text.heading,

                fontWeight: "700",
              }}
              variant="h6"
              component={"p"}
            >
              ACFM
            </Typography>
          </Box>

          {!(area === "Menudrawer") ? (
            <Button
              onClick={() => handleClouseDrawer()}
              disableRipple
              sx={{
                width: "fit-content",
                color: theme.palette.primary.main,

                padding: 0,
                display: "flex",
                justifyContent: `${isexpand ? "center" : "flex-end"}`,
                cursor: "pointer",
              }}
            >
              {!isexpand ? (
                <SvgIcon
                  color={theme.palette.bullet["1nd"]}
                  sx={{
                    // color: theme.palette.primary.main + "!important",
                    color: theme.palette.bullet["1nd"],
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                  }}
                >
                  <Close
                    sx={{
                      color: theme.palette.bullet["1nd"],


                      fontWeight: "bold",
                      fontSize: "1.4rem",
                    }}
                  />
                </SvgIcon>
              ) : (
                <SegmentIcon
                  sx={{
                    color: theme.palette.bullet["1nd"],

                    fontWeight: "bold",
                    fontSize: "1.4rem",
                  }}
                />
              )}
            </Button>
          ) : (
            <Button
              onClick={() => setMenuDrawer(false)}
              sx={{
                width: "fit-content",
                fill: theme.palette.text.heading,

                padding: 0,
                display: "flex",
                justifyContent: `${isexpand ? "center" : "flex-end"}`,
                cursor: "pointer",
              }}
            >
              <Close
                sx={{
                  fill: theme.palette.text.heading,

                  fontWeight: "bold",
                  fontSize: "1.4rem",
                }}
              />
            </Button>
          )}
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
                transition: ".4s",
                color: theme.palette.text.heading,

                display: "flex",
                justifyContent: `${isexpand ? "center" : "flex-start"}`,
                alignItems: "flex-start",
                gap: ".5rem",
                p: " 0 0 .5rem 0 ",
              }}
            >
              <img
                style={{
                  filter: "invert(.6)",

                  transition: ".4s",
                }}
                src="images/main course.png"
                alt="course.png"
              />

              <Typography
                className={`${!isexpand ? "" : "isNotExpandText"}`}
                variant="subtitle2"
                component={"p"}
              >
                Courses
              </Typography>
            </Box>

          </Box>
        </ListItem>
      </List>

      <MenuCollapse isexpand={isexpand} />
    </StyledMainDrawer>
  );
};

export default MainDrawer;
