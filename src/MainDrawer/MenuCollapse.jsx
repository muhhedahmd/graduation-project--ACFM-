import React, { useEffect, useState } from "react";
import { MainDrawerData } from "../Components/Data/Data";
import {
  Box,
  Collapse,
  List,
  ListItem,
  SvgIcon,
  Typography,
} from "@mui/material";
import { StyledBtnFlexCenter, StyledCollapse } from "./style";
import { useTheme } from "@emotion/react";
import { NavLink } from "react-router-dom";

const MenuCollapse = ({ isexpand }) => {
  const theme = useTheme();
  const initialState = MainDrawerData.reduce((acc, item) => {
    acc[item.Ttile.split(" ").join("-")] = false;
    return acc;
  }, {});
  const [collapse, setCollapse] = useState({ ...initialState });

  useEffect(() => {
    if (isexpand) {
      setCollapse(initialState);
    }
  }, [initialState, isexpand]);

  const HandleClickMenucollapse = (e) => {
    if (!isexpand) {
      const { id } = e.target;

      setCollapse((prev) => {
        return {
          ...initialState,
          [id]: !prev[id],
        };
      });
    }
  };

  return (
    <List
      disablePadding
      sx={{
        width: "100%",
      }}
    >
      {MainDrawerData.map((item, i) => {
        return (
          <ListItem
            key={i}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
            disablePadding
          >
            <Box
              sx={{
                width: "100%",
              }}
              id={item.Ttile.split(" ").join("-")}
            >
              <StyledBtnFlexCenter
                isexpand={!isexpand}
                disableRipple
                onClick={(e) => HandleClickMenucollapse(e)}
              >
                <SvgIcon
                  sx={{
                    width: "1.3rem",
                    fill: theme.palette.text.primary,
                  }}
                >
                  {item.iconPath}
                </SvgIcon>

                <Typography
                  className={`${!isexpand ? "" : "isNotExpandText"}`}
                  sx={{
                    color: theme.palette.text.primary,

                    fontWeight: "600",
                    width: "max-content",
                  }}
                  id={item.Ttile.split(" ").join("-")}
                  variant="caption"
                  component={"p"}
                >
                  {item.Ttile}
                </Typography>
              </StyledBtnFlexCenter>
            </Box>
            <Collapse
              sx={{
                width: "100%",
              }}
              in={collapse[item.Ttile.split(" ").join("-")]}
              id={item.Ttile.split(" ").join("-")}
            >
              <StyledCollapse>
                {item.nested.map((Nitem) => {
                  return (
                    <ListItem
                      sx={{
                        width: "100%",
                      }}
                      disablePadding
                      key={Nitem}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.text.primary,
                        }}
                        variant="caption"
                        component={"p"}
                      >
                        <NavLink
                          
                          style={{
                            
                            cursor: "pointer",
                            color: "inherit",
                            textDecoration:"none",
                            fontWeight:"500",
                            letterSpacing:"1.2px",
                            transition:".3s",
                   



                          }}
                          to={"/"+Nitem.split(" ").join("").toLowerCase()}
                        >
                          {Nitem}
                        </NavLink>
                      </Typography>
                    </ListItem>
                  );
                })}
              </StyledCollapse>
            </Collapse>
          </ListItem>
        );
      })}
    </List>
  );
};

export default MenuCollapse;
